import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import RealEstateProperty from "../services/RealEstateProperty";

export const getAllProperties = createAsyncThunk(
  "properties/getProperties",
  async () => {
    const instance = await RealEstateProperty();
    const res = await instance.methods.getProperties().call();
    return res.map((obj) => ({
      properties: obj.properties.map((obj) => ({
        available: obj.available,
        depositAmount: obj.depositAmount,
        depositPrice: obj.depositPrice,
        description: obj.description,
        id: obj.id,
        montlyPrice: obj.montlyPrice,
        owner: obj.owner,
        tenant: obj.tenant,
        title: obj.title,
      })),
      owner: obj.owner,
      numOfProperties: obj.numOfProperties,
    }));
  }
);

export const propertiesSlice = createSlice({
  name: "properties",
  initialState: {
    allProperties: [
      {
        numOfProperties: "",
        owner: "",
        properties: [],
      },
    ],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProperties.fulfilled, (state, action) => {
      state.allProperties = [...action.payload];
    });
  },
});

export const { _ } = propertiesSlice.actions;
export default propertiesSlice.reducer;
