import React from 'react';
import classnames from 'classnames/bind';
import styles from './banner.scss';
import Text from '../text';
import ResultsTable from '../results-table';
import { getResults, getFeedbackArray } from '../utilities/results.utilities';
import { rangeEasy, rangeMedium, rangeHard } from '../utilities/ranges.utilities';

const cx = classnames.bind(styles);

const Banner = (props) => {
  const { score, level } = props;
  let range = [];

  switch (level) {
    case 'easy': range = rangeEasy; break;
    case 'medium': range = rangeMedium; break;
    default: range = rangeHard; break;
  }

  const activeColor = getResults(score, range).color;
  const feedbackArray = getFeedbackArray(range);

  return (
    <div className={styles.banner}>
      <div className={cx('banner__item', {
        [`banner__item--${activeColor}`]: activeColor,
      })}
      >
        <Text text={`Your result is ${score}`} center size="medium" weight="bold" color="dark-blue" />
      </div>
      <Text text={getResults(score, range).feedback} center size="large" cases="uppercase" color="dark-blue" />
      <ResultsTable activeColor={activeColor} range={range} feedbackArray={feedbackArray} />
    </div>
  );
};

export default Banner;
