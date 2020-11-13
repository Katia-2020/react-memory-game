import React from 'react';
import { Row, Column } from '../grid';
import Card from '../card';
import Image from '../image';
import Icon from '../icon';
import images from './memory-game.mock';
import styles from './memory-game.scss';

const createArray = () => [...Array(images), ...Array(images)].flat();

class MemoryGame extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allImages: createArray(),
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

  // componentDidMount() {
  //   this.shuffleCards();
  // }

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

    if (currentCard.name && currentCard.name === previousCard.name) {
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

  // shuffleCards() {
  //   const { allImages } = this.state;

  //   allImages.map((image) => image.id = Math.floor(Math.random() * 20));
  // }

  render() {
    console.log(this.state);

    const { currentCard, previousCard, allImages } = this.state;

    return (
      <div className={styles['memory-game']}>
        <Row>

          {allImages.map((item, index) => (
            <Column key={index} order={item.id}>
              <div className={styles['memory-game__item']}>
                <Card
                  id={index}
                  name={item.name}
                  onClick={this.handleClick}
                >
                  {(currentCard.id === index ||
                    previousCard.id === index) ||
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
