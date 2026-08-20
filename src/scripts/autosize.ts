export function autosize(el: HTMLTextAreaElement): () => void {
  const cs = getComputedStyle(el);
  const extra =
    (parseFloat(cs.borderTopWidth) || 0) + (parseFloat(cs.borderBottomWidth) || 0);

  const resize = () => {
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight + extra}px`;
  };

  el.addEventListener("input", resize);
  resize();
  return () => el.removeEventListener("input", resize);
}
