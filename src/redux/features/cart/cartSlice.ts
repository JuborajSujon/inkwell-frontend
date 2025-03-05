/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";

interface CartState {
  selectedCart: any | null;
  isLoading: boolean;
  isError: boolean;
  error: string | null;
}

const initialState: CartState = {
  selectedCart: null,
  isLoading: false,
  isError: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.isError = true;
      state.error = action.payload;
    },
    clearError: (state) => {
      state.isError = false;
      state.error = null;
    },
    setSelectedUser: (state, action) => {
      state.selectedCart = action.payload;
    },
    clearSelectedUser: (state) => {
      state.selectedCart = null;
    },
  },
});

export const {
  setLoading,
  setError,
  clearError,
  setSelectedUser,
  clearSelectedUser,
} = cartSlice.actions;

// Selectors
export const selectSelectedCart = (state: RootState) => state.cart.selectedCart;
export const selectCartLoading = (state: RootState) => state.cart.isLoading;
export const selectCartError = (state: RootState) => state.cart.error;

export default cartSlice.reducer;
