const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const {
  createWorkspace,
  runActionStep,
} = require("../../tests/action-test-helpers.cjs");

const actionFile = path.join(__dirname, "action.yml");

test("setup rejects invalid booleans and missing project manifests", (t) => {
  const directory = createWorkspace(t);
  for (const value of ["false", "invalid"]) {
    assert.notEqual(
      runActionStep(actionFile, "validate", directory, {
        INSTALL_DEPENDENCIES: value,
      }).status,
      0,
    );
  }
  fs.writeFileSync(path.join(directory, "pyproject.toml"), "");
  assert.equal(
    runActionStep(actionFile, "validate", directory, {
      INSTALL_DEPENDENCIES: "false",
    }).status,
    0,
  );
  assert.notEqual(
    runActionStep(actionFile, "validate", directory, {
      INSTALL_DEPENDENCIES: "invalid",
    }).status,
    0,
  );
  assert.notEqual(
    runActionStep(actionFile, "validate", directory, {
      INSTALL_DEPENDENCIES: "true",
    }).status,
    0,
  );
  fs.writeFileSync(path.join(directory, "uv.lock"), "");
  assert.equal(
    runActionStep(actionFile, "validate", directory, {
      INSTALL_DEPENDENCIES: "true",
    }).status,
    0,
  );
});
