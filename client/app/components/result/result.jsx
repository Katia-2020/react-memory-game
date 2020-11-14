import React from 'react';
import Text from '../text';
import styles from './result.scss';

const Result = (props) => {
  const { result } = props;

  return (
    <div className={styles['result']}>
      <div className={styles['result__header']}>
        <Text text="your score:" cases="uppercase" color="dark-blue" weight="bold" />
      </div>
      <div className={styles['result__body']}>
        <Text text={result} size="large" color="pink" weight="bold" />
      </div>
    </div>
  );
};

export default Result;
