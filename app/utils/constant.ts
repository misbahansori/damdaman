export const boardLines = [
  { x1: 100, y1: 400, x2: 900, y2: 400 },
  { x1: 100, y1: 600, x2: 900, y2: 600 },
  { x1: 100, y1: 800, x2: 900, y2: 800 },
  { x1: 100, y1: 1000, x2: 900, y2: 1000 },
  { x1: 100, y1: 1200, x2: 900, y2: 1200 },
  { x1: 100, y1: 1200, x2: 100, y2: 400 },
  { x1: 300, y1: 1200, x2: 300, y2: 400 },
  { x1: 500, y1: 1500, x2: 500, y2: 100 },
  { x1: 700, y1: 1200, x2: 700, y2: 400 },
  { x1: 900, y1: 1200, x2: 900, y2: 400 },
  { x1: 100, y1: 800, x2: 800, y2: 1500 },
  { x1: 900, y1: 800, x2: 200, y2: 1500 },
  { x1: 100, y1: 800, x2: 800, y2: 100 },
  { x1: 900, y1: 800, x2: 200, y2: 100 },
  { x1: 200, y1: 100, x2: 800, y2: 100 },
  { x1: 200, y1: 1500, x2: 800, y2: 1500 },
  { x1: 325, y1: 225, x2: 675, y2: 225 },
  { x1: 325, y1: 1375, x2: 675, y2: 1375 },
  { x1: 100, y1: 400, x2: 900, y2: 1200 },
  { x1: 900, y1: 400, x2: 100, y2: 1200 },
];

