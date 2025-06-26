import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../../store/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const totalPrice = cartItems.reduce((total, item) => {
    return total + (item.discont_price || item.price) * item.quantity;
  }, 0);

  return (
    <div>
      <h1>Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id}>
              <img src={item.image} alt={item.title} style={{ width: '100px' }} />
              <p>{item.title}</p>
              <p>Price: ${item.discont_price || item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <button onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
            </div>
          ))}
          <h2>Total: ${totalPrice.toFixed(2)}</h2>
          <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
        </div>
      )}
    </div>
  );
};

export default Cart;