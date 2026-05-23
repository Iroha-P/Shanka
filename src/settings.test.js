import test from "node:test";
import assert from "node:assert/strict";

import { defaultSettings, isValidRewardUrl, normalizeSettings } from "./settings.js";

test("provides default session settings", () => {
  assert.deepEqual(defaultSettings(), {
    contentMode: "vocab",
    unlockAfter: 3,
    rewardSeconds: 30,
    rewardUrl: "https://www.douyin.com"
  });
});

test("normalizes valid settings", () => {
  assert.deepEqual(
    normalizeSettings({
      contentMode: "mixed",
      unlockAfter: "5",
      rewardSeconds: "60",
      rewardUrl: "https://www.douyin.com/discover"
    }),
    {
      contentMode: "mixed",
      unlockAfter: 5,
      rewardSeconds: 60,
      rewardUrl: "https://www.douyin.com/discover"
    }
  );
});

test("falls back for unsupported settings", () => {
  assert.deepEqual(
    normalizeSettings({ contentMode: "unknown", unlockAfter: 9, rewardSeconds: 90, rewardUrl: "javascript:alert(1)" }),
    defaultSettings()
  );
});

test("accepts only http reward urls", () => {
  assert.equal(isValidRewardUrl("https://www.douyin.com"), true);
  assert.equal(isValidRewardUrl("http://localhost:3000"), true);
  assert.equal(isValidRewardUrl("file:///tmp/video.html"), false);
});
