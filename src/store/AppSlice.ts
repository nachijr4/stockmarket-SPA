import { createSlice } from "@reduxjs/toolkit";

interface Notification {
    display: boolean,
    success: boolean,
    message: string
}

interface AppState {
    notification: Notification,
    isFetchingData: boolean
}

const initialAppState: AppState = {
    notification: {
        display: false,
        success: true,
        message: ""
    },
    isFetchingData: false
}


const appSlice = createSlice({
    name: "app",
    initialState: initialAppState,
    reducers: {
      showNotification(state, action) {
        state.notification = {
          message: action.payload.message,
          display: true,
          success: action.payload.open,
        };
      },
      closeNotification(state, action) {
        state.notification.display = false;
      }
    },
  });

export const appActions = appSlice.actions;

export default appSlice;