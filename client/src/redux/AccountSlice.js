import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getUserAddresses = createAsyncThunk(
  "users/getAdress",
  async () => {
    if (typeof window.ethereum !== "undefined") {
      return [];
    }
  }
);

export const accountSlice = createSlice({
  name: "account",
  initialState: {
    address: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserAddresses.fulfilled, (state, action) => {
      state.address = action.payload[0];
    });
  },
});

export const { setAccount } = accountSlice.actions;
export default accountSlice.reducer;
