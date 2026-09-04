import { describe, it, expect } from "vitest";
import { normalizeOptions, filterOptions } from "../../src/scripts/listbox";

describe("normalizeOptions", () => {
  it("passes strings through as value+label", () => {
    expect(normalizeOptions(["Ada", "Grace"])).toEqual([
      { value: "Ada", label: "Ada" },
      { value: "Grace", label: "Grace" },
    ]);
  });

  it("keeps object options as-is", () => {
    expect(normalizeOptions([{ value: "a", label: "Ada" }])).toEqual([
      { value: "a", label: "Ada" },
    ]);
  });
});

describe("filterOptions", () => {
  it("matches case-insensitively on label and value", () => {
    const options = normalizeOptions([
      "Ada Lovelace",
      { value: "gk", label: "Grace Hopper" },
    ]);
    expect(filterOptions(options, "grace")).toEqual([{ value: "gk", label: "Grace Hopper" }]);
    expect(filterOptions(options, "GK")).toEqual([{ value: "gk", label: "Grace Hopper" }]);
  });

  it("returns all options on empty query", () => {
    const options = normalizeOptions(["Ada", "Grace"]);
    expect(filterOptions(options, "")).toEqual(options);
  });

  it("returns empty array when nothing matches", () => {
    expect(filterOptions(normalizeOptions(["Ada"]), "zzz")).toEqual([]);
  });
});
