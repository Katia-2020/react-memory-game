import React from 'react';
import classnames from 'classnames/bind';
import styles from './card.scss';
import Image from '../image';
import Icon from '../icon';

const cx = classnames.bind(styles);

const Card = (props) => {
  const {
    id,
    name,
    onClick,
    content,
    active,
  } = props;

  const handleClick = () => {
    onClick(name, id);
  };

  return (
    <div
      className={cx('card', {
        'card--active': active,
      })}
      onClick={handleClick}
    >
      {content ? (
        <Image url={content} />
      ) : (
        <Icon />
      )}
    </div>
  );
};

export default Card;
