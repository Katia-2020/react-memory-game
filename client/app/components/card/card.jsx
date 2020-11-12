import React from 'react';
import backCard from './svg';
import styles from './card.scss';

const Card = (props) => {
  const {
    image,
    name,
    theme,
    id,
    onClick,
  } = props;

  const handleClick = () => {
    onClick(name, id);
  };

  const glyph = backCard;

  return (
    <div className={styles['card']} onClick={handleClick}>
      {image && id ?
        (<img src={image} alt="" />) :
        (<i className={styles['card__icon']} dangerouslySetInnerHTML={{ __html: glyph }} />)}
    </div>
  );
};

export default Card;
