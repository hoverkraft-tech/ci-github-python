const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawnSync } = require("node:child_process");
const YAML = require("yaml");

function loadActionStep(actionFile, id) {
  const action = YAML.parse(fs.readFileSync(actionFile, "utf8"));
  return action.runs.steps.find((step) => step.id === id);
}

function createWorkspace(t) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "ci-actions-"));
  t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
  return directory;
}

function runActionStep(actionFile, id, directory, env) {
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
      loadActionStep(actionFile, id).run,
    ],
    {
      cwd: directory,
      env: { ...process.env, ...env },
      encoding: "utf8",
      timeout: 10000,
    },
  );
}

module.exports = { createWorkspace, loadActionStep, runActionStep };
