import { createSlice } from "@reduxjs/toolkit";

interface RegisterState {
  isOpen: boolean;
}

const initialState: RegisterState = {
  isOpen: false,
};

export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    onOpen: (state) => {
      state.isOpen = true;
    },
    onClose: (state) => {
      state.isOpen = false;
    },
  },
});

export const { onOpen, onClose } = registerSlice.actions;
export default registerSlice.reducer;
