import { createSlice } from "@reduxjs/toolkit";

interface LoginState {
  isOpen: boolean;
}

const initialState: LoginState = {
  isOpen: false,
};

export const loginSlice = createSlice({
  name: "login",
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

export const { onOpen, onClose } = loginSlice.actions;
export default loginSlice.reducer;
