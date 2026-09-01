export function computeSplitPercent(pos: number, size: number, min: number, max: number): number {
  if (size <= 0) return min;
  const pct = (pos / size) * 100;
  return Math.round(Math.min(max, Math.max(min, pct)) * 10) / 10;
}
