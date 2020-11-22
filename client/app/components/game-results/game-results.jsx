import React from 'react';
import styles from './game-results.scss';
import Result from '../result';
import Score from '../score';
import Timer from '../timer';

const GameResults = (props) => {
  const { maxMatched, matched, matchingCard, score, count, level } = props;

  if (level) {
    return (
      <div className={styles.results}>
        <Result result={`${matched}/${maxMatched}`} active={matchingCard} />
        <Score score={score} level={level} maxMatched={maxMatched} />
        <Timer count={count} />
      </div>
    );
  }

  return '';

  // return(
  //   <div></div>
  // );
};

export default GameResults;
