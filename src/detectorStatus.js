export function normalizeDetectorStatus(input = {}) {
  return {
    connected: Boolean(input.connected),
    busy: Boolean(input.busy),
    score: Number.isFinite(input.score) ? input.score : 0,
    message: typeof input.message === "string" ? input.message : ""
  };
}
