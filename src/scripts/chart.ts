export function scaleLinear(
  domainMin: number,
  domainMax: number,
  rangeMin: number,
  rangeMax: number,
): (v: number) => number {
  if (domainMax === domainMin) return () => rangeMin;
  const span = domainMax - domainMin;
  const size = rangeMax - rangeMin;
  return (v: number) => rangeMin + ((v - domainMin) / span) * size;
}

export function niceTicks(min: number, max: number, count: number): number[] {
  if (!Number.isFinite(min) || !Number.isFinite(max) || !Number.isFinite(count) || count <= 0) return [];
  if (min === max) return [min];
  const lo = Math.min(min, max);
  const hi = Math.max(min, max);
  const rawStep = (hi - lo) / count;
  const magnitude = Math.pow(10, Math.floor(Math.log10(rawStep)));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * magnitude).find((s) => s >= rawStep) ?? 10 * magnitude;
  const decimals = Math.max(0, -Math.floor(Math.log10(step)));
  const start = Math.floor(lo / step) * step;
  const end = Math.ceil(hi / step) * step;
  const ticks: number[] = [];
  for (let v = start; v <= end + step / 2; v += step) {
    ticks.push(Number(v.toFixed(decimals)));
  }
  return ticks;
}

export function pieSlices(values: number[]): Array<{ fraction: number; offset: number }> {
  const total = values.reduce((sum, v) => sum + v, 0);
  if (values.length === 0 || total <= 0) return [];
  let acc = 0;
  return values.map((v) => {
    const slice = { fraction: v / total, offset: acc };
    acc += v / total;
    return slice;
  });
}

export function gaugeAngle(value: number, min: number, max: number): number {
  if (max <= min) return 0;
  const clamped = Math.min(max, Math.max(min, value));
  return ((clamped - min) / (max - min)) * 180;
}
