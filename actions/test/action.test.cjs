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

test("test configuration rejects unsupported coverage destinations", (t) => {
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
      COVERAGE: "",
      RACE: "true",
    }).status,
    0,
  );
});
