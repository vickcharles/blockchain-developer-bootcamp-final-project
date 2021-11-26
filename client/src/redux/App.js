import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    generalError: "",
  },
  reducers: {
    setGeneralError(state, action) {
      state.generalError = action.payload;
    },
    clearError(state) {
      state.generalError = "";
    },
  },
});

export const { setGeneralError, clearError } = appSlice.actions;
export default appSlice.reducer;
