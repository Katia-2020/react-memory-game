export const getScoresRange = (num) => [
  { min: num, max: num * 2 },
  { min: (num * 2 + 1), max: num * 3 },
  { min: (num * 3 + 1), max: num * 4 },
  { min: (num * 4 + 1), max: 400 },
];

