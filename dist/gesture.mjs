const distance = (points, a, b) => Math.hypot(
  points[a].x - points[b].x,
  points[a].y - points[b].y,
  (points[a].z ?? 0) - (points[b].z ?? 0),
);

const jointAngle = (points, a, b, c) => {
  const ab = {
    x: points[a].x - points[b].x,
    y: points[a].y - points[b].y,
    z: (points[a].z ?? 0) - (points[b].z ?? 0),
  };
  const cb = {
    x: points[c].x - points[b].x,
    y: points[c].y - points[b].y,
    z: (points[c].z ?? 0) - (points[b].z ?? 0),
  };
  const dot = ab.x * cb.x + ab.y * cb.y + ab.z * cb.z;
  const size = Math.hypot(ab.x, ab.y, ab.z) * Math.hypot(cb.x, cb.y, cb.z);
  return Math.acos(Math.max(-1, Math.min(1, dot / Math.max(size, 1e-6)))) * 180 / Math.PI;
};

export function classifyHand(points) {
  if (!points || points.length < 21) return { gesture: 'none', extended: 0, pinchRatio: 1 };

  const palmSize = Math.max(distance(points, 0, 9), 0.02);
  const pinchRatio = distance(points, 4, 8) / palmSize;
  const fingers = [
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16],
    [17, 18, 19, 20],
  ];
  const extended = fingers.filter(([mcp, pip, dip, tip]) => (
    jointAngle(points, mcp, pip, dip) > 145 &&
    jointAngle(points, pip, dip, tip) > 145 &&
    distance(points, tip, 0) > distance(points, pip, 0) * 1.06
  )).length;

  let gesture = 'move';
  if (pinchRatio < 0.32) gesture = 'pinch';
  else if (extended >= 3) gesture = 'open';
  else if (extended <= 1) gesture = 'fist';

  return { gesture, extended, pinchRatio };
}
