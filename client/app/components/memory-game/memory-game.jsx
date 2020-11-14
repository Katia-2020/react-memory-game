import React from 'react';
import { Row, Column } from '../grid';
import Card from '../card';
import Image from '../image';
import Icon from '../icon';
import Button from '../button';
import Result from '../result';
import Attempts from '../attempts';
import images from './memory-game.mock';
import styles from './memory-game.scss';

class MemoryGame extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allImages: [],
      currentCard: {
        id: '',
        name: '',
      },
      previousCard: {
        id: '',
        name: '',
      },
      foundImages: [],
      score: 0,
      attempts: 0,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handlePlayButtonClick = this.handlePlayButtonClick.bind(this);
  }

  componentDidMount() {
    this.shuffleCards();
  }

  handleClick(name, id) {
    const {
      currentCard,
      previousCard,
      foundImages,
      score,
      attempts,
    } = this.state;

    const oneCardOpen = currentCard.name && !previousCard.name;
    const twoCardsOpen = currentCard.name && previousCard.name;
    const cardsMatch = currentCard.name === previousCard.name;
    const sameCard = currentCard.id === previousCard.id;
    const alreadyFound = this.isFoundCard(name);

    let newState;

    if (!currentCard.name) {
      newState = {
        currentCard: {
          id,
          name,
        },
        attempts: 0,
      };
    }

    if (oneCardOpen || (twoCardsOpen && cardsMatch && sameCard)) {
      newState = {
        currentCard: {
          id,
          name,
        },
        previousCard: {
          id: currentCard.id,
          name: currentCard.name,
        },
      };
    }

    if (twoCardsOpen && !cardsMatch) {
      newState = {
        currentCard: {
          id,
          name,
        },
        previousCard: {
          id: '',
          name: '',
        },
        attempts: attempts + 1,
      };
    }

    if (twoCardsOpen && cardsMatch && !sameCard && !alreadyFound) {
      newState = {
        currentCard: {
          id,
          name,
        },
        previousCard: {
          id: currentCard.id,
          name: currentCard.name,
        },
        foundImages: [...foundImages, currentCard.name],
        score: score + 1,
        attempts: attempts + 1,
      };
    }

    this.setState(newState);
  }

  handlePlayButtonClick() {
    this.setState({
      allImages: images.sort(() => Math.random() - 0.5),
      currentCard: {
        id: '',
        name: '',
      },
      previousCard: {
        id: '',
        name: '',
      },
      foundImages: [],
      score: 0,
      attempts: 0,
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

  render() {
    console.log(this.state);

    const {
      currentCard,
      previousCard,
      allImages,
      score,
      attempts,
    } = this.state;

    const newGame = !currentCard.id && !previousCard.id;
    const maxScore = allImages.length / 2;

    return (
      <div className={styles['memory-game']}>
        <Row>
          <Column>
            <Button text={newGame ? 'start' : 'play again'} onClick={this.handlePlayButtonClick} />
          </Column>
          <Column>
            <div className={styles['memory-game__body']}>
              <Row>
                {allImages.map((item) => (
                  <Column key={item.id}>
                    <div className={styles['memory-game__item']}>
                      <Card
                        id={item.id}
                        name={item.name}
                        onClick={this.handleClick}
                      >
                        {(currentCard.id === item.id ||
                            previousCard.id === item.id) ||
                            this.isFoundCard(item.name) ? (
                              <Image url={item.url} />
                          ) : (
                            <Icon />
                          )}
                      </Card>
                    </div>
                  </Column>
                ))}
              </Row>
            </div>
          </Column>
          <Column>
            <Result result={`${score}/${maxScore}`} />
            <Attempts attempts={attempts} />
          </Column>
        </Row>
      </div>
    );
  }
}

export default MemoryGame;
