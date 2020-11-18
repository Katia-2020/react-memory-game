import React from 'react';
import classnames from 'classnames/bind';
import styles from './results-table.scss';
import Text from '../text';
import { getResults } from '../utilities/results.utilities';
import { Column, Row } from '../grid';

const cx = classnames.bind(styles);

const ResultsTable = (props) => {
  const { activeColor, range, feedbackArray } = props;

  return (
    <div className={styles['results-table']}>
      {feedbackArray.map((item, index) => {
        const itemColor = getResults(item.result, range).color;
        const active = activeColor === itemColor;
        return (
          <div
            key={index}
            className={cx('results-table__item', {
              [`results-table__item--${itemColor}`]: itemColor,
              'results-table__item--active': active,
            })}
          >
            {' '}
            <Row>
              <Column grow>
                <Text text={item.text} cases="uppercase" color="dark-blue" />
              </Column>
              <Column shrink>
                <Text text={item.range} color="dark-blue" weight="bold" />
              </Column>
            </Row>
          </div>
        );
      })}
    </div>
  );
};

export default ResultsTable;
