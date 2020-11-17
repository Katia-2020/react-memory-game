import React from 'react';
import classnames from 'classnames/bind';
import styles from './levels.scss';
import { levels } from '../utilities/levels.utilities';
import Text from '../text';

const cx = classnames.bind(styles);

const Levels = () => {

  const handleClick = () => {
    onClick();
  };

  return (
  <div className={styles.levels}>
    {levels.map((level, index) => (
      <div key={index} className={styles['levels__item']}>
        <div
          className={cx('levels__button', {
            [`levels__button--${level}`]: level,
          })}
          onClick={handleClick}
        >
        <Text text={level} center size="medium" cases="uppercase" weight="bold" color="dark-blue" />
        </div>
      </div>
    ))}
  </div>
  );
};

export default Levels;
