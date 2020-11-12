import React from 'react';
import styles from './icon.scss';
import iconCard from './svg';

const Icon = () => (
  <div className={styles.icon}>
    <i dangerouslySetInnerHTML={{ __html: iconCard }} />
  </div>
);

export default Icon;
