import React from 'react';
import { Row, Column } from '../grid';
import Card from '../card';
import Image from '../image';
import Icon from '../icon';
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
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.shuffleCards();
  }

  handleClick(name, id) {
    const {
      currentCard,
      previousCard,
      foundImages,
    } = this.state;

    const oneCardOpen = currentCard.name && !previousCard.name;
    const twoCardsOpen = currentCard.name && previousCard.name;
    const cardsMatch = currentCard.name === previousCard.name;
    const sameCard = currentCard.id === previousCard.id;

    let newState;

    if (!currentCard.name) {
      newState = {
        currentCard: {
          id,
          name,
        },
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
      };
    }

    if (twoCardsOpen && cardsMatch && !sameCard) {
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
      };
    }

    this.setState(newState);
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

    const { currentCard, previousCard, allImages } = this.state;

    return (
      <div className={styles['memory-game']}>
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
    );
  }
}

export default MemoryGame;
