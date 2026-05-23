# Shanka MVP

Shanka converts Codex Desktop wait time into a short-video-style micro-learning loop.

## Completed

- Always-on-top Electron phone window.
- Dark Codex-like UI with screenshot-derived light/dark theme switching.
- Vocabulary and tech cards with click/space flip.
- Feed controls: mouse wheel down, `ArrowDown`, and `j`.
- Answer feedback animations and reward unlock glow.
- Learn N cards before opening the Douyin reward.
- Timed reward that pulls focus back to Shanka.
- Persistent settings for unlock threshold and reward seconds.
- In-app settings sheet for content mode, reward URL, unlock threshold, and reward seconds.
- Local HTTP API for detector control.
- Python Codex watcher: window discovery, screenshot capture, template matching, theme inference, status reporting.
- Focus handoff back to Codex when the busy template disappears.
- One-command Codex mode.
- Windows double-click launcher.
- Doctor command for readiness checks.
- Install, capture, launch, and doctor `.cmd` helpers.

## Main Commands

```bash
npm install
python -m pip install -r requirements.txt
npm run capture:codex
npm run codex:mode
```

Development and verification:

```bash
npm start
npm run watch:codex
npm run doctor
npm test
```

## First-Time Flow

1. Open Codex Desktop and start a task so the busy indicator is visible.
2. Run `npm run capture:codex`.
3. Select the Stop/loading area and press Enter.
4. Run `npm run codex:mode`.

## Known Limits

- Busy detection uses template matching. If Codex UI scale/theme changes, recapture the template.
- Douyin opens externally instead of embedding the full recommendation feed.
- The first content module is vocabulary cards. Tech cards, file declutter, and local video rewards can be added through the same rule engine.
