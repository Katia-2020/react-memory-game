import React from 'react';
import { Row, Column } from '../grid';
import Card from '../card';
import
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
            <Card />
          </Column>
        </Row>
      </div>
    );w
  }
}

export default MemoryGame;
