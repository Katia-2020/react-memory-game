import React from 'react';
import styles from './card.scss';

const Card = (props) => {
  const { image, theme } = props;

  return (
    <div className={styles.card} />
  );
};

export default Card;
