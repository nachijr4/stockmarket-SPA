import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getWalletAmount } from "./api/userApi";

interface Notification {
    display: boolean,
    type: string,
    message: string
}

interface AppState {
    notification: Notification,
    isFetchingData: boolean,
    wallet: number
}

const initialAppState: AppState = {
    notification: {
        display: false,
        type: "",
        message: ""
    },
    isFetchingData: false,
    wallet: 0
}

export const getWalletAmountAction = createAsyncThunk(
    'user/getWallet',
    async () => {
        return await getWalletAmount()
    }
)


const appSlice = createSlice({
    name: "app",
    initialState: initialAppState,
    reducers: {
      showNotification(state, action) {
        state.notification = {
          message: action.payload.message,
          display: true,
          type: action.payload.type,
        };
      },
      closeNotification(state) {
        state.notification = initialAppState.notification;
      },
      updateWallet(state, action) {
        if(state.wallet + action.payload >= 0)
            state.wallet = state.wallet + action.payload
      },
      setWallet(state, action) {
        state.wallet = action.payload
      }

    },
    extraReducers: (builder) => {
        // Wallet
        builder.addCase(getWalletAmountAction.fulfilled, (state, action) => {
            state.wallet = action.payload
        })

        builder.addCase(getWalletAmountAction.rejected, (state, action) => {
            state.wallet = 0
        })
    }
  });

export const appActions = appSlice.actions;

export default appSlice;