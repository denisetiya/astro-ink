export interface RovingOptions {
  orientation?: "horizontal" | "vertical" | "both";
  loop?: boolean;
}

export interface Roving {
  focusAt: (index: number) => void;
  destroy: () => void;
}

export function createRoving(
  container: HTMLElement,
  itemSelector: string,
  options: RovingOptions = {},
): Roving {
  const { orientation = "horizontal", loop = true } = options;

  const items = (): HTMLElement[] =>
    Array.from(container.querySelectorAll<HTMLElement>(itemSelector));

  const syncTabindex = (activeIndex: number) => {
    items().forEach((el, i) => {
      el.tabIndex = i === activeIndex ? 0 : -1;
    });
  };
  syncTabindex(0);

  const focusAt = (index: number) => {
    const list = items();
    if (list.length === 0) return;
    let next = index;
    if (loop) {
      next = ((index % list.length) + list.length) % list.length;
    } else {
      next = Math.min(list.length - 1, Math.max(0, index));
    }
    syncTabindex(next);
    list[next]!.focus();
  };

  const currentIndex = (): number => {
    const list = items();
    const active = document.activeElement;
    const found = active instanceof HTMLElement ? list.indexOf(active) : -1;
    return found === -1 ? 0 : found;
  };

  const handleKeydown = (event: KeyboardEvent) => {
    const horizontal = orientation === "horizontal" || orientation === "both";
    const vertical = orientation === "vertical" || orientation === "both";
    const at = currentIndex();
    switch (event.key) {
      case "ArrowRight":
        if (!horizontal) return;
        break;
      case "ArrowLeft":
        if (!horizontal) return;
        break;
      case "ArrowDown":
        if (!vertical) return;
        break;
      case "ArrowUp":
        if (!vertical) return;
        break;
      case "Home":
        event.preventDefault();
        focusAt(0);
        return;
      case "End":
        event.preventDefault();
        focusAt(items().length - 1);
        return;
      default:
        return;
    }
    event.preventDefault();
    if (event.key === "ArrowRight" || event.key === "ArrowDown") focusAt(at + 1);
    else focusAt(at - 1);
  };

  container.addEventListener("keydown", handleKeydown);
  return { focusAt, destroy: () => container.removeEventListener("keydown", handleKeydown) };
}
