import React from 'react';
import styles from './image.scss';

const Image = (props) => {
  const { url } = props;

  return (
    <div className={styles['image']}>
      <img src={url} alt="" />
    </div>
  );
};

export default Image;
