import React from 'react';
import classnames from 'classnames/bind';
import styles from './banner.scss';
import Text from '../text';

const cx = classnames.bind(styles);

const Banner = (props) => {
  const { attempts } = props;

  const getResults = () => {
  //   switch (attempts) {
  //     case (attempts < 15): return 'well done!';
  //     case (attempts >= 15 && attempts < 30): return 'good!';
  //     case (attempts >= 30 && attempts <= 45): return 'not too bad!';
  //     default: return 'another try?';
  //   }
  // }
    if (attempts < 15) {
      return {
        feedback: 'well done!',
        color: 'light-green',
      };
    }

    if (attempts >= 15 && attempts < 30) {
      return {
        feedback: 'good!',
        color: 'light-yellow',
      };
    }

    if (attempts >= 30 && attempts <= 45) {
      return {
        feedback: 'not too bad!',
        color: 'light-pink',
      };
    }

    return {
      feedback: 'another try?',
      color: 'light-purple',
    };
  };

  return (
    <div className={styles.banner}>
      <Text text={getResults().feedback} center size="large" cases="uppercase" color="dark-blue" />
      <div className={cx('banner__item', {
        [`banner__item--${getResults().color}`]: getResults().color,
      })}
      >
        <Text text={`Your result is ${attempts}`} center size="medium" color="dark-blue" />
      </div>
    </div>
  );
};

export default Banner;
