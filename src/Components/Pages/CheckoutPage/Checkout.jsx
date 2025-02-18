import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import "./Checkout.css";

const CheckoutModal = ({ isOpen, onClose }) => {
  const [cart, setCart] = useState([
    { id: 1, name: "Standard", price: 599, quantity: 1 },
    { id: 1, name: "Standard", price: 599, quantity: 1 },
    { id: 1, name: "Standard", price: 599, quantity: 1 },
    { id: 1, name: "Standard", price: 599, quantity: 1 },
    { id: 1, name: "Standard", price: 599, quantity: 1 },
    { id: 1, name: "Standard", price: 599, quantity: 1 },
  ]);

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Checkout</h2>
        </div>
        <div className="cart-table-wrapper">
          <table className="cart-table">
            <thead>
              <tr>
                <th></th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>
                    <RxCross1
                      className="remove-icon"
                      onClick={() => removeItem(item.id)}
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>£{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>£{item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="checkout-content">
          {/* User Details Form */}
          <div className="form-section">
            <h3>Your Details</h3>
            <div className="flex">
              <input type="text" placeholder="Full Name" />
              <input type="text" placeholder="Full Name" />
            </div>
            <input type="email" placeholder="Email" />

            <h3>Address</h3>
            <input type="text" placeholder="Post Code" />
            <input type="text" placeholder="Street Address" />
            <input type="text" placeholder="House Number" />

            <h3>Phone Number</h3>
            <input type="text" placeholder="Phone Number" />
          </div>

          {/* Order Summary */}
          <div className="total-section">
            <h2>Total</h2>
            <div className="total-box">
              <div className="total-row">
                <span>Subtotal</span>
                <span>£{subtotal}</span>
              </div>
              <div className="total-row">
                <span>Total</span>
                <span>£{subtotal}</span>
              </div>
            </div>
            <button className="checkout-btn">Proceed to checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
