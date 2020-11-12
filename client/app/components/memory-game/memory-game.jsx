import React from 'react';
import { Row, Column } from '../grid';
import Card from '../card';
import images from './memory-game.mock';
import styles from './memory-game.scss';

class MemoryGame extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentCard: '',
      previousCard: '',
      isClicked: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(name) {
    const { isClicked, currentCard, previousCard } = this.state;
    let newState;

    if (currentCard === '') {
      newState = {
        currentCard: name,
        isClicked: true,
      };
    }

    if (currentCard !== '') {
      newState = {
        currentCard: name,
        previousCard: currentCard,
        isClicked: true,
      };
    }

    this.setState(newState);
  }

  isSameCard() {
    const { currentCard, previousCard, isClicked } = this.state;

    return !!((currentCard === previousCard) && isClicked);
  }

  render() {
    console.log(this.state);

    const { isClicked } = this.state;
    const sameCard = this.isSameCard();

    return (
      <div className={styles['memory-game']}>
        <Row>
          {images.map((item) => (
            <>
              <Column>
                <div className={styles['memory-game__item']}>
                  <Card image={sameCard && item.url} name={item.name} onClick={this.handleClick} />
                </div>
              </Column>
              <Column>
                <div className={styles['memory-game__item']}>
                  <Card image={sameCard && item.url} name={item.name} onClick={this.handleClick} />
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
