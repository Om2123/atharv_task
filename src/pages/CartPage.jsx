import { useEffect, useState } from 'react';

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const handleQuantityChange = (id, delta) => {
    const updatedCart = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    );
    updateCart(updatedCart);
  };

  const handleRemove = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    updateCart(updatedCart);
  };

  const handleCheckout = () => {
    localStorage.removeItem('cart');
    setCart([]);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 4000);
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '30px', fontSize: '28px', color: '#333' }}>🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <p style={{ fontSize: '18px', color: '#777' }}>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                gap: '20px',
                alignItems: 'center',
                border: '1px solid #eee',
                borderRadius: '12px',
                padding: '15px',
                marginBottom: '20px',
                backgroundColor: '#fff',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                style={{
                  height: '80px',
                  width: '80px',
                  objectFit: 'contain',
                  borderRadius: '8px',
                  backgroundColor: '#f9f9f9',
                  padding: '10px',
                }}
              />
              <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: '18px', margin: '5px 0' }}>{item.title}</h4>
                <p style={{ color: '#007bff', fontWeight: 'bold' }}>${item.price.toFixed(2)}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <button
                  onClick={() => handleQuantityChange(item.id, -1)}
                  style={{
                    padding: '6px 12px',
                    background: '#eee',
                    border: 'none',
                    borderRadius: '4px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    fontSize: '16px',
                  }}
                >
                  -
                </button>
                <span style={{ margin: '0 12px', fontSize: '16px' }}>{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item.id, 1)}
                  style={{
                    padding: '6px 12px',
                    background: '#eee',
                    border: 'none',
                    borderRadius: '4px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    fontSize: '16px',
                  }}
                >
                  +
                </button>
              </div>
              <button
                onClick={() => handleRemove(item.id)}
                style={{
                  marginLeft: '15px',
                  color: '#ff4d4f',
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
              >
                ✖
              </button>
            </div>
          ))}

          <h3 style={{ fontSize: '22px', color: '#333' }}>Total: ${totalPrice.toFixed(2)}</h3>

          <button
            onClick={handleCheckout}
            style={{
              padding: '12px 25px',
              backgroundColor: '#28a745',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              fontSize: '16px',
              cursor: 'pointer',
              marginTop: '20px',
              transition: 'background-color 0.3s ease',
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#218838'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#28a745'}
          >
            ✅ Place Order
          </button>
        </>
      )}

      {showPopup && (
        <div
          style={{
            position: 'fixed',
            bottom: '30px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#28a745',
            color: '#fff',
            padding: '15px 30px',
            borderRadius: '10px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            fontWeight: 'bold',
            zIndex: 1000,
            fontSize: '16px',
          }}
        >
          🎉 Order placed successfully!
        </div>
      )}
    </div>
  );
}
