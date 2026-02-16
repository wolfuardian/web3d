import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

describe("Project structure", () => {
  it("index.html exists and contains DOCTYPE", () => {
    const html = readFileSync(resolve(root, "index.html"), "utf-8");
    assert.ok(html.startsWith("<!DOCTYPE html>"), "index.html should start with DOCTYPE");
  });

  it("JS component files exist", () => {
    const components = ["layout.js", "panel.js", "main.js", "timeline.js"];
    for (const file of components) {
      const path = resolve(root, "js", "components", file);
      assert.ok(existsSync(path), `js/components/${file} should exist`);
    }
  });

  it("main.css exists", () => {
    assert.ok(existsSync(resolve(root, "main.css")), "main.css should exist");
  });
});
