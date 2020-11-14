import React from 'react';
import classnames from 'classnames/bind';
import styles from './text.scss';

const cx = classnames.bind(styles);

const Text = (props) => {
  const {
    text,
    size,
    color,
    center,
    cases,
    weight,
  } = props;

  return (
    <div className={cx('text', {
      [`text--size-${size}`]: size,
      [`text--color-${color}`]: color,
      [`text--cases-${cases}`]: cases,
      [`text--weight-${weight}`]: weight,
      'text--center': center,
    })}
    >
      <span>{text}</span>
    </div>
  );
};

export default Text;
