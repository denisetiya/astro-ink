import { describe, it, expect } from "vitest";
import { computeSplitPercent } from "../../src/scripts/split";

describe("computeSplitPercent", () => {
  it("converts to percent", () => {
    expect(computeSplitPercent(250, 1000, 10, 90)).toBe(25);
  });
  it("clamps to min", () => {
    expect(computeSplitPercent(20, 1000, 10, 90)).toBe(10);
  });
  it("clamps to max", () => {
    expect(computeSplitPercent(980, 1000, 10, 90)).toBe(90);
  });
  it("guards zero size", () => {
    expect(computeSplitPercent(0, 0, 10, 90)).toBe(10);
  });
});
