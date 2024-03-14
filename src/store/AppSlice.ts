import { createSlice } from "@reduxjs/toolkit";

interface Notification {
    display: boolean,
    type: string,
    message: string
}

interface AppState {
    notification: Notification,
    isFetchingData: boolean
}

const initialAppState: AppState = {
    notification: {
        display: false,
        type: "",
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
          type: action.payload.type,
        };
      },
      closeNotification(state) {
        state.notification = initialAppState.notification;
      }
    },
  });

export const appActions = appSlice.actions;

export default appSlice;