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

    if (currentCard.name && currentCard.name !== previousCard.name) {
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

    if (currentCard.name && currentCard.name === previousCard.name) {
      newState = {
        currentCard: {
          id: '',
          name: '',
        },
        previousCard: {
          id: '',
          name: '',
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

  render() {
    console.log(this.state);

    const { currentCard, previousCard } = this.state;

    return (
      <div className={styles['memory-game']}>
        <Row>
          {images.map((item) => (
            <>
              <Column>
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
              <Column>
                <div className={styles['memory-game__item']}>
                  <Card
                    id={item.id + images.length}
                    name={item.name}
                    onClick={this.handleClick}
                  >
                    { (currentCard.id === (item.id + images.length) ||
                       previousCard.id === (item.id + images.length)) ||
                       this.isFoundCard(item.name) ? (
                      <Image url={item.url} />
                      ) : (
                        <Icon />
                      )}
                  </Card>
                </div>
              </Column>
            </>
          ))}
        </Row>
      </div>
    );
  }
}

export default MemoryGame;
