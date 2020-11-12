import React from 'react';
import styles from './card.scss';

const Card = (props) => {
  const {
    id,
    name,
    onClick,
    children,
  } = props;

  const handleClick = () => {
    onClick(name, id);
  };

  return (
    <div className={styles['card']} onClick={handleClick}>
      {children}
    </div>
  );
};

export default Card;
