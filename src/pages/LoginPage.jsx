import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/login.css';

export default function LoginPage() {
  const [username, setUsername] = useState('mor_2314');
  const [password, setPassword] = useState('83r5^_');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/products');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://fakestoreapi.com/auth/login', {
        username,
        password,
      });
      localStorage.setItem('token', res.data.token);
      navigate('/products');
    } catch (err) {
      setError('Invalid credentials');
    }
  };
  // {
  //   "username": "mor_2314",
  //   "password": "83r5^_"
  // }
  
  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2>Welcome Back 👋</h2>
        <p className="subtitle">Login to continue shopping</p>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="error">{error}</p>}
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
