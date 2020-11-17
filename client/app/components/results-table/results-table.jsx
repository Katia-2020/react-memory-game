import React from 'react';
import classnames from 'classnames/bind';
import styles from './results-table.scss';
import Text from '../text';
import { getResults, resultsArray } from '../utilities/results.utilities';
import { Column, Row } from '../grid';

const cx = classnames.bind(styles);

const ResultsTable = () => (
  <div className={styles['results-table']}>
    {resultsArray.map((item, index) => (
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
