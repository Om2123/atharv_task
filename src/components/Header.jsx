import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Header() {
  const [cartCount, setCartCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    updateCartCount();
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    const handleStorageChange = () => updateCartCount();
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(total);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <header style={styles.header}>
      <Link to="/" style={styles.logo}>🛍️ MyShop</Link>

      <nav style={styles.nav}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/cart" style={styles.link}>
          Cart
          {cartCount > 0 && <span style={styles.badge}>{cartCount}</span>}
        </Link>
        {isLoggedIn ? (
          <button onClick={handleLogout} style={styles.authButton}>Logout</button>
        ) : (
          <Link to="/login" style={styles.authButton}>Login</Link>
        )}
      </nav>
    </header>
  );
}

const styles = {
  header: {
    backgroundColor: '#ffffff',
    padding: '15px 30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #eee',
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  logo: {
    fontSize: '22px',
    fontWeight: 'bold',
    textDecoration: 'none',
    color: '#2c3e50',
  },
  nav: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
  },
  link: {
    textDecoration: 'none',
    color: '#2c3e50',
    position: 'relative',
    fontWeight: 500,
  },
  badge: {
    backgroundColor: '#e74c3c',
    color: '#fff',
    borderRadius: '12px',
    fontSize: '12px',
    padding: '2px 6px',
    position: 'absolute',
    top: '-8px',
    right: '-12px',
    fontWeight: 'bold',
  },
  authButton: {
    background: 'none',
    border: 'none',
    color: '#007bff',
    fontWeight: 'bold',
    cursor: 'pointer',
    textDecoration: 'none',
  }
};
