const ranges = [
  { min: 10, max: 18 },
  { min: 17, max: 30 },
  { min: 30, max: 45 },
  { min: 46, max: 400 },
];

export const getResults = (score) => {
  if (score <= ranges[0].max) {
    return {
      feedback: 'well done!',
      color: 'light-green',
    };
  }

  if (score > ranges[1].min && score <= ranges[1].max) {
    return {
      feedback: 'good!',
      color: 'light-yellow',
    };
  }

  if (score > ranges[2].min && score <= ranges[2].max) {
    return {
      feedback: 'not too bad!',
      color: 'light-pink',
    };
  }

  return {
    feedback: 'another try?',
    color: 'light-purple',
  };
};

export const resultsArray = [
  {
    result: ranges[0].max,
    text: 'amazing memory!',
    range: `${ranges[0].min} - ${ranges[0].max}`,
  },
  {
    result: ranges[1].max,
    text: "no worries, that's still good enough",
    range: `${ranges[1].min} - ${ranges[1].max}`,
  },
  {
    result: ranges[2].max,
    text: 'you really need to improve',
    range: `${ranges[2].min} - ${ranges[2].max}`,
  },
  {
    result: ranges[3].max,
    text: 'memory?! what memory?',
    range: `${ranges[3].min} +`,
  },
];
