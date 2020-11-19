import React from 'react';
import Text from '../../text';
import styles from './start-button.scss';

const StartButton = (props) => {
  const { text, onClick } = props;

  const handleClick = () => {
    onClick();
  };

  return (
    <div className={styles['start-button']} onClick={handleClick}>
      <Text text={text} size="large" cases="uppercase" color="white" absolute />
    </div>
  );
};

export default StartButton;
