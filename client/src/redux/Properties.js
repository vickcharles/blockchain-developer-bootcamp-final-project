import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Web3 from "web3";
import RealEstateProperty from "../services/RealEstateProperty";

export const propertiesAsyncActions = {
  GET_PROPERTIES: "getProperties",
  RENT_PROPERTY: "rentProperty",
  GET_RENTALS: "getRentals",
  CREATE: "create",
};

export const getAllProperties = createAsyncThunk(
  `properties/${propertiesAsyncActions.GET_PROPERTIES}`,
  async (_) => {
    const instance = await RealEstateProperty();
    const res = await instance.methods.getLessors().call();

    return res.map((obj) => ({
      properties: obj.properties.map((obj) => ({
        available: obj.available,
        depositAmount: obj.depositAmount,
        depositPrice: obj.depositPrice,
        imgUrl: obj.imgUrl,
        description: obj.description,
        id: obj.id,
        montlyPrice: obj.montlyPrice,
        lessor: obj.lessor,
        lastPayment: obj.lastPayment,
        nextPayment: obj.nextPayment,
        tenant: obj.tenant,
        title: obj.title,
      })),
      owner: obj.owner,
      numOfProperties: obj.numOfProperties,
    }));
  }
);

export const rentProperty = createAsyncThunk(
  `properties/${propertiesAsyncActions.RENT_PROPERTY}`,
  async ({ lessor, id, montlyPrice, depositPrice, account }) => {
    const instance = await RealEstateProperty();
    const amountToPay = Number(montlyPrice) + Number(depositPrice);
    const res = await instance.methods
      .rentProperty(lessor, id)
      .send({ from: account, value: amountToPay });

    return res;
  }
);

export const getRentals = createAsyncThunk(
  `properties/${propertiesAsyncActions.GET_RENTALS}`,
  async (account, { getState }) => {
    const instance = await RealEstateProperty();
    const address = Web3.utils.toChecksumAddress(account);
    const res = await instance.methods.getPropertyByTenant(address).call();
    return res;
  }
);

export const createProperty = createAsyncThunk(
  `properties/${propertiesAsyncActions.CREATE}`,
  async ({
    address,
    title,
    description,
    imgUrl,
    montlyPrice,
    depositPrice,
  }) => {
    const instance = await RealEstateProperty();

    const res = await instance.methods
      .createProperty(
        title,
        description,
        imgUrl,
        Web3.utils.toWei(montlyPrice, "ether"),
        Web3.utils.toWei(depositPrice, "ether")
      )
      .send({ from: address });
    return res;
  }
);

export const propertiesSlice = createSlice({
  name: "properties",
  initialState: {
    allProperties: [],
    currentRental: null,
    actions: {
      [propertiesAsyncActions.GET_PROPERTIES]: {
        error: "",
        isLoading: false,
      },
      [propertiesAsyncActions.RENT_PROPERTY]: {
        error: "",
        isLoading: false,
      },
      [propertiesAsyncActions.GET_RENTALS]: {
        error: "",
        isLoading: false,
      },
      [propertiesAsyncActions.CREATE]: {
        error: "",
        isLoading: false,
      },
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProperties.fulfilled, (state, action) => {
      state.allProperties = [...action.payload];
    });
    builder.addCase(rentProperty.rejected, (state, action) => {
      state.actions = {
        ...state.actions,
        [propertiesAsyncActions.RENT_PROPERTY]: {
          error: action.error,
          isLoading: false,
        },
      };
    });
    builder.addCase(rentProperty.fulfilled, (state, action) => {
      state.actions = {
        ...state.actions,
        [propertiesAsyncActions.RENT_PROPERTY]: {
          error: "",
          isLoading: false,
        },
      };
    });
    builder.addCase(rentProperty.pending, (state, action) => {
      state.actions = {
        ...state.actions,
        [propertiesAsyncActions.RENT_PROPERTY]: {
          error: "",
          isLoading: true,
        },
      };
    });
    builder.addCase(createProperty.rejected, (state, action) => {
      state.actions = {
        ...state.actions,
        [propertiesAsyncActions.CREATE]: {
          error: action.error,
          isLoading: false,
        },
      };
    });
    builder.addCase(createProperty.fulfilled, (state, action) => {
      state.actions = {
        ...state.actions,
        [propertiesAsyncActions.CREATE]: {
          error: "",
          isLoading: false,
        },
      };
    });
    builder.addCase(createProperty.pending, (state) => {
      state.actions = {
        ...state.actions,
        create: {
          error: "",
          isLoading: true,
        },
      };
    });
    builder.addCase(getRentals.fulfilled, (state, action) => {
      state.currentRental = action.payload;
    });
  },
});

export const { _ } = propertiesSlice.actions;
export default propertiesSlice.reducer;
