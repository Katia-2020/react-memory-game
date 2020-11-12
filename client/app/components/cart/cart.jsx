import React from 'react';
import styles from './cart.scss';

const Cart = (props) => {
  const { image, theme } = props;

  return (
    <div className={styles.cart} />
  );
};

export default Cart;
