import { describe, it, expect } from "vitest";
import { buildPageList } from "../../src/scripts/pagination";

describe("buildPageList", () => {
  it("lists all when few pages", () => {
    expect(buildPageList(2, 5)).toEqual([1, 2, 3, 4, 5]);
  });

  it("adds ellipsis for many pages", () => {
    expect(buildPageList(1, 12)).toEqual([1, 2, 3, 4, "…", 12]);
  });

  it("windows around current", () => {
    expect(buildPageList(6, 12)).toEqual([1, "…", 5, 6, 7, "…", 12]);
  });

  it("clamps out of range", () => {
    expect(buildPageList(99, 4)).toEqual([1, 2, 3, 4]);
    expect(buildPageList(0, 4)).toEqual([1, 2, 3, 4]);
  });

  it("handles edges without duplicate ellipsis", () => {
    expect(buildPageList(11, 12)).toEqual([1, "…", 9, 10, 11, 12]);
  });

  it("returns empty for invalid total", () => {
    expect(buildPageList(1, 0)).toEqual([]);
  });
});
