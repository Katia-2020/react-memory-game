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
      // currentCard: '',
      // currentId: 0,
      // previousId: 0,
      // previousCard: '',
      currentCard: {
        id: '',
        name: '',
      },
      previousCard: {
        id: '',
        name: '',
      },
      isClicked: false,
      foundImages: [],
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(name, id) {
    const {
      currentCard,
      previousCard,
      foundImages,
      isClicked,
    } = this.state;
    let newState;

    if (!currentCard.name) {
      newState = {
        currentCard: {
          id,
          name,
        },
        isClicked: !isClicked,
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
        isClicked: !isClicked,
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
        isClicked: !isClicked,
        foundImages: [...foundImages, currentCard.name],
      };
    }

    this.setState(newState);
  }

  isSameCard() {
    const { currentCard, previousCard } = this.state;

    return !!(currentCard.name === previousCard.name);
  }

  render() {
    console.log(this.state);

    const { currentCard, previousCard, isClicked } = this.state;
    const sameCard = this.isSameCard();

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
                    {(currentCard.id === item.id) ? (
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
                    {(currentCard.id === (item.id + images.length) && previousCard.name) ? (
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
