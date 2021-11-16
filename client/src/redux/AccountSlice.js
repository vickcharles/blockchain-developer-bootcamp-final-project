import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getUserAddresses = createAsyncThunk(
  "users/getAdress",
  async () => {
    if (typeof window.ethereum !== "undefined") {
      const res = await window.ethereum.request({ method: "eth_accounts" });
      return res;
    }
  }
);

export const accountSlice = createSlice({
  name: "account",
  initialState: {
    address: "",
  },
  reducers: {
    setAccount: (state, action) => {
      state.address = action.payload[0];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserAddresses.fulfilled, (state, action) => {
      state.address = action.payload[0];
    });
  },
});

export const { setAccount } = accountSlice.actions;
export default accountSlice.reducer;