export interface InkOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export type OptionInput = string | InkOption;

export function normalizeOptions(options: OptionInput[]): InkOption[] {
  return options.map((o) => (typeof o === "string" ? { value: o, label: o } : o));
}

export function filterOptions(options: InkOption[], query: string): InkOption[] {
  const q = query.trim().toLowerCase();
  if (!q) return options;
  return options.filter(
    (o) => o.label.toLowerCase().includes(q) || o.value.toLowerCase().includes(q),
  );
}
