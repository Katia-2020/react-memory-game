import React from 'react';
import styles from './game-controls.scss';
import StartButton from '../buttons/start-button';
import BackButton from '../buttons/back-button';
import GameName from '../game-name';

const GameControls = (props) => {
  const {
    gameEnd, isNewGame, level, allImages, onClick,
  } = props;
  let gameControls;

  if (gameEnd && allImages.length) {
    gameControls = (
      <div>
        <BackButton
          type="back"
          text="new game"
          size="large"
          onClick={onClick}
        />
      </div>
    );
  }

  if (!gameEnd && level) {
    gameControls = (
      <div>
        <StartButton
          type="start"
          text={isNewGame}
          onClick={onClick}
        />
        <BackButton
          type="back"
          text="go back"
          size="medium"
          onClick={onClick}
        />
      </div>
    );
  }

  if (!allImages.length) {
    gameControls = <GameName />;
  }

  return (
    <div className={styles.controls}>
      {gameControls}
    </div>
  );
};

export default GameControls;
