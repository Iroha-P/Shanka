import test from "node:test";
import assert from "node:assert/strict";

import { normalizeDetectorStatus } from "./detectorStatus.js";

test("normalizes detector status payloads", () => {
  assert.deepEqual(normalizeDetectorStatus({ connected: 1, busy: true, score: 0.91 }), {
    connected: true,
    busy: true,
    score: 0.91,
    message: ""
  });
});

test("defaults missing detector status values", () => {
  assert.deepEqual(normalizeDetectorStatus(), {
    connected: false,
    busy: false,
    score: 0,
    message: ""
  });
});
