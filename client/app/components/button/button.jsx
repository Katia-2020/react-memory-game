import React from 'react';
import Text from '../text';
import styles from './button.scss';

const Button = (props) => {
  const { text, onClick } = props;

  const handleClick = () => {
    onClick();
  };

  return (
    <div className={styles.button} onClick={handleClick}>
      <Text text={text} size="large" cases="uppercase" color="white" center-absolute />
    </div>
  );
};

export default Button;
