import React from 'react';
import classnames from 'classnames/bind';
import Text from '../../text';
import styles from './back-button.scss';

const cx = classnames.bind(styles);

const BackButton = ({ text, onClick, size }) => (
  <div
    className={cx(['back-button'], {
      [`back-button--size-${size}`]: size,
    })}
    onClick={onClick}
  >
    <Text text={text} weight="bold" size={size} cases="uppercase" color="dark-blue" absolute />
  </div>
);

export default BackButton;
