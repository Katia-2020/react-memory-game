import React from 'react';
import styles from './board.scss';
import { Row, Column } from '../grid';
import Card from '../card';
import { getCardContent } from '../utilities/board.utilities';

const Board = (props) => {
  const {
    allImages,
    matchingCard,
    level,
    onClick,
    currentCard,
    previousCard,
    foundImages,
  } = props;

  let size = '';

  switch (level) {
    case 'easy': size = 'big'; break;
    case 'medium': size = 'medium'; break;
    default: size = 'small'; break;
  }

  return (
    <div className={styles.board}>
      <Row>
        {allImages.map(item => (
          <Column key={item.id}>
            <div className={styles['board__item']}>
              <Card
                id={item.id}
                name={item.name}
                size={size}
                onClick={onClick}
                content={getCardContent(item, currentCard, previousCard, foundImages)}
                active={matchingCard === item.name}
              />
            </div>
          </Column>
        ))}
      </Row>
    </div>
  );
};

export default Board;
