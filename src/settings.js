const DEFAULT_SETTINGS = {
  contentMode: "vocab",
  unlockAfter: 3,
  rewardSeconds: 30,
  rewardUrl: "https://www.douyin.com"
};

const VALID_UNLOCK_AFTER = new Set([2, 3, 5]);
const VALID_REWARD_SECONDS = new Set([15, 30, 60]);
const VALID_CONTENT_MODES = new Set(["vocab", "tech", "mixed"]);

export function defaultSettings() {
  return { ...DEFAULT_SETTINGS };
}

export function normalizeSettings(input = {}) {
  const unlockAfter = Number(input.unlockAfter);
  const rewardSeconds = Number(input.rewardSeconds);
  const contentMode = typeof input.contentMode === "string" ? input.contentMode : DEFAULT_SETTINGS.contentMode;
  const rewardUrl = typeof input.rewardUrl === "string" ? input.rewardUrl : DEFAULT_SETTINGS.rewardUrl;

  return {
    contentMode: VALID_CONTENT_MODES.has(contentMode) ? contentMode : DEFAULT_SETTINGS.contentMode,
    unlockAfter: VALID_UNLOCK_AFTER.has(unlockAfter) ? unlockAfter : DEFAULT_SETTINGS.unlockAfter,
    rewardSeconds: VALID_REWARD_SECONDS.has(rewardSeconds) ? rewardSeconds : DEFAULT_SETTINGS.rewardSeconds,
    rewardUrl: isValidRewardUrl(rewardUrl) ? rewardUrl : DEFAULT_SETTINGS.rewardUrl
  };
}

export function isValidRewardUrl(url) {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}
