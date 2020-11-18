import React from 'react';
import { Row, Column } from '../grid';
import Card from '../card';
import StartButton from '../start-button';
import BackButton from '../back-button';
import Result from '../result';
import Score from '../score';
import GameName from '../game-name';
import Banner from '../banner';
import Timer from '../timer';
import Levels from '../levels';
import images from './memory-game.mock';
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

    this.handleClick = this.handleClick.bind(this);
    this.handleStartButtonClick = this.handleStartButtonClick.bind(this);
    this.handleLevelsClick = this.handleLevelsClick.bind(this);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
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

  getCardContent(item) {
    const { currentCard, previousCard } = this.state;

    if ((currentCard.id === item.id ||
      previousCard.id === item.id) ||
      this.isFoundCard(item.name)) {
      return item.url;
    }

    return '';
  }

  startTimer() {
    this.interval = setInterval(() => {
      this.setState({
        count: this.state.count + 1,
      });
    }, 1000);
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

  handleClick(name, id) {
    const {
      currentCard,
      previousCard,
      foundImages,
      matched,
      score,
      blocked,
      gameStarted,
      level,
    } = this.state;

    const alreadyFound = this.isFoundCard(name);

    if (blocked ||
      (name === currentCard.name && id === currentCard.id) ||
      alreadyFound
    ) {
      return;
    }

    // start of the game: no cards were open, opening the first card
    if (!currentCard.name && !gameStarted && level) {
      this.setState({
        currentCard: {
          id,
          name,
        },
        gameStarted: true,
        matchingCard: '',
      });

      this.startTimer();
    }

    // no cards were open, opening the first card
    if (!currentCard.name && gameStarted) {
      this.setState({
        currentCard: {
          id,
          name,
        },
        matchingCard: '',
      });
    }

    // opening the second card, cards are not matching
    if (name !== currentCard.name && currentCard.name && !previousCard.name) {
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

    // two cards open, matching card found
    if (name === currentCard.name && id !== currentCard.id && !alreadyFound) {
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
    }
  }

  handleStartButtonClick() {
    const { level } = this.state;
    clearInterval(this.interval);

    this.setState({
      ...defaultState,
      allImages: this.shuffleArray(),
      level,
    });
  }

  handleLevelsClick(level) {
    this.setState({
      ...defaultState,
      allImages: this.shuffleArray(),
      level,
    });
  }

  handleBackButtonClick() {
    clearInterval(this.interval);

    this.setState({
      ...defaultState,
    });
  }

  isFoundCard(name) {
    const { foundImages } = this.state;
    return foundImages.includes(name);
  }

  shuffleArray() {
    return images.sort(() => Math.random() - 0.5);
  }

  createCards(item) {
    const { matchingCard } = this.state;
    return (
      <Column key={item.id}>
        <div className={styles['memory-game__item']}>
          <Card
            id={item.id}
            name={item.name}
            onClick={this.handleClick}
            content={this.getCardContent(item)}
            active={matchingCard === item.name}
          />
        </div>
      </Column>
    );
  }

  createGameControls(gameEnd, isNewGame, level, allImages) {
     if (gameEnd && allImages.length) {
      return (
        <div className={styles['memory-game__controls']}>
          <BackButton
            text="new game"
            onClick={this.handleBackButtonClick}
          />
        </div>
      );
    }

    if (!gameEnd && level) {
      return (
        <div className={styles['memory-game__controls']}>
          <StartButton
            text={isNewGame}
            onClick={this.handleStartButtonClick}
          />
          <BackButton
            text="go back"
            onClick={this.handleBackButtonClick}
          />
        </div>
      );
    }

    return (
      <GameName />
    );
  }

  createGameBody(gameStarted, gameEnd, level) {
    const { allImages, score, count } = this.state;

    if (!gameStarted && !level) {
      return (
        <Levels onClick={this.handleLevelsClick} levels={levels} />
      );
    }

    if (gameEnd && allImages.length) {
      clearInterval(this.interval);
      return (
        <Banner score={score} count={count} />
      );
    }

    return (
      <Row>
        {allImages.map(item => this.createCards(item))}
      </Row>
    );
  }

  createGameResults(matched, maxMatched, matchingCard, score, count, level) {
    if (level) {
      return (
        <div className={styles['memory-game__results']}>
          <Result result={`${matched}/${maxMatched}`} active={matchingCard} />
          <Score score={score} />
          <Timer count={count} />
        </div>
      );
    }

    return '';
  }

  render() {
    console.log(this.state);

    const {
      allImages,
      foundImages,
      matched,
      score,
      gameStarted,
      matchingCard,
      count,
      level,
    } = this.state;

    const maxMatched = allImages.length / 2;
    const gameEnd = (maxMatched === foundImages.length);
    const isNewGame = !gameEnd ? 'start again' : 'start';

    return (
      <div className={styles['memory-game']}>
        <Row>
          <Column>
            {this.createGameControls(gameEnd, isNewGame, level, allImages)}
          </Column>
          <Column>
            <div className={styles['memory-game__body']}>
              {this.createGameBody(gameStarted, gameEnd, level)}
            </div>
          </Column>
          <Column>
            {this.createGameResults(matched, maxMatched, matchingCard, score, count, level)}
          </Column>
        </Row>
      </div>
    );
  }
}

export default MemoryGame;

// in createGameResults Im passing arguments but they can also be accessed from state. What's the best option?
// how to pass many args: as an object?
