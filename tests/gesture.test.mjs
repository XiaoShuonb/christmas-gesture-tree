import assert from 'node:assert/strict';
import { classifyHand } from '../dist/gesture.mjs';

const point = (x, y, z = 0) => ({ x, y, z });
const base = () => Array.from({ length: 21 }, () => point(0, 0));

function openHand() {
  const p = base();
  p[0] = point(0, 1);
  p[1] = point(-0.12, 0.82); p[2] = point(-0.24, 0.68); p[3] = point(-0.34, 0.58); p[4] = point(-0.45, 0.5);
  for (const [x, ids] of [[-0.18, [5, 6, 7, 8]], [-0.06, [9, 10, 11, 12]], [0.08, [13, 14, 15, 16]], [0.2, [17, 18, 19, 20]]]) {
    ids.forEach((id, index) => { p[id] = point(x, 0.72 - index * 0.19); });
  }
  return p;
}

function fist() {
  const p = openHand();
  for (const [x, ids] of [[-0.18, [5, 6, 7, 8]], [-0.06, [9, 10, 11, 12]], [0.08, [13, 14, 15, 16]], [0.2, [17, 18, 19, 20]]]) {
    p[ids[0]] = point(x, 0.72);
    p[ids[1]] = point(x, 0.55);
    p[ids[2]] = point(x + 0.08, 0.6);
    p[ids[3]] = point(x + 0.1, 0.74);
  }
  p[4] = point(-0.35, 0.62);
  return p;
}

function pinch() {
  const p = openHand();
  p[4] = point(-0.17, 0.18);
  p[8] = point(-0.16, 0.17);
  return p;
}

assert.equal(classifyHand(openHand()).gesture, 'open');
assert.equal(classifyHand(fist()).gesture, 'fist');
assert.equal(classifyHand(pinch()).gesture, 'pinch');
assert.equal(classifyHand([]).gesture, 'none');
console.log('gesture classifier: 4 checks passed');
