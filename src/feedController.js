export function isNextFeedGesture({ deltaY = 0, key = "" } = {}) {
  return deltaY > 28 || key === "ArrowDown" || key === "j";
}

export function isPreviousFeedGesture({ deltaY = 0, key = "" } = {}) {
  return deltaY < -28 || key === "ArrowUp" || key === "k";
}

export function nextFeedbackClass(result) {
  return result === "known" ? "feedback-known" : "feedback-fuzzy";
}
