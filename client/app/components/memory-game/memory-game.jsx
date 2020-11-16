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
    this.timer = null;
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

    const alreadyFound = this.isFoundCard(name);

    // no cards were open
    if (!currentCard.name) {
      this.setState({
        currentCard: {
          id,
          name,
        },
      });
    }

    // two cards open, matching card found
    if (name === currentCard.name && id !== currentCard.id && !alreadyFound) {
      this.setState({
        currentCard: {
          id,
          name,
        },
        previousCard: {
          id: '',
          name: '',
        },
        foundImages: [...foundImages, name],
        score: score + 1,
        // attempts: attempts + 1,
      });
    }

    // opening the second card
    if (name !== currentCard.name && currentCard.name && !previousCard.name) {
      this.setState({
        currentCard: {
          id,
          name,
        },
        previousCard: {
          id: currentCard.id,
          name: currentCard.name,
        },
        attempts: attempts + 1,
      });
    }

    // two cards open, not matching
    if (name !== currentCard.name && currentCard.name && previousCard.name) {
      this.setState({
        currentCard: {
          id,
          name,
        },
        previousCard: {
          id: '',
          name: '',
        },
      });
    }

    // this.timer = setTimeout(() => {
    //   this.resetCards()
    // }, 700)

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

  // resetCards() {
  //   this.setState({
  //     currentCard: {
  //       id: '',
  //       name: '',
  //     },
  //     previousCard: {
  //       id: '',
  //       name: '',
  //     },
  //   });
  //   clearInterval(this.timer);
  // }

  render() {
    console.log(this.state);

    const {
      currentCard,
      previousCard,
      allImages,
      foundImages,
      score,
      attempts,
    } = this.state;

    const newGame = !currentCard.id && !previousCard.id && !foundImages.length;
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
