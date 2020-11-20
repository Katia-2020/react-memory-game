import React from 'react';
import styles from './levels.scss';
import LevelButton from '../buttons/level-button';

const Levels = ({ levels, onClick }) => (
  <div className={styles.levels}>
    {levels.map((level, index) => (
      <LevelButton
        key={index}
        onClick={onClick}
        level={level}
      />
    ))}
  </div>
);

export default Levels;
