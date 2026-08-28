export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface Viewport {
  w: number;
  h: number;
}

export type Placement = "top" | "bottom" | "left" | "right";

export interface PositionOptions {
  placement?: Placement;
  gap?: number;
  flip?: boolean;
}

export interface Position {
  top: number;
  left: number;
  placement: Placement;
}

const MARGIN = 8;

function coords(
  placement: Placement,
  anchor: Rect,
  floating: Size,
  gap: number,
): { top: number; left: number } {
  switch (placement) {
    case "top":
      return {
        top: anchor.y - floating.height - gap,
        left: anchor.x + (anchor.width - floating.width) / 2,
      };
    case "bottom":
      return {
        top: anchor.y + anchor.height + gap,
        left: anchor.x + (anchor.width - floating.width) / 2,
      };
    case "left":
      return {
        top: anchor.y + (anchor.height - floating.height) / 2,
        left: anchor.x - floating.width - gap,
      };
    case "right":
      return {
        top: anchor.y + (anchor.height - floating.height) / 2,
        left: anchor.x + anchor.width + gap,
      };
  }
}

function fits(top: number, left: number, floating: Size, vp: Viewport): boolean {
  return (
    top >= MARGIN &&
    left >= MARGIN &&
    top + floating.height <= vp.h - MARGIN &&
    left + floating.width <= vp.w - MARGIN
  );
}

const OPPOSITE: Record<Placement, Placement> = {
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left",
};

export function computePosition(
  anchor: Rect,
  floating: Size,
  viewport: Viewport,
  options: PositionOptions = {},
): Position {
  const { placement = "bottom", gap = 8, flip = true } = options;
  const first = coords(placement, anchor, floating, gap);
  if (fits(first.top, first.left, floating, viewport)) {
    return { ...first, placement };
  }
  if (flip) {
    const opposite = OPPOSITE[placement];
    const second = coords(opposite, anchor, floating, gap);
    if (fits(second.top, second.left, floating, viewport)) {
      return { ...second, placement: opposite };
    }
  }
  const clamped = {
    top: Math.min(
      Math.max(first.top, MARGIN),
      Math.max(MARGIN, viewport.h - floating.height - MARGIN),
    ),
    left: Math.min(
      Math.max(first.left, MARGIN),
      Math.max(MARGIN, viewport.w - floating.width - MARGIN),
    ),
  };
  return { ...clamped, placement };
}

export function positionFloating(
  anchor: HTMLElement,
  floating: HTMLElement,
  options: PositionOptions = {},
): Position {
  const r = anchor.getBoundingClientRect();
  const pos = computePosition(
    { x: r.left, y: r.top, width: r.width, height: r.height },
    { width: floating.offsetWidth, height: floating.offsetHeight },
    { w: window.innerWidth, h: window.innerHeight },
    options,
  );
  floating.style.top = `${pos.top}px`;
  floating.style.left = `${pos.left}px`;
  floating.dataset.placement = pos.placement;
  return pos;
}
