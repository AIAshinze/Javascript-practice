import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './App.css';

function CartItem({ onContinueShopping }) {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Helper to parse price string to number
  const parseCost = (costString) => {
    if (typeof costString === 'number') return costString;
    return parseFloat(costString.replace('$', ''));
  };

  // Calculate the total cost for all items in the cart
  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach(item => {
      total += parseCost(item.cost) * item.quantity;
    });
    return total.toFixed(2);
  };

  const handleContinueShopping = (e) => {
    if (onContinueShopping) {
      onContinueShopping(e);
    }
  };

  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Calculate the total cost for a specific item (subtotal)
  const calculateTotalCost = (item) => {
    return (parseCost(item.cost) * item.quantity).toFixed(2);
  };

  // Calculate total number of items in the cart
  const calculateTotalQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="cart-container">
      <h2 className="cart-header">Your Shopping Cart</h2>
      
      <div className="cart-summary">
        <span className="cart-summary-text">Total Plants: <strong>{calculateTotalQuantity()}</strong></span>
        <span className="cart-summary-text">Total Cost: <strong>${calculateTotalAmount()}</strong></span>
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart-message">
          <p>Your cart is empty. Add some beautiful plants to bring it to life!</p>
          <button className="continue-shopping-btn" onClick={handleContinueShopping}>
            Shop Now
          </button>
        </div>
      ) : (
        <div className="cart-items-wrapper">
          <div className="cart-items-list">
            {cart.map((item, index) => (
              <div className="cart-item-card" key={index}>
                <div className="cart-item-image-wrapper">
                  <img className="cart-item-image" src={item.image} alt={item.name} />
                </div>
                <div className="cart-item-details">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <div className="cart-item-price-row">
                    <span className="cart-item-unit-price">Unit Price: <strong>{item.cost}</strong></span>
                    <span className="cart-item-subtotal">Subtotal: <strong>${calculateTotalCost(item)}</strong></span>
                  </div>
                  <div className="cart-item-controls">
                    <div className="quantity-controls">
                      <button 
                        id={`dec-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                        className="quantity-btn dec-btn" 
                        onClick={() => handleDecrement(item)}
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="quantity-value">{item.quantity}</span>
                      <button 
                        id={`inc-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                        className="quantity-btn inc-btn" 
                        onClick={() => handleIncrement(item)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <button 
                      id={`delete-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className="delete-btn" 
                      onClick={() => handleRemove(item)}
                    >
                      <span className="delete-icon">🗑️</span> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-actions">
            <button id="continue-shopping-btn" className="continue-shopping-btn" onClick={handleContinueShopping}>
              Continue Shopping
            </button>
            <button id="checkout-btn" className="checkout-btn" onClick={handleCheckoutShopping}>
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartItem;
