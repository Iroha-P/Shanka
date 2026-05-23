import unittest
from tempfile import TemporaryDirectory
from pathlib import Path

import numpy as np

from scripts.codex_watch import (
    BusyState,
    command_for_busy_state,
    detect_template_score,
    has_busy_templates,
    infer_theme_from_screenshot,
)


class CodexWatchTests(unittest.TestCase):
    def test_detect_template_score_finds_template_in_screenshot(self):
        screenshot = np.zeros((120, 160, 3), dtype=np.uint8)
        template = np.zeros((12, 20, 3), dtype=np.uint8)
        template[:, :] = (40, 90, 180)
        template[3:9, 5:15] = (220, 220, 220)
        screenshot[50:62, 70:90] = template

        score = detect_template_score(screenshot, template)

        self.assertGreater(score, 0.99)

    def test_busy_state_requires_stable_samples(self):
        state = BusyState(required_samples=2)

        self.assertIsNone(state.update(False))
        self.assertIsNone(state.update(True))
        self.assertEqual(state.update(True), True)
        self.assertIsNone(state.update(False))
        self.assertEqual(state.update(False), False)

    def test_infer_theme_from_screenshot_uses_window_brightness(self):
        dark = np.zeros((120, 160, 3), dtype=np.uint8)
        light = np.full((120, 160, 3), 240, dtype=np.uint8)

        self.assertEqual(infer_theme_from_screenshot(dark), "dark")
        self.assertEqual(infer_theme_from_screenshot(light), "light")

    def test_has_busy_templates_detects_busy_png_files(self):
        with TemporaryDirectory() as directory:
            template_dir = Path(directory)
            self.assertFalse(has_busy_templates(template_dir))

            (template_dir / "busy.png").write_bytes(b"not a real image but present")
            self.assertTrue(has_busy_templates(template_dir))

    def test_command_for_busy_state(self):
        self.assertEqual(command_for_busy_state(True), "start")
        self.assertEqual(command_for_busy_state(False), "end")


if __name__ == "__main__":
    unittest.main()
