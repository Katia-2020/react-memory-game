import React from 'react';
import { Row, Column } from '../grid';
import Card from '../card';
import images from './memory-game.mock';
import styles from './memory-game.scss';

class MemoryGame extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <div className={styles['memory-game']}>
        <Row>
          {images.map((item) => (
            <>
              <Column>
                <div className={styles['memory-game__item']}>
                  <Card image={item.image} />
                </div>
              </Column>
              <Column>
                <div className={styles['memory-game__item']}>
                  <Card image={item.image} />
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
