import { describe, it, expect, beforeEach, vi } from "vitest";
import { onClickAway } from "../../src/scripts/clickaway";

describe("onClickAway", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="box"><button id="inner">In</button></div>
      <button id="outer">Out</button>
    `;
  });

  it("calls back on outside click", () => {
    const cb = vi.fn();
    onClickAway(document.getElementById("box")!, cb);
    document.getElementById("outer")!.dispatchEvent(
      new MouseEvent("pointerdown", { bubbles: true }),
    );
    expect(cb).toHaveBeenCalledOnce();
  });

  it("ignores inside clicks", () => {
    const cb = vi.fn();
    onClickAway(document.getElementById("box")!, cb);
    document.getElementById("inner")!.dispatchEvent(
      new MouseEvent("pointerdown", { bubbles: true }),
    );
    expect(cb).not.toHaveBeenCalled();
  });

  it("stops after cleanup", () => {
    const cb = vi.fn();
    const off = onClickAway(document.getElementById("box")!, cb);
    off();
    document.getElementById("outer")!.dispatchEvent(
      new MouseEvent("pointerdown", { bubbles: true }),
    );
    expect(cb).not.toHaveBeenCalled();
  });
});
