import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { createRoving } from "../../src/scripts/roving";

describe("createRoving", () => {
  let container: HTMLElement;
  let cleanup: { destroy: () => void } | null = null;

  beforeEach(() => {
    document.body.innerHTML = `
      <div id="nav">
        <button id="a">A</button>
        <button id="b">B</button>
        <button id="c">C</button>
      </div>
    `;
    container = document.getElementById("nav")!;
  });

  afterEach(() => {
    cleanup?.destroy();
    cleanup = null;
  });

  it("sets tabindex 0 on first item, -1 on rest", () => {
    cleanup = createRoving(container, "button");
    expect(document.getElementById("a")!.tabIndex).toBe(0);
    expect(document.getElementById("b")!.tabIndex).toBe(-1);
    expect(document.getElementById("c")!.tabIndex).toBe(-1);
  });

  it("moves focus right on ArrowRight", () => {
    cleanup = createRoving(container, "button");
    document.getElementById("a")!.focus();
    container.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }));
    expect(document.activeElement).toBe(document.getElementById("b"));
  });

  it("wraps from last to first on ArrowRight", () => {
    cleanup = createRoving(container, "button");
    document.getElementById("c")!.focus();
    container.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }));
    expect(document.activeElement).toBe(document.getElementById("a"));
  });

  it("moves on ArrowUp when vertical", () => {
    cleanup = createRoving(container, "button", { orientation: "vertical" });
    document.getElementById("c")!.focus();
    container.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowUp", bubbles: true }));
    expect(document.activeElement).toBe(document.getElementById("b"));
  });

  it("ignores cross-axis keys", () => {
    cleanup = createRoving(container, "button", { orientation: "vertical" });
    document.getElementById("a")!.focus();
    container.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }));
    expect(document.activeElement).toBe(document.getElementById("a"));
  });

  it("jumps Home and End", () => {
    cleanup = createRoving(container, "button");
    document.getElementById("b")!.focus();
    container.dispatchEvent(new KeyboardEvent("keydown", { key: "End", bubbles: true }));
    expect(document.activeElement).toBe(document.getElementById("c"));
    container.dispatchEvent(new KeyboardEvent("keydown", { key: "Home", bubbles: true }));
    expect(document.activeElement).toBe(document.getElementById("a"));
  });

  it("destroy stops handling", () => {
    cleanup = createRoving(container, "button");
    cleanup.destroy();
    cleanup = null;
    document.getElementById("a")!.focus();
    container.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }));
    expect(document.activeElement).toBe(document.getElementById("a"));
  });
});
