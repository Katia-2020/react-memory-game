import React from 'react';
import classnames from 'classnames/bind';
import styles from './banner.scss';
import Text from '../text';

const cx = classnames.bind(styles);

const Banner = (props) => {
  const { attempts } = props;

  const getResults = () => {
    let result = {};

    switch (attempts) {
      case (attempts < 15): result = {
        feedback: 'well done!',
        color: 'light-green',
      };

        break;

      case (attempts >= 15 && attempts < 30): result = {
        feedback: 'good!',
        color: 'light-yellow',
      };

        break;

      case (attempts >= 30 && attempts <= 45): result = {
        feedback: 'not too bad!',
        color: 'light-pink',
      };

        break;

      default: result = {
        feedback: 'another try?',
        color: 'light-purple',
      };

        break;
    }

    return result;
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
