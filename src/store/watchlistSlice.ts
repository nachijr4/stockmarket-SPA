import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addWatchlist, checkWatchlisted, fetchWatchlist, removeWatchlist } from "./api/watchlistApi";
import { appActions } from "./AppSlice";
import { Watchlist, WatchlistQuote } from "../types/WatchlistTypes";
import { Quote } from "../types/StockTypes";
import { getQuote } from "./api/stockAPI";

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

export const fetchWatchlistAction = createAsyncThunk(
    'watchlist/fetchWatchlist',
    async () => {
        const watchlist = await fetchWatchlist()
        const quotePromises: Promise<Quote>[] = []
        watchlist.forEach(item => quotePromises.push(getQuote(item.stockTicker)))
        const quotes: Quote[] = await Promise.all(quotePromises)

        const data:{[key: string]: WatchlistQuote} = {}

        watchlist.map((item, index) => {
            const q = quotes[index]
            data[item.stockTicker] = {...item, c: q.c, dp: q.dp, d: q.d}
        })

        return data
    }
)

interface WatchlistStateType {
    isLoading: boolean,
    watchlist: {[key: string]: WatchlistQuote}
}

const initialState: WatchlistStateType= {
    isLoading: false,
    watchlist: {}
}

const WatchlistSlice = createSlice({
    name: 'watchlist',
    initialState: initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        // builder.addCase(addWatchlistAction.fulfilled, (state, action) => {
        //     state.watchlist[action.payload.stockTicker] = action.payload
        // })

        builder.addCase(removeWatchlistAction.fulfilled, (state, action) => {
            if(state.watchlist.hasOwnProperty(action.payload.stockTicker)) {
                delete state.watchlist[action.payload.stockTicker]
            }
        })

        builder.addCase(fetchWatchlistAction.pending, (state, action) => {
            state.watchlist = {}
            state.isLoading = true
        })

        builder.addCase(fetchWatchlistAction.fulfilled, (state, action) => {
            state.watchlist = action.payload
            state.isLoading = false
        })
    }
})

export const watchlistActions = WatchlistSlice.actions;

export default WatchlistSlice;
