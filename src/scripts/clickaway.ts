import { onOutsideClick } from "./dismiss";

export function onClickAway(el: HTMLElement, callback: () => void): () => void {
  return onOutsideClick(el, callback);
}
