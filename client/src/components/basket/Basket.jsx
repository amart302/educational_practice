import React, { useState } from 'react'; // Добавляем useState для управления модальным окном
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart, updateQuantity } from '../../store/cartSlice';
import './basket.scss';

const Basket = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [isModalOpen, setIsModalOpen] = useState(false); // Состояние для управления модальным окном

  // Общая стоимость с учетом количества товаров
  const totalPrice = cartItems.reduce((total, item) => {
    return total + (item.discont_price || item.price) * item.quantity;
  }, 0);

  // Общее количество товаров в корзине
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Функция для увеличения количества товара
  const handleIncrement = (itemId) => {
    const item = cartItems.find((item) => item.id === itemId);
    if (item) {
      dispatch(updateQuantity({ id: itemId, quantity: item.quantity + 1 }));
    }
  };

  // Функция для уменьшения количества товара
  const handleDecrement = (itemId) => {
    const item = cartItems.find((item) => item.id === itemId);
    if (item && item.quantity > 1) {
      dispatch(updateQuantity({ id: itemId, quantity: item.quantity - 1 }));
    }
  };

  // Функция для открытия модального окна
  const handleOrder = () => {
    setIsModalOpen(true);
  };

  // Функция для закрытия модального окна
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="basketHeader">
        <h1>Shopping Cart</h1>
        <button onClick={() => dispatch(clearCart())} className="clearCartButton">
          Clear Cart
        </button>
        <a href="/store" className="backLink">Back to the store</a>
      </div>

      <div className="basketContainer">
        <div className="cartItems">
          {cartItems.length === 0 ? (
            <p className="empty">Тут ничаго нэт</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="cartItem">
                <img src={item.image} alt={item.title} className="itemImage" />
                <div className="itemInfo">
                  <div className="itemhead">
                    <h3>{item.title}</h3>
                    <button onClick={() => dispatch(removeFromCart(item.id))} className="itemRemove">
                      X
                    </button>
                  </div>
                  <div className="itemDetails">
                    <span className="itemName">
                      <button onClick={() => handleDecrement(item.id)}>-</button>
                      <div className="count">
                        <p>{item.quantity}</p>
                      </div>
                      <button onClick={() => handleIncrement(item.id)}>+</button>
                    </span>
                    <span className="itemPrice">${item.discont_price || item.price}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="orderDetails">
          <h2>Order Details</h2>
          <div className="priceInfo">
            <span className="originalPrice"></span>
            <span className="discountedPrice"></span>
          </div>
          <div className="itemCount">
            <p>{totalItems} items</p>
          </div>
          <div className="totalPrice">
            <p>Total</p>
            <h1>${totalPrice.toFixed(2)}</h1>
          </div>

          <div className="containerFeedback">
            <div className="feedback">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleOrder(); // Открываем модальное окно при отправке формы
                }}
              >
                <input type="text" placeholder="Name" required />
                <input type="tel" placeholder="Phone number" required />
                <input type="email" placeholder="Email" required />
                <button
                  type="submit"
                  disabled={cartItems.length === 0}
                >
                  Order
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Модальное окно */}
      {isModalOpen && (
        <div className="modalOverlay">
          <div className="modalContent">
            <h2>Congratulations! </h2>
            <p>Your order has been successfully placed on the website. <br /> <br />
            A manager will contact you shortly to confirm your order.</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Basket;