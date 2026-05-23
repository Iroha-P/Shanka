import test from "node:test";
import assert from "node:assert/strict";

import { interleave, selectCardsByMode } from "./cardSources.js";

const vocabulary = [{ word: "latency" }, { word: "compose" }];
const tech = [{ word: "debounce" }, { word: "idempotent" }];

test("selects vocabulary cards by default", () => {
  assert.deepEqual(selectCardsByMode({ vocabulary, tech }), vocabulary);
});

test("selects tech cards", () => {
  assert.deepEqual(selectCardsByMode({ vocabulary, tech }, "tech"), tech);
});

test("selects mixed cards by interleaving sources", () => {
  assert.deepEqual(selectCardsByMode({ vocabulary, tech }, "mixed"), [
    { word: "latency" },
    { word: "debounce" },
    { word: "compose" },
    { word: "idempotent" }
  ]);
});

test("interleaves uneven lists", () => {
  assert.deepEqual(interleave([{ id: 1 }], [{ id: 2 }, { id: 3 }]), [{ id: 1 }, { id: 2 }, { id: 3 }]);
});
