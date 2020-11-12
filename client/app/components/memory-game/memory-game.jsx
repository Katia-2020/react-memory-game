import React from 'react';
import { Row, Column } from '../grid';
import Cart from '../cart';
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
          <Column>
            <Cart />
          </Column>
        </Row>
      </div>
    );
  }
}

export default MemoryGame;
