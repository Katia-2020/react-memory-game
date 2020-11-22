import React from 'react';
import { Row, Column } from '../grid';
import GameControls from '../game-controls';
import Board from '../board';
import GameResults from '../game-results';
import Banner from '../banner';
import Levels from '../levels';
import { getDeckBasedOnLevel } from './memory-game.mock';
import { isFoundCard } from '../utilities/board.utilities';
import { levels } from '../utilities/levels.utilities';
import styles from './memory-game.scss';

const defaultState = {
  allImages: [],
  currentCard: {
    id: '',
    name: '',
  },
  previousCard: {
    id: '',
    name: '',
  },
  gameStarted: false,
  gameEnd: false,
  foundImages: [],
  matched: 0,
  score: 0,
  blocked: false,
  matchingCard: '',
  count: 0,
  level: '',
};

class MemoryGame extends React.Component {
  constructor(props) {
    super(props);

    this.state = defaultState;

    this.handleCardClick = this.handleCardClick.bind(this);
    this.handleLevelsClick = this.handleLevelsClick.bind(this);
    this.handleControlsClick = this.handleControlsClick.bind(this);
    this.startTimer = this.startTimer.bind(this);
  }

  componentDidMount() {
    this.setState({
      ...defaultState,
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  startTimer() {
    this.interval = setInterval(() => {
      this.setState({
        count: this.state.count + 1,
      });
    }, 1000);
  }

  startGame(id, name) {
    this.setState({
      currentCard: {
        id,
        name,
      },
      gameStarted: true,
      matchingCard: '',
    });
  }

  openCardOne(id, name) {
    this.setState({
      currentCard: {
        id,
        name,
      },
      matchingCard: '',
    });
  }

  openCardTwoNotMatched(id, name) {
    const { currentCard, score } = this.state;

    const updatedCurrentCard = {
      id,
      name,
    };

    const updatedPrevCard = {
      id: currentCard.id,
      name: currentCard.name,
    };

    this.setState({
      currentCard: updatedCurrentCard,
      previousCard: updatedPrevCard,
      score: score + 1,
      matchingCard: '',
      blocked: true,
    });

    this.handleAutomaticCardFlip(updatedCurrentCard, updatedPrevCard);
  }

  openCardTwoMatchedFound(name) {
    const {
      foundImages,
      matched,
      score,
      allImages,
    } = this.state;
    const maxMatched = allImages.length / 2;
    const foundArrLength = foundImages.length + 1;

    this.setState({
      currentCard: {
        id: '',
        name: '',
      },
      previousCard: {
        id: '',
        name: '',
      },
      foundImages: [...foundImages, name],
      matched: matched + 1,
      score: score + 1,
      matchingCard: name,
    });

    if (maxMatched === foundArrLength) {
      clearInterval(this.interval);

      this.setState({
        currentCard: {
          id: '',
          name: '',
        },
        previousCard: {
          id: '',
          name: '',
        },
        foundImages: [...foundImages, name],
        matched: matched + 1,
        score: score + 1,
        matchingCard: name,
        gameEnd: true,
      });
    }
  }

  handleAutomaticCardFlip(updatedCurrentCard, updatedPrevCard) {
    const isCurrentCardSet = (updatedCurrentCard && updatedCurrentCard.name);
    const isPrevCardSet = (updatedPrevCard && updatedPrevCard.name);
    const notMatching = (
      isCurrentCardSet &&
      isPrevCardSet &&
      updatedCurrentCard.name !== updatedPrevCard.name);

    if (notMatching) {
      setTimeout(() => {
        this.setState({
          currentCard: {
            id: '',
            name: '',
          },
          previousCard: {
            id: '',
            name: '',
          },
          blocked: false,
          matchingCard: '',
        });
      }, 500);
    }
  }

  handleCardClick(name, id) {
    const {
      currentCard,
      previousCard,
      blocked,
      gameStarted,
      level,
      foundImages,
    } = this.state;

    const alreadyFound = isFoundCard(name, foundImages);

    if (blocked ||
      (name === currentCard.name && id === currentCard.id) ||
      alreadyFound
    ) {
      return;
    }

    // start of the game: no cards are open, opening the first card
    if (!currentCard.name && !gameStarted && level) {
      this.startGame(id, name);
      this.startTimer();
    }

    // some matching cards are found and open, opening the first card of the pair
    if (!currentCard.name && gameStarted) {
      this.openCardOne(id, name);
    }

    // opening the second card of the pair, cards are not matching
    if (name !== currentCard.name && currentCard.name && !previousCard.name) {
      this.openCardTwoNotMatched(id, name);
    }

    // two cards open, matching card found
    if (name === currentCard.name && id !== currentCard.id && !alreadyFound) {
      this.openCardTwoMatchedFound(name);
    }
  }

  handleControlsClick(type) {
    const { level } = this.state;
    let newState = {};
    clearInterval(this.interval);

    if (type === 'start') {
      newState = {
        ...defaultState,
        allImages: this.shuffleArray(level),
        level,
      };
    }

    if (type === 'back') {
      newState = {
        ...defaultState,
      };
    }

    this.setState(newState);
  }

  handleLevelsClick(level) {
    this.setState({
      ...defaultState,
      allImages: this.shuffleArray(level),
      level,
    });
  }

  shuffleArray(level) {
    const range = getDeckBasedOnLevel(level);
    return range.sort(() => Math.random() - 0.5);
  }

  createGameBody(gameStarted, gameEnd, maxMatched) {
    const {
      allImages, score, count, level, currentCard, previousCard, foundImages, matchingCard,
    } = this.state;

    if (!gameStarted && !level) {
      return (
        <Levels onClick={this.handleLevelsClick} levels={levels} />
      );
    }

    if (gameEnd && allImages.length) {
      return (
        <Banner score={score} count={count} level={level} maxMatched={maxMatched} />
      );
    }

    return (
      <Board
        allImages={allImages}
        matchingCard={matchingCard}
        level={level}
        onClick={this.handleCardClick}
        currentCard={currentCard}
        previousCard={previousCard}
        foundImages={foundImages}
      />
    );
  }

  render() {
    console.log(this.state);
    const {
      allImages,
      gameEnd,
      gameStarted,
      level,
      score,
      count,
      matchingCard,
      matched,
    } = this.state;

    const maxMatched = allImages.length / 2;
    const isNewGame = !gameEnd ? 'start again' : 'start';

    return (
      <div className={styles['memory-game']}>
        <Row>
          <Column>
            <GameControls
              gameEnd={gameEnd}
              isNewGame={isNewGame}
              level={level}
              allImages={allImages}
              onClick={this.handleControlsClick}
            />
          </Column>
          <Column>
            <div className={styles['memory-game__body']}>
              {this.createGameBody(gameStarted, gameEnd, maxMatched)}
            </div>
          </Column>
          <Column>
            <GameResults
              maxMatched={maxMatched}
              matched={matched}
              matchingCard={matchingCard}
              score={score}
              count={count}
              level={level}
            />
          </Column>
        </Row>
      </div>
    );
  }
}

export default MemoryGame;
