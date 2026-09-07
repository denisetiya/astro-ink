import { describe, it, expect } from "vitest";
import { splitByIds } from "../../src/scripts/transfer";
import { normalizeOptions } from "../../src/scripts/listbox";

describe("splitByIds", () => {
  it("partitions matched items preserving order", () => {
    const items = normalizeOptions(["a", "b", "c"]);
    expect(splitByIds(items, new Set(["b", "c"]))).toEqual({
      kept: [{ value: "a", label: "a" }],
      moved: [
        { value: "b", label: "b" },
        { value: "c", label: "c" },
      ],
    });
  });

  it("ignores unknown ids", () => {
    const items = normalizeOptions(["a"]);
    expect(splitByIds(items, new Set(["zzz"]))).toEqual({
      kept: [{ value: "a", label: "a" }],
      moved: [],
    });
  });
});
