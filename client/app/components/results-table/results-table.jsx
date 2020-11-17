import React from 'react';
import classnames from 'classnames/bind';
import styles from './results-table.scss';
import Text from '../text';
import { getResults } from '../utilities/results.utilities';
import { Column, Row } from '../grid';

const cx = classnames.bind(styles);

const arr = [
  {
    result: 5,
    text: 'amazing memory!',
    range: '10-17',
  },
  {
    result: 20,
    text: "no worries, that's still good enough",
    range: '18-29',
  },
  {
    result: 40,
    text: 'you really need to improve',
    range: '30-45',
  },
  {
    result: 70,
    text: 'memory?! what memory?',
    range: '46 +',
  },
];

const ResultsTable = () => (
  <div className={styles['results-table']}>
    {arr.map((item, index) => (
      <div
        key={index}
        className={cx('results-table__item', {
          [`results-table__item--${getResults(item.result).color}`]: getResults(item.result).color,
        })}
      >
        {' '}
        <Row>
          <Column grow>
            <Text text={item.text} cases="uppercase" color="dark-blue" />
          </Column>
          <Column shrink>
            <Text text={item.range} color="dark-blue" weight="bold"/>
          </Column>
        </Row>
      </div>
    ))}
  </div>

);

export default ResultsTable;
