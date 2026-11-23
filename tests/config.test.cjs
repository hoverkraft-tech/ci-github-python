const assert = require("node:assert/strict");
const fs = require("node:fs");
const test = require("node:test");
const YAML = require("yaml");

const workflow = YAML.parse(
  fs.readFileSync(".github/workflows/continuous-integration.yml", "utf8"),
);
const config = workflow.jobs.configuration.steps.find(
  (step) => step.id === "config",
);
const AsyncFunction = Object.getPrototypeOf(async () => {}).constructor;
const configure = new AsyncFunction("core", "process", config.with.script);
const inputs = workflow.on.workflow_call.inputs;
const defaultEnv = Object.fromEntries(
  Object.entries(config.env).map(([key, value]) => {
    const input = value.match(/inputs[.]([a-z-]+)/)[1];
    return [key, inputs[input].default];
  }),
);
async function parse(env = {}) {
  const outputs = {};
  await configure(
    {
      setOutput: (key, value) => {
        outputs[key] = value;
      },
    },
    { env: { ...defaultEnv, ...env } },
  );
  return outputs;
}

test("uses project detection by default and the last explicit version as primary", async () => {
  const automatic = await parse();
  assert.deepEqual(automatic.versions, [""]);
  assert.equal(automatic["primary-version"], "");
  const explicit = await parse({ VERSIONS: '["3.13", "3.15"]' });
  assert.equal(explicit["primary-version"], explicit.versions.at(-1));
});

test("rejects ambiguous or unbounded version matrices", async () => {
  for (const value of [
    "[]",
    '["1.2", "1.2"]',
    "[1.2]",
    '["latest"]',
    "{}",
    "broken",
    JSON.stringify(Array(21).fill("1.2")),
  ]) {
    await assert.rejects(() => parse({ VERSIONS: value }), undefined, value);
  }
});

test("disables checks and preserves explicitly supplied command bytes", async () => {
  for (const value of ["", "false", "null"]) {
    const result = await parse({ LINT: value, TEST: value });
    assert.equal(result.lint, "null");
    assert.equal(result.test, "null");
  }
  const command = 'printf "%s\n" "$VALUE"\nexit 17';
  const result = await parse({
    TEST: JSON.stringify({ command, coverage: "" }),
  });
  assert.equal(JSON.parse(result.test).command, command);
  assert.equal(JSON.parse(result.test).coverage, "");
  assert.equal(
    JSON.parse((await parse({ LINT: "make lint" })).lint).command,
    "make lint",
  );
});

test("rejects misspelled options, invalid types and unknown coverage providers", async () => {
  for (const key of ["LINT", "TEST"]) {
    for (const value of [
      "{",
      "[]",
      '{"unknown":true}',
      '{"command":null}',
      '{"command":false}',
    ]) {
      await assert.rejects(
        () => parse({ [key]: value }),
        undefined,
        `${key}=${value}`,
      );
    }
  }
  for (const coverage of ["unknown", false, null]) {
    await assert.rejects(() => parse({ TEST: JSON.stringify({ coverage }) }));
  }
});

test("distribution checks are opt-in and validate consumer commands", async () => {
  assert.equal((await parse())["package-enabled"], false);
  assert.equal((await parse({ PACKAGE: "true" }))["package-enabled"], true);
  const commands = 'python -I -c "import sample"\n';
  assert.equal(
    (await parse({ PACKAGE: JSON.stringify({ tests: commands }) }))[
      "package-tests"
    ],
    commands,
  );
  for (const value of [
    "null",
    "[]",
    '"true"',
    '{"unknown":true}',
    '{"tests":false}',
    '{"tests":null}',
  ]) {
    await assert.rejects(() => parse({ PACKAGE: value }));
  }
});
