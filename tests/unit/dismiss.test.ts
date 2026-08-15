import { describe, it, expect, beforeEach, vi } from "vitest";
import { onEscape, onOutsideClick } from "../../src/scripts/dismiss";

describe("onEscape", () => {
  beforeEach(() => {
    document.body.innerHTML = `<div id="box"><button id="inner">In</button></div>`;
  });

  it("calls back on Escape", () => {
    const box = document.getElementById("box")!;
    const cb = vi.fn();
    onEscape(box, cb);
    box.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    expect(cb).toHaveBeenCalledOnce();
  });

  it("ignores other keys", () => {
    const box = document.getElementById("box")!;
    const cb = vi.fn();
    onEscape(box, cb);
    box.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
    expect(cb).not.toHaveBeenCalled();
  });

  it("stops calling back after cleanup", () => {
    const box = document.getElementById("box")!;
    const cb = vi.fn();
    const off = onEscape(box, cb);
    off();
    box.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    expect(cb).not.toHaveBeenCalled();
  });
});

describe("onOutsideClick", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="box"><button id="inner">In</button></div>
      <button id="outer">Out</button>
    `;
  });

  it("calls back when clicking outside the target", () => {
    const box = document.getElementById("box")!;
    const cb = vi.fn();
    onOutsideClick(box, cb);
    document.getElementById("outer")!.dispatchEvent(
      new MouseEvent("pointerdown", { bubbles: true }),
    );
    expect(cb).toHaveBeenCalledOnce();
  });

  it("ignores clicks inside the target", () => {
    const box = document.getElementById("box")!;
    const cb = vi.fn();
    onOutsideClick(box, cb);
    document.getElementById("inner")!.dispatchEvent(
      new MouseEvent("pointerdown", { bubbles: true }),
    );
    expect(cb).not.toHaveBeenCalled();
  });

  it("stops calling back after cleanup", () => {
    const box = document.getElementById("box")!;
    const cb = vi.fn();
    const off = onOutsideClick(box, cb);
    off();
    document.getElementById("outer")!.dispatchEvent(
      new MouseEvent("pointerdown", { bubbles: true }),
    );
    expect(cb).not.toHaveBeenCalled();
  });
});
