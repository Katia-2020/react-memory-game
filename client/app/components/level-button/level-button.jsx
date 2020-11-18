import React from 'react';
import classnames from 'classnames/bind';
import Text from '../text';
import styles from './level-button.scss';

const cx = classnames.bind(styles);

const LevelButton = (props) => {
  const { level, onClick } = props;

  const handleClick = () => {
    onClick(level);
  };

  return (
    <div
      className={cx('level-button', {
        [`level-button--${level}`]: level,
      })}
      onClick={handleClick}
    >
      <Text text={level} center size="medium" cases="uppercase" weight="bold" color="dark-blue" />
    </div>
  );
};

export default LevelButton;
