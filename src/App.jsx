import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductPage';
import CartPage from './pages/CartPage.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx';
import Header from './components/Header.jsx';


function App() {
  return (
<>
    <Header />

    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/cart" element={<CartPage />} />

      <Route path="/products/:id" element={<ProductDetailPage />} />

    </Routes>
</>
  );
}

export default App;
