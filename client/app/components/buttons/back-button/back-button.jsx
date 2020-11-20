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
    <div className={styles['back-button__container']}>
      <Text text={text} weight="bold" size={size} cases="uppercase" color="dark-blue" />
    </div>
  </div>
);

export default BackButton;
