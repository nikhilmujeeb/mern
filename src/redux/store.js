// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import productsReducer from './productsSlice'; // Import the products reducer

const store = configureStore({
  reducer: {
    user: userReducer,
    products: productsReducer, // Add products reducer to the store
    // other reducers if needed
  },
});

export default store;
