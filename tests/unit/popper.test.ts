import { describe, it, expect } from "vitest";
import { computePosition } from "../../src/scripts/popper";

describe("computePosition", () => {
  const vp = { w: 1000, h: 800 };

  it("places below by default", () => {
    const p = computePosition(
      { x: 100, y: 100, width: 50, height: 20 },
      { width: 120, height: 60 },
      vp,
      {},
    );
    expect(p.top).toBe(128);
    expect(p.left).toBe(65);
    expect(p.placement).toBe("bottom");
  });

  it("flips to top when no room below", () => {
    const p = computePosition(
      { x: 100, y: 750, width: 50, height: 20 },
      { width: 120, height: 60 },
      vp,
      {},
    );
    expect(p.placement).toBe("top");
    expect(p.top).toBe(682);
  });

  it("clamps left inside viewport", () => {
    const p = computePosition(
      { x: 950, y: 100, width: 50, height: 20 },
      { width: 120, height: 60 },
      vp,
      {},
    );
    expect(p.left).toBeLessThanOrEqual(1000 - 120 - 8);
  });

  it("respects explicit placement", () => {
    const p = computePosition(
      { x: 300, y: 300, width: 50, height: 20 },
      { width: 120, height: 60 },
      vp,
      { placement: "right", flip: false },
    );
    expect(p.placement).toBe("right");
    expect(p.left).toBe(358);
  });
});
