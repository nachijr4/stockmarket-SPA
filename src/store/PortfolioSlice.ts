import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { isStockPurchased } from "./api/portfolioApi";

export const isStockPurchasedAction = createAsyncThunk(
    'portfolio.isStockPurchased',
    async (symbol: string) => {
        const portfolio = await isStockPurchased(symbol)
        return portfolio
    }
)