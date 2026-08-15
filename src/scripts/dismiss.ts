export function onEscape(
  target: HTMLElement,
  callback: () => void,
): () => void {
  const handler = (event: KeyboardEvent) => {
    if (event.key === "Escape") callback();
  };
  target.addEventListener("keydown", handler);
  return () => target.removeEventListener("keydown", handler);
}

export function onOutsideClick(
  target: HTMLElement,
  callback: () => void,
): () => void {
  const handler = (event: MouseEvent) => {
    if (event.target instanceof Node && !target.contains(event.target)) {
      callback();
    }
  };
  document.addEventListener("pointerdown", handler, true);
  return () => document.removeEventListener("pointerdown", handler, true);
}
