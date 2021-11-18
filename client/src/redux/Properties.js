import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Web3 from "web3";
import RealEstateProperty from "../services/RealEstateProperty";

export const getAllProperties = createAsyncThunk(
  "properties/getProperties",
  async (_, { getState }) => {
    const { account } = getState();
    console.log(account);
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

export const rentProperty = createAsyncThunk(
  "properties/rentProperty",
  async ({ owner, id, montlyPrice, depositPrice }, { getState }) => {
    const { account } = getState();
    const instance = await RealEstateProperty();
    const amountToPay = Number(montlyPrice) + Number(depositPrice);
    const res = await instance.methods
      .rentProperty(owner, id)
      .send({ from: account.address, value: amountToPay })
      .catch((e) => {
        console.log(e);
      });
    return res;
  }
);

export const getRentals = createAsyncThunk(
  "properties/getRentals",
  async (__, { getState }) => {
    const { account } = getState();
    const instance = await RealEstateProperty();
    const address = Web3.utils.toChecksumAddress(account.address);
    const res = await instance.methods.getPropertyByTenant(address).call();
    return res;
  }
);

export const createProperty = createAsyncThunk(
  "properties/create",
  async ({ title, description, montlyPrice, depositPrice }, { getState }) => {
    const { account } = getState();
    const instance = await RealEstateProperty();

    const res = await instance.methods
      .createProperty(
        title,
        description,
        Web3.utils.toWei(montlyPrice, "ether"),
        Web3.utils.toWei(depositPrice, "ether")
      )
      .send({ from: account.address })
      .catch((e) => {
        console.log(e);
      });
    console.log(res);
  }
);

export const propertiesSlice = createSlice({
  name: "properties",
  initialState: {
    allProperties: [],
    currentRental: null,
    isRentProcessing: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProperties.fulfilled, (state, action) => {
      state.allProperties = [...action.payload];
    });
    builder.addCase(rentProperty.fulfilled, (state, action) => {
      state.isRentProcessing = true;
    });
    builder.addCase(createProperty.rejected, (state, action) => {
      console.log(action.payload);
    });
    builder.addCase(getRentals.fulfilled, (state, action) => {
      state.currentRental = action.payload;
    });
  },
});

export const { _ } = propertiesSlice.actions;
export default propertiesSlice.reducer;
