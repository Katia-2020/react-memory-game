import React from 'react';
import { Row, Column } from '../grid';
import Card from '../card';
import Image from '../image';
import Icon from '../icon';
import images from './memory-game.mock';
import styles from './memory-game.scss';

// const createArray = () => [...Array(images), ...Array(images)].flat();

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
    let newState;

    if (!currentCard.name) {
      newState = {
        currentCard: {
          id,
          name,
        },
      };
    }

    if (currentCard.name && !previousCard.name) {
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

    if (currentCard.name && previousCard.name && currentCard.name !== previousCard.name) {
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

    if (currentCard.name &&
        currentCard.name === previousCard.name &&
        currentCard.id !== previousCard.id) {
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

    if (currentCard.name &&
        currentCard.name === previousCard.name &&
        currentCard.id === previousCard.id) {
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
