import React from 'react';

export default function Basket(props) {
  const { cartItems, onAdd, onRemove } = props;
  const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);
  const taxPrice = itemsPrice * 0.14;
  const shippingPrice = itemsPrice > 2000 ? 0 : 20;
  const totalPrice = itemsPrice + taxPrice + shippingPrice;
  return (
    <aside className="contai-2">
      <h2>Cart Items</h2>


      <div>
        {cartItems.length === 0 && <div>Cart is empty</div>}
        {cartItems.map((item) => (
          <div key={item.id} className="text">
            <div className="text-2">{item.name}</div>


            <div className="text-2">
              {item.qty} x ${item.price.toFixed(2)}
            </div>

            <div className="text-2">
              <button onClick={() => onRemove(item)} className="remove">
                -
              </button>{' '}
              <button onClick={() => onAdd(item)} className="add">
                +
              </button>
            </div>

          </div>
        ))}

        {cartItems.length !== 0 && (
          <>
            <hr></hr>
            <div className="text">
              <div className="text-2">Items-Price</div>
              <div className="text-1">${itemsPrice.toFixed(2)}</div>
            </div>
            <div className="text">
              <div className="text-2">Tax-Price</div>
              <div className="text-1">${taxPrice.toFixed(2)}</div>
            </div>
            <div className="text">
              <div className="text-2">Shipping-Price</div>
              <div className="text-1">
                ${shippingPrice.toFixed(2)}
              </div>
            </div>

            <div className="text">
              <div className="text-2">
                <strong>Total Price</strong>
              </div>
              <div className="text-1">
                <strong>${totalPrice.toFixed(2)}</strong>
              </div>
            </div>
            <hr />
            <form>
            <div className="text">
              <label className="text-2">รับเงิน</label>
              <div className="text-1">
                <input type="nubber" />
              </div>
            </div>
            <div className="text">
              <label className="text-2">ถอนเงิน</label>
              <div className="text-1">
                <input type="nubber" />
              </div>
            </div>
            </form>
            <div className="text">
              <button onClick={() => alert('Implement Checkout!')}>
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
