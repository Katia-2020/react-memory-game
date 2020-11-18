import React from 'react';
import Text from '../text';
import styles from './score.scss';
import { getResults } from '../utilities/results.utilities';
import { rangeEasy, rangeMedium, rangeHard } from '../utilities/ranges.utilities';

const Score = (props) => {
  const { score, level } = props;
  let range;

  switch (level) {
    case 'easy': range = rangeEasy; break;
    case 'medium': range = rangeMedium; break;
    default: range = rangeHard; break;
  }

  return (
    <div className={styles['score']}>
      <div className={styles['score__header']}>
        <Text text="your score:" cases="uppercase" color="dark-blue" weight="bold" />
      </div>
      <div className={styles['score__body']}>
        <Text text={score} size="large" color={getResults(score, range).color} weight="bold" />
      </div>
    </div>
  );
};

export default Score;
