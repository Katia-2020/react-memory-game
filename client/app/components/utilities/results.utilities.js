export const getResults = (score) => {
  if (score < 18) {
    return {
      feedback: 'well done!',
      color: 'light-green',
    };
  }

  if (score >= 18 && score < 30) {
    return {
      feedback: 'good!',
      color: 'light-yellow',
    };
  }

  if (score >= 30 && score <= 45) {
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
    result: 5,
    text: 'amazing memory!',
    range: '10-17',
  },
  {
    result: 20,
    text: "no worries, that's still good enough",
    range: '18-29',
  },
  {
    result: 40,
    text: 'you really need to improve',
    range: '30-45',
  },
  {
    result: 70,
    text: 'memory?! what memory?',
    range: '46 +',
  },
];
