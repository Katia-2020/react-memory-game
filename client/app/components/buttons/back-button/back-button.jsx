import React from 'react';
import classnames from 'classnames/bind';
import Text from '../../text';
import styles from './back-button.scss';

const cx = classnames.bind(styles);

const BackButton = (props) => {
  const { text, onClick, size } = props;

  const handleClick = () => {
    onClick();
  };

  return (
    <div
      className={cx(['back-button'], {
        [`back-button--size-${size}`]: size,
      })}
      onClick={handleClick}
    >
      <Text text={text} weight="bold" size={size} cases="uppercase" color="dark-blue" absolute />
    </div>
  );
};

export default BackButton;
