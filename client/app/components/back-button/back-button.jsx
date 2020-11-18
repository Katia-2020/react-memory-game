import React from 'react';
import Text from '../text';
import styles from './back-button.scss';

const BackButton = (props) => {
  const { text, onClick } = props;

  const handleClick = () => {
    onClick();
  };

  return (
    <div className={styles['back-button']} onClick={handleClick}>
      <Text text={text} weight="bold" size="medium" cases="uppercase" color="dark-blue" absolute />
    </div>
  );
};

export default BackButton;
