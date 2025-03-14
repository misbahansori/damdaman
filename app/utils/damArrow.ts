import type { DamCoordinate } from "~~/shared/types/socket";

/**
 * Calculate points for a blunt arrowhead
 * @param line The dam coordinate line
 * @returns SVG points string for the blunt arrowhead
 */
export const getTrianglePoints = (line: DamCoordinate): string => {
  if (!line) return "";

  // Normal direction: activePawn as start and target as end
  const startX = line.activePawn.x;
  const startY = line.activePawn.y;
  const endX = line.target.x;
  const endY = line.target.y;

  // Calculate direction
  const dx = endX - startX;
  const dy = endY - startY;
  const length = Math.sqrt(dx * dx + dy * dy);

  // Normalize direction
  const ndx = dx / length;
  const ndy = dy / length;

  // Perpendicular direction
  const perpX = -ndy;
  const perpY = ndx;

  // Triangle size proportional to line width
  const triangleSize = 32; // Shortened from 80
  const triangleWidth = 28; // Widened from 40
  const tipFlatness = 0; // How flat to make the tip (higher = more blunt)

  // Calculate points for a blunt-tipped arrow
  // Tip edge is now exactly at the end point
  const tipRightX = endX + tipFlatness * perpX * 0.5;
  const tipRightY = endY + tipFlatness * perpY * 0.5;

  const tipLeftX = endX - tipFlatness * perpX * 0.5;
  const tipLeftY = endY - tipFlatness * perpY * 0.5;

  const leftX = endX - triangleSize * ndx + triangleWidth * perpX;
  const leftY = endY - triangleSize * ndy + triangleWidth * perpY;

  const rightX = endX - triangleSize * ndx - triangleWidth * perpX;
  const rightY = endY - triangleSize * ndy - triangleWidth * perpY;

  return `${tipRightX},${tipRightY} ${tipLeftX},${tipLeftY} ${leftX},${leftY} ${rightX},${rightY}`;
};

/**
 * Calculate larger blunt arrowhead points for additional glow effect
 * @param line The dam coordinate line
 * @param scaleFactor Scale factor for the arrowhead size
 * @returns SVG points string for the larger blunt arrowhead
 */
export const getLargerTrianglePoints = (
  line: DamCoordinate,
  scaleFactor: number = 1.3,
): string => {
  if (!line) return "";

  // Normal direction: activePawn as start and target as end
  const startX = line.activePawn.x;
  const startY = line.activePawn.y;
  const endX = line.target.x;
  const endY = line.target.y;

  // Calculate direction
  const dx = endX - startX;
  const dy = endY - startY;
  const length = Math.sqrt(dx * dx + dy * dy);

  // Normalize direction
  const ndx = dx / length;
  const ndy = dy / length;

  // Perpendicular direction
  const perpX = -ndy;
  const perpY = ndx;

  // Triangle size proportional to line width but larger for glow
  const triangleSize = 36 * scaleFactor; // Shortened from 80
  const triangleWidth = 38 * scaleFactor; // Widened from 40
  const tipFlatness = 0 * scaleFactor; // How flat to make the tip (higher = more blunt)

  // Calculate points for a blunt-tipped arrow
  // Tip edge is now exactly at the end point
  const tipRightX = endX + tipFlatness * perpX * 0.5;
  const tipRightY = endY + tipFlatness * perpY * 0.5;

  const tipLeftX = endX - tipFlatness * perpX * 0.5;
  const tipLeftY = endY - tipFlatness * perpY * 0.5;

  const leftX = endX - triangleSize * ndx + triangleWidth * perpX;
  const leftY = endY - triangleSize * ndy + triangleWidth * perpY;

  const rightX = endX - triangleSize * ndx - triangleWidth * perpX;
  const rightY = endY - triangleSize * ndy - triangleWidth * perpY;

  return `${tipRightX},${tipRightY} ${tipLeftX},${tipLeftY} ${leftX},${leftY} ${rightX},${rightY}`;
};
