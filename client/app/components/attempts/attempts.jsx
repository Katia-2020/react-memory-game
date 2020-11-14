import React from 'react';
import Text from '../text';
import styles from './attempts.scss';

const Attempts = (props) => {
  const { attempts } = props;

  return (
    <div className={styles['attempts']}>
      <div className={styles['attempts__header']}>
        <Text text="attempts:" cases="uppercase" color="dark-blue" weight="bold" />
      </div>
      <div className={styles['attempts__body']}>
        <Text text={attempts} size="large" color="light-pink" weight="bold" />
      </div>
    </div>
  );
};

export default Attempts;
