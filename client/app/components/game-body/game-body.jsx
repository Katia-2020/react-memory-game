import React from 'react';
import styles from './game-board.scss';
import Banner from '../banner';
import Levels from '../levels';
import { levels } from '../utilities/levels.utilities';

const GameBody = (props) => {
  const {
    gameStarted,
    gameEnd,
    allImages,
    score,
    count,
    level,
 } = props;

  const maxMatched = allImages.length / 2;

  // createGameBody(gameStarted, gameEnd, maxMatched) {
  //   const {
  //     allImages, score, count, level,
  //   } = this.state;

    if (!gameStarted && !level) {
      return (
        <Levels onClick={onClick} levels={levels} />
      );
    }

    if (gameEnd && allImages.length) {
      return (
        <Banner score={score} count={count} level={level} maxMatched={maxMatched} />
      );
    }

    return (
      <Row>
        {allImages.map(item => (
          <Column key={item.id}>
            {this.createCards(item)}
          </Column>
        ))}
      </Row>
    );
  }

  return(
    <div>

    </div>
  )
}

export default GameBody;
