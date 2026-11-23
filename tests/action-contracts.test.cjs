// Exercise the Bash and JavaScript embedded in action.yml without installing
// language tools. GitHub runner and artifact behavior is covered by the dedicated
// __test-action-* workflows.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawnSync } = require("node:child_process");
const test = require("node:test");
const YAML = require("yaml");

const load = (name) =>
  YAML.parse(fs.readFileSync(`actions/${name}/action.yml`, "utf8"));
const step = (name, id) => load(name).runs.steps.find((item) => item.id === id);
const AsyncFunction = Object.getPrototypeOf(async () => {}).constructor;

function workspace(t) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "ci-actions-"));
  t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
  return directory;
}

function run(name, id, directory, env) {
  return spawnSync(
    "bash",
    [
      "--noprofile",
      "--norc",
      "-e",
      "-u",
      "-o",
      "pipefail",
      "-c",
      step(name, id).run,
    ],
    {
      cwd: directory,
      env: { ...process.env, ...env },
      encoding: "utf8",
      timeout: 10000,
    },
  );
}

test("custom commands retain quoting and fail without continuing to default tools", (t) => {
  const directory = workspace(t);
  for (const action of ["lint", "test"]) {
    const output = path.join(directory, `${action} output.txt`);
    const result = run(action, "run", directory, {
      COMMAND: 'printf "%s" "$VALUE" > "$OUTPUT"\nexit 17',
      OUTPUT: output,
      VALUE: 'quotes " and $(not-executed)',
    });
    assert.equal(result.status, 17, result.stderr);
    assert.notEqual(
      run(action, "run", directory, { COMMAND: "   " }).status,
      0,
    );
    assert.equal(
      fs.readFileSync(output, "utf8"),
      'quotes " and $(not-executed)',
    );
  }
});

test("setup rejects invalid booleans and missing project manifests", (t) => {
  const directory = workspace(t);
  const setup = "setup-python";
  for (const value of ["false", "invalid"]) {
    assert.notEqual(
      run(setup, "validate", directory, { INSTALL_DEPENDENCIES: value }).status,
      0,
    );
  }
  fs.writeFileSync(path.join(directory, "pyproject.toml"), "");
  assert.equal(
    run(setup, "validate", directory, { INSTALL_DEPENDENCIES: "false" }).status,
    0,
  );
  assert.notEqual(
    run(setup, "validate", directory, { INSTALL_DEPENDENCIES: "invalid" })
      .status,
    0,
  );
  assert.notEqual(
    run(setup, "validate", directory, { INSTALL_DEPENDENCIES: "true" }).status,
    0,
  );
  fs.writeFileSync(path.join(directory, "uv.lock"), "");
  assert.equal(
    run(setup, "validate", directory, { INSTALL_DEPENDENCIES: "true" }).status,
    0,
  );
});

test("test configuration rejects unsupported coverage destinations", (t) => {
  const directory = workspace(t);
  assert.notEqual(
    run("test", "validate", directory, { COVERAGE: "wrong", RACE: "true" })
      .status,
    0,
  );
  assert.equal(
    run("test", "validate", directory, { COVERAGE: "", RACE: "true" }).status,
    0,
  );
});

test("report artifacts contain only parsed reports and use unique names", async (t) => {
  const directory = workspace(t);
  const report = path.join(directory, "junit.xml");
  fs.writeFileSync(report, "<testsuites/>");
  fs.writeFileSync(
    path.join(directory, "unrelated-secret.txt"),
    "not a report",
  );
  const prepare = new AsyncFunction(
    "core",
    "process",
    "require",
    YAML.parse(
      fs.readFileSync(".github/actions/parse-ci-reports/action.yml", "utf8"),
    ).runs.steps.find((item) => item.id === "prepare").with.script,
  );
  async function outputs(files, group = "outer-job") {
    const result = {};
    await prepare(
      {
        setOutput: (key, value) => {
          result[key] = value;
        },
      },
      {
        env: {
          DIRECTORY: directory,
          REPORT_FILES: JSON.stringify(files),
          REPORT_GROUP: group,
          GITHUB_RUN_ATTEMPT: "2",
        },
      },
      require,
    );
    return result;
  }
  assert.deepEqual(await outputs([]), {});
  const first = await outputs([report]);
  assert.equal(first.files, report);
  assert.match(first.name, /^ci-reports-2-outer-job-/);
  assert.notEqual(first.name, (await outputs([report])).name);
  await assert.rejects(() => outputs([report], "../bad-group"), /report-group/);
});
