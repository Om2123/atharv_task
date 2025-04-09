import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching product:', err);
        setLoading(false);
      });
  }, [id]);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart!');
  };

  if (loading) return <h2 style={{ textAlign: 'center' }}>Loading...</h2>;
  if (!product) return <h2>Product not found.</h2>;

  return (
    <div style={{
      padding: '40px 20px',
      maxWidth: '1000px',
      margin: '0 auto',
      animation: 'fadeIn 0.5s ease-in-out'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '40px',
        backgroundColor: '#fff',
        borderRadius: '15px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        padding: '30px',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}>
        <img
          src={product.image}
          alt={product.title}
          style={{
            width: '300px',
            height: '300px',
            objectFit: 'contain',
            borderRadius: '10px',
            backgroundColor: '#f9f9f9',
            padding: '20px'
          }}
        />

        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: '24px', marginBottom: '15px', color: '#333' }}>{product.title}</h2>
          <p style={{ fontSize: '18px', color: '#007bff', fontWeight: 'bold' }}>${product.price}</p>
          <p style={{ fontSize: '16px', lineHeight: 1.5, marginTop: '15px', color: '#555' }}>
            {product.description}
          </p>

          <button
            onClick={addToCart}
            style={{
              marginTop: '25px',
              padding: '12px 25px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '16px',
              transition: 'background-color 0.3s ease',
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Animation keyframes */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
}
