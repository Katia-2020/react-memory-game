import React from 'react';
import styles from './levels.scss';
import LevelButton from '../buttons/level-button';

const Levels = ({ levels, onClick }) => (
  <div className={styles.levels}>
    {levels.map((item) => (
      <LevelButton
        key={item.id}
        onClick={onClick}
        level={item.level}
      />
    ))}
  </div>
);

export default Levels;
