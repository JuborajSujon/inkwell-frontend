/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";

interface ProductState {
  products: any[];
  selectedProduct: any | null;
  isLoading: boolean;
  isError: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  selectedProduct: null,
  isLoading: false,
  isError: false,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    updateProductInState: (state, action) => {
      const index = state.products.findIndex(
        (product) => product._id === action.payload._id
      );
      if (index !== -1) {
        state.products[index] = action.payload;
      }
      if (state.selectedProduct?._id === action.payload._id) {
        state.selectedProduct = action.payload;
      }
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
      if (state.selectedProduct?._id === action.payload) {
        state.selectedProduct = null;
      }
    },
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
  },
});

export const {
  setProducts,
  setSelectedProduct,
  addProduct,
  updateProductInState,
  removeProduct,
  setLoading,
  setError,
  clearError,
} = productSlice.actions;

// Selectors
export const selectAllProducts = (state: RootState) => state.product.products;
export const selectSelectedProduct = (state: RootState) =>
  state.product.selectedProduct;
export const selectProductLoading = (state: RootState) =>
  state.product.isLoading;
export const selectProductError = (state: RootState) => state.product.error;

export default productSlice.reducer;
