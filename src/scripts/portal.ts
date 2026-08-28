export function portal(el: HTMLElement, target?: HTMLElement | string): () => void {
  const host =
    typeof target === "string"
      ? document.querySelector<HTMLElement>(target)
      : (target ?? document.body);
  if (!host) throw new Error(`portal target not found: ${String(target)}`);
  const marker = document.createComment("ink-portal");
  el.replaceWith(marker);
  host.appendChild(el);
  return () => {
    marker.replaceWith(el);
  };
}
