const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const {
  createWorkspace,
  runActionStep,
} = require("../../tests/action-test-helpers.cjs");

const actionFile = path.join(__dirname, "action.yml");

test("custom commands retain quoting and fail without continuing to default tools", (t) => {
  const directory = createWorkspace(t);
  const output = path.join(directory, "command output.txt");
  const result = runActionStep(actionFile, "run", directory, {
    COMMAND: 'printf "%s" "$VALUE" > "$OUTPUT"\nexit 17',
    OUTPUT: output,
    VALUE: 'quotes " and $(not-executed)',
  });
  assert.equal(result.status, 17, result.stderr);
  assert.notEqual(
    runActionStep(actionFile, "run", directory, { COMMAND: "   " }).status,
    0,
  );
  assert.equal(fs.readFileSync(output, "utf8"), 'quotes " and $(not-executed)');
});

test("test configuration rejects non-boolean coverage configuration", (t) => {
  const directory = createWorkspace(t);
  assert.notEqual(
    runActionStep(actionFile, "validate", directory, {
      COVERAGE: "wrong",
      RACE: "true",
    }).status,
    0,
  );
  assert.equal(
    runActionStep(actionFile, "validate", directory, {
      COVERAGE: "true",
      RACE: "true",
    }).status,
    0,
  );
});

test("the default command writes into the fresh directory and disables coverage on secondary runtimes", (t) => {
  const directory = createWorkspace(t);
  const log = path.join(directory, "arguments.json");
  fs.writeFileSync(
    path.join(directory, "uv"),
    `#!/usr/bin/env node
require("node:fs").writeFileSync(process.env.ARGUMENT_LOG, JSON.stringify(process.argv.slice(2)));
`,
    { mode: 0o700 },
  );
  for (const coverage of ["true", "false"]) {
    const result = runActionStep(actionFile, "run", directory, {
      COMMAND: "",
      CI_TEST_COVERAGE: coverage,
      CI_REPORTS_DIR: path.join(directory, "fresh reports"),
      PATH: `${directory}:${process.env.PATH}`,
      ARGUMENT_LOG: log,
    });
    assert.equal(result.status, 0, result.stderr);
    const args = JSON.parse(fs.readFileSync(log, "utf8"));
    assert.ok(args.includes(`--junitxml=${directory}/fresh reports/junit.xml`));
    assert.equal(args.includes("--no-cov"), coverage === "false");
    assert.equal(args.includes("--cov"), coverage === "true");
  }
});
