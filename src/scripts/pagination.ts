export function buildPageList(page: number, total: number): Array<number | "…"> {
  if (total < 1) return [];
  const current = Math.min(total, Math.max(1, Math.floor(page)));
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const keep = new Set<number>([1, total, current - 1, current, current + 1]);
  if (current <= 4) {
    keep.add(2);
    keep.add(3);
    keep.add(4);
  }
  if (current >= total - 3) {
    keep.add(total - 3);
    keep.add(total - 2);
    keep.add(total - 1);
  }
  const pages = Array.from(keep)
    .filter((n) => n >= 1 && n <= total)
    .sort((a, b) => a - b);
  const out: Array<number | "…"> = [];
  let prev = 0;
  for (const n of pages) {
    if (n - prev > 1) out.push("…");
    out.push(n);
    prev = n;
  }
  return out;
}
