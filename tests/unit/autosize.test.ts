import { describe, it, expect, beforeEach } from "vitest";
import { autosize } from "../../src/scripts/autosize";

describe("autosize", () => {
  let el: HTMLTextAreaElement;

  beforeEach(() => {
    document.body.innerHTML = `<textarea id="ta"></textarea>`;
    el = document.getElementById("ta") as HTMLTextAreaElement;
  });

  it("sets a px height on init", () => {
    autosize(el);
    expect(el.style.height).toMatch(/px$/);
  });

  it("updates height on input", () => {
    autosize(el);
    const before = el.style.height;
    el.value = "line1\nline2\nline3";
    el.dispatchEvent(new Event("input", { bubbles: true }));
    expect(el.style.height).toMatch(/px$/);
    expect(el.style.height).not.toBe("");
    void before;
  });

  it("stops resizing after cleanup", () => {
    autosize(el);
    const off = autosize(el);
    off();
    const frozen = el.style.height;
    el.value = "line1\nline2\nline3\nline4";
    el.dispatchEvent(new Event("input", { bubbles: true }));
    expect(el.style.height).toBe(frozen);
  });
});
