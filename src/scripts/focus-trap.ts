const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  'input:not([disabled]):not([type="hidden"])',
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(", ");

export function trapFocus(container: HTMLElement): () => void {
  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key !== "Tab") return;

    const items = Array.from(
      container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
    );
    if (items.length === 0) return;

    const active = document.activeElement;
    const activeIndex =
      active instanceof HTMLElement && container.contains(active)
        ? items.indexOf(active)
        : -1;

    event.preventDefault();

    let nextIndex: number;
    if (activeIndex === -1) {
      nextIndex = event.shiftKey ? items.length - 1 : 0;
    } else {
      nextIndex = event.shiftKey ? activeIndex - 1 : activeIndex + 1;
      if (nextIndex < 0) nextIndex = items.length - 1;
      if (nextIndex >= items.length) nextIndex = 0;
    }

    items[nextIndex]!.focus();
  };

  container.addEventListener("keydown", handleKeydown);
  return () => container.removeEventListener("keydown", handleKeydown);
}
