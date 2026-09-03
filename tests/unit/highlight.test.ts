import { describe, it, expect } from "vitest";
import { markText } from "../../src/scripts/highlight";

describe("markText", () => {
  it("splits hits case-insensitively", () => {
    expect(markText("Hello hello", "hello")).toEqual([
      { text: "Hello", hit: true },
      { text: " ", hit: false },
      { text: "hello", hit: true },
    ]);
  });

  it("returns whole text on empty query", () => {
    expect(markText("abc", "")).toEqual([{ text: "abc", hit: false }]);
  });

  it("respects case sensitivity", () => {
    expect(markText("Hello hello", "Hello", true)).toEqual([
      { text: "Hello", hit: true },
      { text: " hello", hit: false },
    ]);
  });
});
