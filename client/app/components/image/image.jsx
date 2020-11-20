import React from 'react';
import styles from './image.scss';

const Image = ({ url }) => (
  <div className={styles['image']}>
    <img src={url} alt="" />
  </div>
);

export default Image;
