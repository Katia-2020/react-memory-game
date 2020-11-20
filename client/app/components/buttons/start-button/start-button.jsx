import React from 'react';
import Text from '../../text';
import styles from './start-button.scss';

const StartButton = ({ text, onClick }) => (
  <div className={styles['start-button']} onClick={onClick}>
    <div className={styles['start-button__container']}>
      <Text text={text} size="large" cases="uppercase" color="white" />
    </div>
  </div>
);

export default StartButton;
