export interface MarkedPart {
  text: string;
  hit: boolean;
}

export function markText(text: string, query: string, caseSensitive = false): MarkedPart[] {
  if (!query) return [{ text, hit: false }];
  const hay = caseSensitive ? text : text.toLowerCase();
  const needle = caseSensitive ? query : query.toLowerCase();
  const parts: MarkedPart[] = [];
  let at = 0;
  let found = hay.indexOf(needle, at);
  while (found !== -1) {
    if (found > at) parts.push({ text: text.slice(at, found), hit: false });
    parts.push({ text: text.slice(found, found + needle.length), hit: true });
    at = found + needle.length;
    found = hay.indexOf(needle, at);
  }
  if (at < text.length) parts.push({ text: text.slice(at), hit: false });
  return parts;
}
