import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import Login from './pages/Login';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import OrderPlaced from './pages/OrderPlaced';
import CategoryPage from './pages/CategoryPage'; // Import CategoryPage

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order-placed" element={<OrderPlaced />} />
          <Route path="/products/category/:category" element={<CategoryPage />} /> {/* Add category route */}
        </Routes>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
