import { describe, it, expect } from "vitest";
import { computeFill } from "../../src/scripts/slider";

describe("computeFill", () => {
  it("maps mid value to 50", () => {
    expect(computeFill(0, 100, 50)).toBe(50);
  });

  it("clamps below range", () => {
    expect(computeFill(0, 100, -20)).toBe(0);
  });

  it("clamps above range", () => {
    expect(computeFill(0, 100, 150)).toBe(100);
  });

  it("handles custom ranges", () => {
    expect(computeFill(10, 20, 15)).toBe(50);
  });

  it("returns 0 when max equals min", () => {
    expect(computeFill(5, 5, 5)).toBe(0);
  });
});
