import test from "node:test";
import assert from "node:assert/strict";

import { computeOverlayBounds } from "./windowPlacement.js";

test("places overlay on the right side of a wide Codex window", () => {
  const bounds = computeOverlayBounds({
    target: { x: 100, y: 80, width: 1200, height: 900 },
    overlay: { width: 360, height: 720 },
    screen: { width: 1600, height: 1000 }
  });

  assert.deepEqual(bounds, { x: 908, y: 112, width: 360, height: 720 });
});

test("keeps overlay inside the screen when the Codex window is near the right edge", () => {
  const bounds = computeOverlayBounds({
    target: { x: 900, y: 80, width: 650, height: 800 },
    overlay: { width: 360, height: 720 },
    screen: { width: 1600, height: 1000 }
  });

  assert.deepEqual(bounds, { x: 1158, y: 112, width: 360, height: 720 });
});
