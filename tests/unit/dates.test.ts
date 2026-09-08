import { describe, it, expect } from "vitest";
import { getMonthGrid, parseISODate, formatISODate, addMonths, isSameDay } from "../../src/scripts/dates";

describe("getMonthGrid", () => {
  it("starts Monday Jan 26 for Feb 2026 and spans 42 cells", () => {
    const grid = getMonthGrid(2026, 1);
    expect(grid).toHaveLength(42);
    expect(formatISODate(grid[0].date)).toBe("2026-01-26");
    expect(grid[0].inMonth).toBe(false);
    expect(formatISODate(grid[41].date)).toBe("2026-03-08");
  });

  it("covers leap day in Feb 2024", () => {
    const days = getMonthGrid(2024, 1).filter((c) => c.inMonth);
    expect(days).toHaveLength(29);
  });
});

describe("parseISODate", () => {
  it("accepts real dates and rejects the rest", () => {
    expect(formatISODate(parseISODate("2026-09-12")!)).toBe("2026-09-12");
    expect(parseISODate("2026-13-01")).toBeUndefined();
    expect(parseISODate("2026-02-30")).toBeUndefined();
    expect(parseISODate("not-a-date")).toBeUndefined();
    expect(parseISODate("")).toBeUndefined();
  });
});

describe("addMonths", () => {
  it("clamps month-end overflow", () => {
    expect(formatISODate(addMonths(parseISODate("2026-01-31")!, 1))).toBe("2026-02-28");
  });
  it("compares days ignoring time", () => {
    expect(isSameDay(new Date(2026, 8, 12, 8), new Date(2026, 8, 12, 20))).toBe(true);
  });
});
