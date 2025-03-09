export function checkStraightLine(
  points: [[number, number], [number, number], [number, number]],
): boolean {
  if (points.length < 3) return false;

  const [x1, y1] = points[0];
  const [x2, y2] = points[1];
  const [x3, y3] = points[2];

  // Calculate slopes
  const slope1 = (y2 - y1) / (x2 - x1);
  const slope2 = (y3 - y2) / (x3 - x2);

  // Check if slopes are equal (within a small epsilon for floating point comparison)
  return Math.abs(slope1 - slope2) < 0.0001;
}
