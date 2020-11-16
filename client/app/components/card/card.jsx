import React from 'react';
import styles from './card.scss';
import Image from '../image';
import Icon from '../icon';

const Card = (props) => {
  const {
    id,
    name,
    onClick,
    content,
  } = props;

  const handleClick = () => {
    onClick(name, id);
  };

  return (
    <div className={styles['card']} onClick={handleClick}>
      {content ? (
        <Image url={content} />
      ) : (
        <Icon />
      )}
    </div>
  );
};

export default Card;
