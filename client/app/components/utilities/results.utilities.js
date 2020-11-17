export const getResults = (score) => {
  if (score < 15) {
    return {
      feedback: 'well done!',
      color: 'light-green',
    };
  }

  if (score >= 15 && score < 30) {
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


