// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productsSlice';
import userReducer from '../redux/userSlice'; // Update path if needed

const store = configureStore({
  reducer: {
    products: productsReducer,
    user: userReducer,
  },
});

export default store;
