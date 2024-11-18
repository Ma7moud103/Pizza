import { configureStore } from '@reduxjs/toolkit';
import usreReducer from './features/user/UserSlice';
import cartReducer from './features/cart/cartSlice';
const store = configureStore({
  reducer: {
    user: usreReducer,
    cart: cartReducer,
  },
});

export default store;
