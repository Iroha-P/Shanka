function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function computeOverlayBounds({ target, overlay, screen }) {
  const width = Math.min(overlay.width, screen.width);
  const height = Math.min(overlay.height, screen.height);
  const inset = 32;

  const preferredX = target.x + target.width - width - inset;
  const preferredY = target.y + inset;

  return {
    x: clamp(preferredX, 0, screen.width - width),
    y: clamp(preferredY, 0, screen.height - height),
    width,
    height
  };
}
