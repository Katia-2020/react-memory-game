import React from 'react';
import styles from './game-name.scss';
import Text from '../text';

const GameName = () => (
  <div className={styles['game-name']}>
    <div className={styles['game-name__container']}>
      <Text text="memory game" color="dark-blue" size="large" cases="uppercase" weight="bold" />
    </div>
  </div>
);

export default GameName;
