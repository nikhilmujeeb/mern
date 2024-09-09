import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '../store/productsSlice';
import ProductList from '../components/ProductList';
import './Products.css';
import { useLocation } from 'react-router-dom';

const Products = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const products = useSelector((state) => state.products.items);

  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get('category');

  useEffect(() => {
    const fetchProducts = async () => {
      const url = category 
        ? `https://fakestoreapi.com/products/category/${category}` 
        : 'https://fakestoreapi.com/products';
        
      console.log('Fetching from URL:', url); // Log the URL being fetched

      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log('Fetched data:', data); // Log fetched data
        dispatch(setProducts(data));
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [dispatch, category]);

  useEffect(() => {
    console.log('Products from store:', products); // Log products from store
  }, [products]);

  const filteredProducts = category 
    ? products.filter((product) => product.category === category) 
    : products;

  console.log('Filtered Products:', filteredProducts); // Log filtered products

  return (
    <div className="products-container">
      <h1 className="products-heading">
        {category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Products'}
      </h1>
      <ProductList products={filteredProducts} />
    </div>
  );
};

export default Products;
