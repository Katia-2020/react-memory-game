import React from 'react';
import classnames from 'classnames/bind';
import styles from './levels.scss';
import Text from '../text';

const cx = classnames.bind(styles);

const Levels = (props) => {
  const { levels, onClick } = props;

  const handleClick = () => {
    onClick();
  };

  return (
    <div className={styles.levels}>
      {levels.map(level => (
        <div key={level.id} className={styles['levels__item']}>
          <div
            className={cx('levels__button', {
              [`levels__button--${level.name}`]: level.name,
            })}
            onClick={handleClick}
          >
            <Text text={level.name} center size="medium" cases="uppercase" weight="bold" color="dark-blue" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Levels;
