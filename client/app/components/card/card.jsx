import React from 'react';
import backCard from './svg';
import styles from './card.scss';

const Card = (props) => {
  const { image, theme, onClick } = props;

  const handleClick = () => {
    onClick();
  };

  const glyph = backCard;

  return (
    <div className={styles['card']} onClick={handleClick}>
      {theme ?
        (<i className={styles['card__icon']} dangerouslySetInnerHTML={{ __html: glyph }} />) :
        (<img src={image} alt="" />)}
    </div>
  );
};

export default Card;
