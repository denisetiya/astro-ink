import { describe, it, expect } from "vitest";
import { scaleLinear, niceTicks, pieSlices, gaugeAngle } from "../../src/scripts/chart";

describe("scaleLinear", () => {
  it("maps domain to range", () => {
    const s = scaleLinear(0, 100, 0, 200);
    expect(s(0)).toBe(0);
    expect(s(25)).toBe(50);
    expect(s(100)).toBe(200);
  });
});

describe("niceTicks", () => {
  it("rounds to friendly steps", () => {
    expect(niceTicks(0, 100, 5)).toEqual([0, 20, 40, 60, 80, 100]);
    expect(niceTicks(0, 95, 5)).toEqual([0, 20, 40, 60, 80, 100]);
  });
});

describe("pieSlices", () => {
  it("quarters four equal values and empties on junk", () => {
    expect(pieSlices([1, 1, 1, 1])).toEqual([
      { fraction: 0.25, offset: 0 },
      { fraction: 0.25, offset: 0.25 },
      { fraction: 0.25, offset: 0.5 },
      { fraction: 0.25, offset: 0.75 },
    ]);
    expect(pieSlices([])).toEqual([]);
    expect(pieSlices([0, 0])).toEqual([]);
  });
});

describe("gaugeAngle", () => {
  it("maps value to semicircle degrees clamped", () => {
    expect(gaugeAngle(50, 0, 100)).toBe(90);
    expect(gaugeAngle(-10, 0, 100)).toBe(0);
    expect(gaugeAngle(200, 0, 100)).toBe(180);
  });
});
