import React from 'react';
import classnames from 'classnames/bind';
import styles from './banner.scss';
import Text from '../text';
import { getResults } from '../utilities/results.utilities';

const cx = classnames.bind(styles);

const Banner = (props) => {
  const { score } = props;

  return (
    <div className={styles.banner}>
      <Text text={getResults(score).feedback} center size="large" cases="uppercase" color="dark-blue" />
      <div className={cx('banner__item', {
        [`banner__item--${getResults(score).color}`]: getResults(score).color,
      })}
      >
        <Text text={`Your result is ${score}`} center size="medium" color="dark-blue" />
      </div>
    </div>
  );
};

export default Banner;