export const boardCoordinate: Array<PawnCoordinate> = [
  {
    x: 200,
    y: 100,
    possiblePaths: [
      { x: 500, y: 100 },
      { x: 325, y: 225 },
    ],
    eatingPaths: [
      { x: 800, y: 100 },
      { x: 500, y: 400 },
    ],
    additionalPaths: [
      { x: 800, y: 100 },
      { x: 700, y: 600 },
      { x: 900, y: 800 },
    ],
  },
  {
    x: 500,
    y: 100,
    possiblePaths: [
      { x: 200, y: 100 },
      { x: 800, y: 100 },
      { x: 500, y: 225 },
    ],
    eatingPaths: [{ x: 500, y: 400 }],
    additionalPaths: [
      { x: 500, y: 600 },
      { x: 500, y: 800 },
      { x: 500, y: 1000 },
      { x: 500, y: 1200 },
      { x: 500, y: 1375 },
      { x: 500, y: 1500 },
    ],
  },
  {
    x: 500,
    y: 225,
    possiblePaths: [
      { x: 500, y: 100 },
      { x: 675, y: 225 },
      { x: 325, y: 225 },
      { x: 500, y: 400 },
    ],
    eatingPaths: [{ x: 500, y: 600 }],
    additionalPaths: [
      { x: 500, y: 800 },
      { x: 500, y: 1000 },
      { x: 500, y: 1200 },
      { x: 500, y: 1375 },
      { x: 500, y: 1500 },
    ],
  },
  {
    x: 800,
    y: 100,
    possiblePaths: [
      { x: 500, y: 100 },
      { x: 675, y: 225 },
    ],
    eatingPaths: [
      { x: 200, y: 100 },
      { x: 500, y: 400 },
    ],
    additionalPaths: [
      { x: 300, y: 600 },
      { x: 100, y: 800 },
    ],
  },
  {
    x: 325,
    y: 225,
    possiblePaths: [
      { x: 500, y: 225 },
      { x: 200, y: 100 },
      { x: 500, y: 400 },
    ],
    eatingPaths: [
      { x: 675, y: 225 },
      { x: 700, y: 600 },
    ],
    additionalPaths: [{ x: 900, y: 800 }],
  },
  {
    x: 675,
    y: 225,
    possiblePaths: [
      { x: 800, y: 100 },
      { x: 500, y: 225 },
      { x: 500, y: 400 },
    ],
    eatingPaths: [
      { x: 325, y: 225 },
      { x: 300, y: 600 },
    ],
    additionalPaths: [{ x: 100, y: 800 }],
  },
  {
    x: 100,
    y: 400,
    possiblePaths: [
      { x: 100, y: 600 },
      { x: 300, y: 400 },
      { x: 300, y: 600 },
    ],
    eatingPaths: [
      { x: 100, y: 800 },
      { x: 500, y: 400 },
      { x: 500, y: 800 },
    ],
    additionalPaths: [
      { x: 100, y: 1000 },
      { x: 100, y: 1200 },
      { x: 700, y: 1000 },
      { x: 900, y: 1200 },
      { x: 700, y: 400 },
      { x: 900, y: 400 },
    ],
  },
  {
    x: 300,
    y: 400,
    possiblePaths: [
      { x: 100, y: 400 },
      { x: 300, y: 600 },
      { x: 500, y: 400 },
    ],
    eatingPaths: [
      { x: 700, y: 400 },
      { x: 300, y: 800 },
    ],
    additionalPaths: [
      { x: 300, y: 1000 },
      { x: 900, y: 400 },
      { x: 300, y: 1200 },
    ],
  },
  {
    x: 500,
    y: 400,
    possiblePaths: [
      { x: 325, y: 225 },
      { x: 500, y: 225 },
      { x: 675, y: 225 },
      { x: 700, y: 400 },
      { x: 700, y: 600 },
      { x: 500, y: 600 },
      { x: 300, y: 600 },
      { x: 300, y: 400 },
    ],
    eatingPaths: [
      { x: 200, y: 100 },
      { x: 500, y: 100 },
      { x: 800, y: 100 },
      { x: 100, y: 400 },
      { x: 100, y: 800 },
      { x: 500, y: 800 },
      { x: 900, y: 800 },
      { x: 900, y: 400 },
    ],
    additionalPaths: [
      { x: 500, y: 1000 },
      { x: 500, y: 1200 },
      { x: 500, y: 1375 },
      { x: 500, y: 1500 },
    ],
  },
  {
    x: 700,
    y: 400,
    possiblePaths: [
      { x: 500, y: 400 },
      { x: 700, y: 600 },
      { x: 900, y: 400 },
    ],
    eatingPaths: [
      { x: 300, y: 400 },
      { x: 700, y: 800 },
    ],
    additionalPaths: [
      { x: 100, y: 400 },
      { x: 700, y: 1000 },
      { x: 700, y: 1200 },
    ],
  },
  {
    x: 900,
    y: 400,
    possiblePaths: [
      { x: 700, y: 400 },
      { x: 900, y: 600 },
      { x: 700, y: 600 },
    ],
    eatingPaths: [
      { x: 500, y: 400 },
      { x: 500, y: 800 },
      { x: 900, y: 800 },
    ],
    additionalPaths: [
      { x: 100, y: 400 },
      { x: 300, y: 400 },
      { x: 300, y: 1000 },
      { x: 100, y: 1200 },
      { x: 900, y: 1000 },
      { x: 900, y: 1200 },
    ],
  },
  {
    x: 100,
    y: 600,
    possiblePaths: [
      { x: 100, y: 400 },
      { x: 300, y: 600 },
      { x: 100, y: 800 },
    ],
    eatingPaths: [
      { x: 500, y: 600 },
      { x: 100, y: 1000 },
    ],
    additionalPaths: [
      { x: 700, y: 600 },
      { x: 900, y: 600 },
      { x: 100, y: 1200 },
    ],
  },
  {
    x: 300,
    y: 600,
    possiblePaths: [
      { x: 100, y: 400 },
      { x: 300, y: 400 },
      { x: 500, y: 400 },
      { x: 500, y: 600 },
      { x: 500, y: 800 },
      { x: 300, y: 800 },
      { x: 100, y: 800 },
      { x: 100, y: 600 },
    ],
    eatingPaths: [
      { x: 300, y: 1000 },
      { x: 700, y: 1000 },
      { x: 700, y: 600 },
      { x: 675, y: 225 },
    ],
    additionalPaths: [
      { x: 900, y: 600 },
      { x: 900, y: 1200 },
      { x: 300, y: 1200 },
    ],
  },
  {
    x: 500,
    y: 600,
    possiblePaths: [
      { x: 300, y: 600 },
      { x: 500, y: 400 },
      { x: 700, y: 600 },
      { x: 500, y: 800 },
    ],
    eatingPaths: [
      { x: 100, y: 600 },
      { x: 500, y: 1000 },
      { x: 500, y: 225 },
      { x: 900, y: 600 },
    ],
    additionalPaths: [
      { x: 500, y: 100 },
      { x: 500, y: 1200 },
      { x: 500, y: 1375 },
      { x: 500, y: 1500 },
    ],
  },
  {
    x: 700,
    y: 600,
    possiblePaths: [
      { x: 500, y: 600 },
      { x: 500, y: 400 },
      { x: 700, y: 400 },
      { x: 900, y: 400 },
      { x: 900, y: 600 },
      { x: 900, y: 800 },
      { x: 700, y: 800 },
      { x: 500, y: 800 },
    ],
    eatingPaths: [
      { x: 300, y: 600 },
      { x: 325, y: 225 },
      { x: 700, y: 1000 },
      { x: 300, y: 1000 },
    ],
    additionalPaths: [
      { x: 200, y: 100 },
      { x: 100, y: 600 },
      { x: 100, y: 1200 },
      { x: 700, y: 1200 },
    ],
  },
  {
    x: 900,
    y: 600,
    possiblePaths: [
      { x: 700, y: 600 },
      { x: 900, y: 400 },
      { x: 900, y: 800 },
    ],
    eatingPaths: [
      { x: 500, y: 600 },
      { x: 900, y: 1000 },
    ],
    additionalPaths: [
      { x: 100, y: 600 },
      { x: 300, y: 600 },
      { x: 900, y: 1200 },
    ],
  },
  {
    x: 100,
    y: 800,
    possiblePaths: [
      { x: 100, y: 600 },
      { x: 300, y: 600 },
      { x: 300, y: 800 },
      { x: 300, y: 1000 },
      { x: 100, y: 1000 },
    ],
    eatingPaths: [
      { x: 100, y: 400 },
      { x: 500, y: 400 },
      { x: 500, y: 800 },
      { x: 500, y: 1200 },
      { x: 100, y: 1200 },
    ],
    additionalPaths: [
      { x: 675, y: 225 },
      { x: 800, y: 100 },
      { x: 700, y: 800 },
      { x: 900, y: 800 },
    ],
  },
  {
    x: 300,
    y: 800,
    possiblePaths: [
      { x: 100, y: 800 },
      { x: 300, y: 600 },
      { x: 500, y: 800 },
      { x: 300, y: 1000 },
    ],
    eatingPaths: [
      { x: 300, y: 400 },
      { x: 700, y: 800 },
      { x: 300, y: 1200 },
    ],
    additionalPaths: [{ x: 900, y: 800 }],
  },
  {
    x: 500,
    y: 800,
    possiblePaths: [
      { x: 300, y: 800 },
      { x: 300, y: 600 },
      { x: 500, y: 600 },
      { x: 700, y: 600 },
      { x: 700, y: 800 },
      { x: 700, y: 1000 },
      { x: 500, y: 1000 },
      { x: 300, y: 1000 },
    ],
    eatingPaths: [
      { x: 100, y: 400 },
      { x: 500, y: 400 },
      { x: 900, y: 400 },
      { x: 900, y: 800 },
      { x: 900, y: 1200 },
      { x: 500, y: 1200 },
      { x: 100, y: 1200 },
      { x: 100, y: 800 },
    ],
    additionalPaths: [
      { x: 500, y: 100 },
      { x: 500, y: 225 },
      { x: 500, y: 1375 },
      { x: 500, y: 1500 },
    ],
  },
  {
    x: 700,
    y: 800,
    possiblePaths: [
      { x: 500, y: 800 },
      { x: 700, y: 600 },
      { x: 900, y: 800 },
      { x: 700, y: 1000 },
    ],
    eatingPaths: [
      { x: 300, y: 800 },
      { x: 700, y: 400 },
      { x: 700, y: 1200 },
    ],
    additionalPaths: [{ x: 100, y: 800 }],
  },
  {
    x: 900,
    y: 800,
    possiblePaths: [
      { x: 700, y: 800 },
      { x: 700, y: 600 },
      { x: 900, y: 600 },
      { x: 900, y: 1000 },
      { x: 700, y: 1000 },
    ],
    eatingPaths: [
      { x: 500, y: 800 },
      { x: 500, y: 400 },
      { x: 900, y: 400 },
      { x: 900, y: 1200 },
      { x: 500, y: 1200 },
    ],
    additionalPaths: [
      { x: 200, y: 100 },
      { x: 325, y: 225 },
      { x: 325, y: 1375 },
      { x: 200, y: 1500 },
    ],
  },
  {
    x: 100,
    y: 1000,
    possiblePaths: [
      { x: 100, y: 800 },
      { x: 300, y: 1000 },
      { x: 100, y: 1200 },
    ],
    eatingPaths: [
      { x: 100, y: 600 },
      { x: 500, y: 1000 },
    ],
    additionalPaths: [
      { x: 100, y: 400 },
      { x: 700, y: 1000 },
      { x: 900, y: 1000 },
    ],
  },
  {
    x: 300,
    y: 1000,
    possiblePaths: [
      { x: 100, y: 800 },
      { x: 300, y: 800 },
      { x: 500, y: 800 },
      { x: 500, y: 1000 },
      { x: 500, y: 1200 },
      { x: 300, y: 1200 },
      { x: 100, y: 1200 },
      { x: 100, y: 1000 },
    ],
    eatingPaths: [
      { x: 300, y: 600 },
      { x: 700, y: 600 },
      { x: 700, y: 1000 },
      { x: 675, y: 1375 },
    ],
    additionalPaths: [
      { x: 300, y: 400 },
      { x: 900, y: 400 },
      { x: 900, y: 1000 },
    ],
  },
  {
    x: 500,
    y: 1000,
    possiblePaths: [
      { x: 300, y: 1000 },
      { x: 500, y: 800 },
      { x: 700, y: 1000 },
      { x: 500, y: 1200 },
    ],
    eatingPaths: [
      { x: 100, y: 1000 },
      { x: 500, y: 600 },
      { x: 900, y: 1000 },
      { x: 500, y: 1375 },
    ],
    additionalPaths: [
      { x: 500, y: 100 },
      { x: 500, y: 225 },
      { x: 500, y: 400 },
      { x: 500, y: 1500 },
    ],
  },
  {
    x: 700,
    y: 1000,
    possiblePaths: [
      { x: 500, y: 1000 },
      { x: 500, y: 800 },
      { x: 700, y: 800 },
      { x: 900, y: 800 },
      { x: 900, y: 1000 },
      { x: 900, y: 1200 },
      { x: 700, y: 1200 },
      { x: 500, y: 1200 },
    ],
    eatingPaths: [
      { x: 300, y: 1000 },
      { x: 300, y: 600 },
      { x: 700, y: 600 },
      { x: 325, y: 1375 },
    ],
    additionalPaths: [
      { x: 100, y: 400 },
      { x: 100, y: 1000 },
      { x: 700, y: 400 },
      { x: 200, y: 1500 },
    ],
  },
  {
    x: 900,
    y: 1000,
    possiblePaths: [
      { x: 700, y: 1000 },
      { x: 900, y: 800 },
      { x: 900, y: 1200 },
    ],
    eatingPaths: [
      { x: 500, y: 1000 },
      { x: 900, y: 600 },
    ],
    additionalPaths: [
      { x: 100, y: 1000 },
      { x: 300, y: 1000 },
      { x: 900, y: 400 },
    ],
  },
  {
    x: 100,
    y: 1200,
    possiblePaths: [
      { x: 100, y: 1000 },
      { x: 300, y: 1000 },
      { x: 300, y: 1200 },
    ],
    eatingPaths: [
      { x: 100, y: 800 },
      { x: 500, y: 800 },
      { x: 500, y: 1200 },
    ],
    additionalPaths: [
      { x: 100, y: 400 },
      { x: 100, y: 600 },
      { x: 700, y: 600 },
      { x: 900, y: 400 },
      { x: 700, y: 1200 },
      { x: 900, y: 1200 },
    ],
  },
  {
    x: 300,
    y: 1200,
    possiblePaths: [
      { x: 100, y: 1200 },
      { x: 300, y: 1000 },
      { x: 500, y: 1200 },
    ],
    eatingPaths: [
      { x: 300, y: 800 },
      { x: 700, y: 1200 },
    ],
    additionalPaths: [
      { x: 300, y: 400 },
      { x: 300, y: 600 },
      { x: 900, y: 1200 },
    ],
  },
  {
    x: 500,
    y: 1200,
    possiblePaths: [
      { x: 300, y: 1200 },
      { x: 300, y: 1000 },
      { x: 500, y: 1000 },
      { x: 700, y: 1000 },
      { x: 700, y: 1200 },
      { x: 675, y: 1375 },
      { x: 500, y: 1375 },
      { x: 325, y: 1375 },
    ],
    eatingPaths: [
      { x: 100, y: 1200 },
      { x: 100, y: 800 },
      { x: 500, y: 800 },
      { x: 900, y: 800 },
      { x: 900, y: 1200 },
      { x: 800, y: 1500 },
      { x: 500, y: 1500 },
      { x: 200, y: 1500 },
    ],
    additionalPaths: [
      { x: 500, y: 100 },
      { x: 500, y: 225 },
      { x: 500, y: 400 },
      { x: 500, y: 600 },
    ],
  },
  {
    x: 700,
    y: 1200,
    possiblePaths: [
      { x: 500, y: 1200 },
      { x: 700, y: 1000 },
      { x: 900, y: 1200 },
    ],
    eatingPaths: [
      { x: 300, y: 1200 },
      { x: 700, y: 800 },
    ],
    additionalPaths: [
      { x: 100, y: 1200 },
      { x: 700, y: 400 },
      { x: 700, y: 600 },
    ],
  },
  {
    x: 900,
    y: 1200,
    possiblePaths: [
      { x: 700, y: 1200 },
      { x: 700, y: 1000 },
      { x: 900, y: 1000 },
    ],
    eatingPaths: [
      { x: 500, y: 1200 },
      { x: 500, y: 800 },
      { x: 900, y: 800 },
    ],
    additionalPaths: [
      { x: 100, y: 1200 },
      { x: 300, y: 1200 },
      { x: 100, y: 400 },
      { x: 300, y: 600 },
      { x: 900, y: 400 },
      { x: 900, y: 600 },
    ],
  },
  {
    x: 325,
    y: 1375,
    possiblePaths: [
      { x: 500, y: 1200 },
      { x: 500, y: 1375 },
      { x: 200, y: 1500 },
    ],
    eatingPaths: [
      { x: 700, y: 1000 },
      { x: 675, y: 1375 },
    ],
    additionalPaths: [{ x: 900, y: 800 }],
  },
  {
    x: 500,
    y: 1375,
    possiblePaths: [
      { x: 325, y: 1375 },
      { x: 500, y: 1200 },
      { x: 675, y: 1375 },
      { x: 500, y: 1500 },
    ],
    eatingPaths: [{ x: 500, y: 1000 }],
    additionalPaths: [
      { x: 500, y: 100 },
      { x: 500, y: 225 },
      { x: 500, y: 400 },
      { x: 500, y: 600 },
      { x: 500, y: 800 },
    ],
  },
  {
    x: 675,
    y: 1375,
    possiblePaths: [
      { x: 500, y: 1375 },
      { x: 500, y: 1200 },
      { x: 800, y: 1500 },
    ],
    eatingPaths: [
      { x: 325, y: 1375 },
      { x: 300, y: 1000 },
    ],
    additionalPaths: [{ x: 100, y: 800 }],
  },
  {
    x: 200,
    y: 1500,
    possiblePaths: [
      { x: 325, y: 1375 },
      { x: 500, y: 1500 },
    ],
    eatingPaths: [
      { x: 500, y: 1200 },
      { x: 800, y: 1500 },
    ],
    additionalPaths: [
      { x: 700, y: 1000 },
      { x: 900, y: 800 },
    ],
  },
  {
    x: 500,
    y: 1500,
    possiblePaths: [
      { x: 200, y: 1500 },
      { x: 500, y: 1375 },
      { x: 800, y: 1500 },
    ],
    eatingPaths: [{ x: 500, y: 1200 }],
    additionalPaths: [
      { x: 500, y: 100 },
      { x: 500, y: 225 },
      { x: 500, y: 400 },
      { x: 500, y: 600 },
      { x: 500, y: 800 },
      { x: 500, y: 1000 },
    ],
  },
  {
    x: 800,
    y: 1500,
    possiblePaths: [
      { x: 500, y: 1500 },
      { x: 675, y: 1375 },
    ],
    eatingPaths: [
      { x: 200, y: 1500 },
      { x: 500, y: 1200 },
    ],
    additionalPaths: [
      { x: 100, y: 800 },
      { x: 300, y: 1000 },
    ],
  },
];
