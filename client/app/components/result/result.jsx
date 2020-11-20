import React from 'react';
import classnames from 'classnames/bind';
import Text from '../text';
import styles from './result.scss';

const cx = classnames.bind(styles);

const Result = ({ result, active }) => (
  <div className={cx('result', {
    'result--active': active,
  })}
  >
    <div className={styles['result__header']}>
      <Text text="matched:" cases="uppercase" color="dark-blue" weight="bold" />
    </div>
    <div className={styles['result__body']}>
      <Text text={result} size="large" color="pink" weight="bold" />
    </div>
  </div>
);

export default Result;
