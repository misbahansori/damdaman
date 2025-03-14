/**
 * Definitions of SVG filters for creating glow effects
 * These can be included in SVG defs section
 */
export const glowFilters = `
  <!-- Main glow filter -->
  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
    <feGaussianBlur in="SourceGraphic" stdDeviation="8" />
  </filter>

  <!-- Stronger glow for outer layers -->
  <filter id="strongGlow" x="-100%" y="-100%" width="300%" height="300%">
    <feGaussianBlur in="SourceGraphic" stdDeviation="15" />
  </filter>

  <!-- Inner glow for middle layers -->
  <filter id="innerGlow" x="-30%" y="-30%" width="160%" height="160%">
    <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
  </filter>

  <!-- White highlight glow -->
  <filter id="whiteGlow" x="-20%" y="-20%" width="140%" height="140%">
    <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
  </filter>
`;

/**
 * Get color values for dam arrow based on color
 * @param color The dam color ('red' or 'blue')
 * @returns Object with color values for different glow layers
 */
export const getDamArrowColors = (color: "red" | "blue") => {
  return {
    outerGlow: color === "red" ? "#ff2020" : "#2020ff",
    middleGlow: color === "red" ? "#ff3030" : "#3030ff",
    innerGlow: color === "red" ? "#ff5050" : "#5050ff",
    brightCore: color === "red" ? "#ff8080" : "#8080ff",
    lightCore: color === "red" ? "#ffaaaa" : "#aaaaff",
  };
};
