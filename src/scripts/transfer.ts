import type { InkOption } from "./listbox";

export interface SplitResult {
  kept: InkOption[];
  moved: InkOption[];
}

export function splitByIds(items: InkOption[], ids: Set<string>): SplitResult {
  const kept: InkOption[] = [];
  const moved: InkOption[] = [];
  for (const item of items) {
    (ids.has(item.value) ? moved : kept).push(item);
  }
  return { kept, moved };
}
