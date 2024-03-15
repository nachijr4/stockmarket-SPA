import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { isStockPurchased, purchaseStock, sellStock } from "./api/portfolioApi";
import { Portfolio } from "../types/PortfolioTypes";
import { appActions } from "./AppSlice";

export const isStockPurchasedAction = createAsyncThunk(
    'portfolio.isStockPurchased',
    async (symbol: string) => {
        const portfolio = await isStockPurchased(symbol)
        return portfolio
    }
)

export const purchaseStockAction = createAsyncThunk(
    'portfolio/purchaseStock',
    async (payload: any, thunkApi) => {
        const data = await purchaseStock(payload.stockTicker, payload.quantity, payload.buyingPrice)
        thunkApi.dispatch(appActions.setWallet(data.user.balance))
        thunkApi.dispatch(appActions.showNotification({message: `${payload.stockTicker} bought successfully.`, type: "success"}))
        return data
    }
)

export const sellStockAction = createAsyncThunk(
    'portfolio/sellStock',
    async(payload: any, thunkApi) => {
        const data = await sellStock(payload.stockTicker, payload.quantity, payload.sellingPrice)
        thunkApi.dispatch(appActions.setWallet(data.user.balance))
        thunkApi.dispatch(appActions.showNotification({message: `${payload.stockTicker} sold successfully.`, type: "danger"}))
        return data
    }
)

interface PortfolioStateType {
    [key: string] : Portfolio
}

const PortfolioSlice = createSlice({
    name: 'portfolio',
    initialState: {} as PortfolioStateType,
    reducers: {
        addPortfolio(state, action) {
            state[action.payload.stockTicker] = action.payload
        },
        removePortfolio(state, action) {

        }
    },
    extraReducers: (builder) => {
        builder.addCase(purchaseStockAction.fulfilled, (state, action) => {
            state[action.payload.portfolio.stockTicker] = action.payload.portfolio
        })

        builder.addCase(sellStockAction.fulfilled, (state, action) => {
            if(action.payload.portfolio.quantity === 0 && state.hasOwnProperty(action.payload.portfolio.stockTicker))
                delete state[action.payload.portfolio.stockTicker]
            else
                state[action.payload.portfolio.stockTicker] = action.payload.portfolio
        })
    }
})