import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { trapFocus } from "../../src/scripts/focus-trap";

describe("trapFocus", () => {
  let container: HTMLElement;
  let release: () => void;

  beforeEach(() => {
    document.body.innerHTML = `
      <div id="trap">
        <button id="first">First</button>
        <a id="link" href="#x">Link</a>
        <button id="last">Last</button>
      </div>
    `;
    container = document.getElementById("trap")!;
    release = trapFocus(container);
  });

  afterEach(() => {
    release();
  });

  it("wraps Tab from the last item back to the first", () => {
    const last = document.getElementById("last")!;
    last.focus();
    container.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Tab", bubbles: true }),
    );
    expect(document.activeElement).toBe(document.getElementById("first"));
  });

  it("wraps Shift+Tab from the first item back to the last", () => {
    const first = document.getElementById("first")!;
    first.focus();
    container.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Tab", shiftKey: true, bubbles: true }),
    );
    expect(document.activeElement).toBe(document.getElementById("last"));
  });

  it("keeps focus inside when Tab is pressed on a middle item", () => {
    document.getElementById("first")!.focus();
    document.getElementById("link")!.focus();
    container.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Tab", bubbles: true }),
    );
    expect(document.activeElement).toBe(document.getElementById("last"));
  });

  it("ignores keys other than Tab", () => {
    const first = document.getElementById("first")!;
    first.focus();
    container.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Escape", bubbles: true }),
    );
    expect(document.activeElement).toBe(first);
  });

  it("stops trapping after release", () => {
    release();
    const last = document.getElementById("last")!;
    last.focus();
    container.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Tab", bubbles: true }),
    );
    expect(document.activeElement).toBe(last);
  });
});
