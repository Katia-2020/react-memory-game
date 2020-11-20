export const getResults = (score, range) => {
  if (score <= range[0].max) {
    return {
      id: 0,
      feedback: 'well done!',
      color: 'light-green',
    };
  }

  if (score >= range[1].min && score <= range[1].max) {
    return {
      id: 1,
      feedback: 'good!',
      color: 'light-yellow',
    };
  }

  if (score >= range[2].min && score <= range[2].max) {
    return {
      id: 2,
      feedback: 'not too bad!',
      color: 'light-pink',
    };
  }

  return {
    id: 3,
    feedback: 'another try?',
    color: 'light-purple',
  };
};

export const getFeedbackArray = (range) => [
  {
    id: 0,
    result: range[0].max,
    text: 'amazing memory!',
    range: `${range[0].min} - ${range[0].max}`,
  },
  {
    id: 1,
    result: range[1].max,
    text: "no worries, that's still good enough",
    range: `${range[1].min} - ${range[1].max}`,
  },
  {
    id: 2,
    result: range[2].max,
    text: 'you really need to improve',
    range: `${range[2].min} - ${range[2].max}`,
  },
  {
    id: 3,
    result: range[3].max,
    text: 'memory?! what memory?',
    range: `${range[3].min} +`,
  },
];
