import { createSlice } from '@reduxjs/toolkit';

const isConnectedSlice = createSlice({
  name: 'isConnected',
  initialState: { isConnected: false },
  reducers: {
    setIsConnected: (state, action) => {
      state.isConnected = action.payload;
    },
  },
});

export const { setIsConnected } = isConnectedSlice.actions;
export const isConnectedReducer = isConnectedSlice.reducer;
