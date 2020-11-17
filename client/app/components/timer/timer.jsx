import React from 'react';
import styles from './timer.scss';
import Text from '../text';

const Timer = (props) => {
  const { count } = props;
  return (
    <div className={styles.timer}>
      <div className={styles['timer__header']}>
        <Text text="timer:" cases="uppercase" color="dark-blue" weight="bold" />
      </div>
      <div className={styles['timer__body']}>
        <Text text={count} size="large" color="dark-blue" weight="bold" />
      </div>
    </div>
  );
};

export default Timer;
