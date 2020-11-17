import React from 'react';
import classnames from 'classnames/bind';
import styles from './banner.scss';
import Text from '../text';
import ResultsTable from '../results-table';
import { getResults } from '../utilities/results.utilities';

const cx = classnames.bind(styles);

const Banner = (props) => {
  const { score } = props;
  const activeColor = getResults(score).color;

  return (
    <div className={styles.banner}>
      <Text text={getResults(score).feedback} center size="large" cases="uppercase" color="dark-blue" />
      <div className={cx('banner__item', {
        [`banner__item--${activeColor}`]: activeColor,
      })}
      >
        <Text text={`Your result is ${score}`} center size="medium" weight="bold" color="dark-blue" />
      </div>
      <ResultsTable activeColor={activeColor} />
    </div>
  );
};

export default Banner;
