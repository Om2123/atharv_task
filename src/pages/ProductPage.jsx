import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/products.css';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const total = cart.reduce((acc, item) => acc + item.quantity, 0);
    setCartCount(total);
  }, [filteredProducts]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get('https://fakestoreapi.com/products');
        setProducts(res.data);
        setFilteredProducts(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await axios.get('https://fakestoreapi.com/products/categories');
        setCategories(res.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    let temp = [...products];
    if (selectedCategory !== 'all') {
      temp = temp.filter((product) => product.category === selectedCategory);
    }
    if (searchQuery.trim()) {
      temp = temp.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredProducts(temp);
  }, [products, selectedCategory, searchQuery]);

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    const total = cart.reduce((acc, item) => acc + item.quantity, 0);
    setCartCount(total);
    alert('🛒 Product added to cart!');
  };

  if (loading) return <div className="spinner">🌀 Loading products...</div>;

  return (
    <div className="products-container">
      {/* Filters */}
      <div className="filters-bar">
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Products Grid */}
      <div className="products-grid">
        {filteredProducts.map((product, index) => (
          <div
            className="product-card"
            key={product.id}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <Link to={`/products/${product.id}`}>
              <img src={product.image} alt={product.title} />
              <h4>{product.title}</h4>
              <p className="price">${product.price}</p>
            </Link>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}
