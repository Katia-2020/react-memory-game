import React from 'react';
import { Row, Column } from '../grid';
import Card from '../card';
import Button from '../button';
import Result from '../result';
import Score from '../score';
import GameName from '../game-name';
import Banner from '../banner';
import Timer from '../timer';
import Levels from '../levels';
import images from './memory-game.mock';
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
};

class MemoryGame extends React.Component {
  constructor(props) {
    super(props);

    this.state = defaultState;

    this.handleClick = this.handleClick.bind(this);
    this.handlePlayButtonClick = this.handlePlayButtonClick.bind(this);
    this.startTimer = this.startTimer.bind(this);
  }

  componentDidMount() {
    this.shuffleCards();
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
    } = this.state;

    const alreadyFound = this.isFoundCard(name);

    if (blocked ||
      (name === currentCard.name && id === currentCard.id) ||
      alreadyFound
    ) {
      return;
    }

    // start of the game: no cards were open, opening the first card
    if (!currentCard.name && !gameStarted) {
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

  handlePlayButtonClick() {
    clearInterval(this.interval);
    this.shuffleCards();
  }

  isFoundCard(name) {
    const { foundImages } = this.state;
    return foundImages.includes(name);
  }

  shuffleCards() {
    this.setState({
      ...defaultState,
      allImages: images.sort(() => Math.random() - 0.5),
    });
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

  createGame(gameStarted, gameEnd) {
    const { allImages, score, count } = this.state;

    if (!gameStarted && !gameEnd) {
      return (
        <Levels />
      );
    }

    if (gameEnd) {
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
    } = this.state;

    const maxMatched = allImages.length / 2;
    const gameEnd = (maxMatched === foundImages.length);
    const isNewGame = !gameEnd ? 'start again' : 'start';

    return (
      <div className={styles['memory-game']}>
        <Row>
          <Column>
            {!gameStarted && !gameEnd ?
              <GameName /> :
              <Button text={isNewGame} onClick={this.handlePlayButtonClick} />}
          </Column>
          <Column>
            <div className={styles['memory-game__body']}>
              {this.createGame(gameStarted, gameEnd)}
            </div>
          </Column>
          <Column>
            <Result result={`${matched}/${maxMatched}`} active={matchingCard} />
            <Score score={score} />
            <Timer count={count} />
          </Column>
        </Row>
      </div>
    );
  }
}

export default MemoryGame;
