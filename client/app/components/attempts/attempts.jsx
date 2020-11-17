import React from 'react';
import Text from '../text';
import styles from './attempts.scss';

const Attempts = (props) => {
  const { attempts } = props;

  const getColor = () => {
    if (attempts < 15) {
      return 'light-green';
    }

    if (attempts >= 15 && attempts < 30) {
      return 'light-yellow';
    }

    if (attempts >= 30 && attempts <= 45) {
      return 'light-pink';
    }

    return 'light-purple';
  }

  return (
    <div className={styles['attempts']}>
      <div className={styles['attempts__header']}>
        <Text text="your score:" cases="uppercase" color="dark-blue" weight="bold" />
      </div>
      <div className={styles['attempts__body']}>
        <Text text={attempts} size="large" color={getColor()} weight="bold" />
      </div>
    </div>
  );
};

export default Attempts;
