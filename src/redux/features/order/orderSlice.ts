/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";

interface OrderState {
  selectedOrder: any | null;
  isLoading: boolean;
  isError: boolean;
  error: string | null;
}

const initialState: OrderState = {
  selectedOrder: null,
  isLoading: false,
  isError: false,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
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
    setSelectedOrder: (state, action) => {
      state.selectedOrder = action.payload;
    },
    clearSelectedOrder: (state) => {
      state.selectedOrder = null;
    },
  },
});

export const {
  setLoading,
  setError,
  clearError,
  setSelectedOrder,
  clearSelectedOrder,
} = orderSlice.actions;

// Selectors
export const selectSelectedOrder = (state: RootState) =>
  state.order.selectedOrder;
export const selectOrderLoading = (state: RootState) => state.order.isLoading;
export const selectOrderError = (state: RootState) => state.order.error;

export default orderSlice.reducer;
