import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addWatchlist, checkWatchlisted, removeWatchlist } from "./api/watchlistApi";
import { appActions } from "./AppSlice";

export const checkWatchlistedAction = createAsyncThunk(
    'watchlist/checkWatchlist',
    async (symbol: string) => {
        const isWatchlisted = await checkWatchlisted(symbol)
        return isWatchlisted
    }
)

export const addWatchlistAction = createAsyncThunk(
    'watchlist/addWatchlist',
    async (payload: any, thunkApi) => {
        const watchlist = await addWatchlist(payload.symbol, payload.companyName)
        thunkApi.dispatch(appActions.showNotification({type: "success", message: `${payload.symbol} added to Watchlist`}))
        return watchlist
    }
)

export const removeWatchlistAction = createAsyncThunk(
    'watchlist/removeWatchlist',
    async (symbol: string, thunkApi) => {
        const watchlist = await removeWatchlist(symbol)
        thunkApi.dispatch(appActions.showNotification({type: "danger", message: `${symbol} removed from Watchlist`}))
        return watchlist
    }
)