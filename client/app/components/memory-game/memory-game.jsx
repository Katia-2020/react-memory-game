import React from 'react';
import { Row, Column } from '../grid';
import Card from '../card';
import Button from '../button';
import Result from '../result';
import Attempts from '../attempts';
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
  score: 0,
  attempts: 0,
  blocked: false,
  matchingCard: '',
};

class MemoryGame extends React.Component {
  constructor(props) {
    super(props);

    this.state = defaultState;

    this.handleClick = this.handleClick.bind(this);
    this.handlePlayButtonClick = this.handlePlayButtonClick.bind(this);
  }

  componentDidMount() {
    this.shuffleCards();
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
      score,
      attempts,
      blocked,
    } = this.state;

    const alreadyFound = this.isFoundCard(name);

    if (blocked ||
      (name === currentCard.name && id === currentCard.id) ||
      alreadyFound
    ) {
      return;
    }

    // no cards were open, opening the first card
    if (!currentCard.name) {
      this.setState({
        currentCard: {
          id,
          name,
        },
        gameStarted: true,
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
        attempts: attempts + 1,
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
        score: score + 1,
        attempts: attempts + 1,
        matchingCard: name,
      });
    }
  }

  handlePlayButtonClick() {
    this.setState({
      ...defaultState,
      allImages: images.sort(() => Math.random() - 0.5),
    });
  }

  isFoundCard(name) {
    const { foundImages } = this.state;
    return foundImages.includes(name);
  }

  shuffleCards() {
    this.setState({
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

  render() {
    console.log(this.state);

    const {
      allImages,
      score,
      attempts,
      gameStarted,
      matchingCard,
    } = this.state;

    const maxScore = allImages.length / 2;
    const isNewGame = gameStarted ? 'play again' : 'start';

    return (
      <div className={styles['memory-game']}>
        <Row>
          <Column>
            <Button text={isNewGame} onClick={this.handlePlayButtonClick} />
          </Column>
          <Column>
            <div className={styles['memory-game__body']}>
              <Row>
                {allImages.map(item => this.createCards(item))}
              </Row>
            </div>
          </Column>
          <Column>
            <Result result={`${score}/${maxScore}`} active={matchingCard} />
            <Attempts attempts={attempts} />
          </Column>
        </Row>
      </div>
    );
  }
}

export default MemoryGame;
