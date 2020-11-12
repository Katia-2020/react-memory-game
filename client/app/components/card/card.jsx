import React from 'react';
import backCard from './svg';
import styles from './card.scss';

const Card = (props) => {
  const {
    image,
    name,
    theme,
    onClick,
  } = props;

  const handleClick = () => {
    onClick(name);
  };

  const glyph = backCard;

  return (
    <div className={styles['card']} onClick={handleClick}>
      {image ?
        (<img src={image} alt="" />) :
        (<i className={styles['card__icon']} dangerouslySetInnerHTML={{ __html: glyph }} />)}
    </div>
  );
};

export default Card;
