import test from "node:test";
import assert from "node:assert/strict";

import { isNextFeedGesture, isPreviousFeedGesture, nextFeedbackClass } from "./feedController.js";

test("detects next feed gestures", () => {
  assert.equal(isNextFeedGesture({ deltaY: 40 }), true);
  assert.equal(isNextFeedGesture({ key: "ArrowDown" }), true);
  assert.equal(isNextFeedGesture({ key: "j" }), true);
  assert.equal(isNextFeedGesture({ deltaY: 8 }), false);
});

test("detects previous feed gestures", () => {
  assert.equal(isPreviousFeedGesture({ deltaY: -40 }), true);
  assert.equal(isPreviousFeedGesture({ key: "ArrowUp" }), true);
  assert.equal(isPreviousFeedGesture({ key: "k" }), true);
  assert.equal(isPreviousFeedGesture({ deltaY: -8 }), false);
});

test("maps answer result to feedback class", () => {
  assert.equal(nextFeedbackClass("known"), "feedback-known");
  assert.equal(nextFeedbackClass("fuzzy"), "feedback-fuzzy");
});
