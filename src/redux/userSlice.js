// src/redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: '',
  },
  reducers: {
    setUserName: (state, action) => {
      state.name = action.payload;
    },
  },
});

// Selector to get the user's name
export const selectUserName = (state) => state.user.name;

export const { setUserName } = userSlice.actions;
export default userSlice.reducer;
