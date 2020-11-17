import React from 'react';
import styles from './game-name.scss';
import Text from '../text';

const GameName = () => (
  <div className={styles['game-name']}>
    <Text text="memory game" color="dark-blue" size="large" cases="uppercase" absolute weight="bold" />
  </div>
);

export default GameName;
