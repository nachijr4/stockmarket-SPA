import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {getCompanyProfile, getHistoricData, getQuote,getLatestNews,
    getRecommendation, getCompanySentiment, getCompanyPeers, getCompanyEarnings} from './api/stockAPI'
import * as StockTypes from '../types/StockTypes'

interface StockDataType {
    companyProfile?: StockTypes.CompanyProfile,
    historicData?: StockTypes.HistoricData[],
    quote?: StockTypes.Quote,
    latestNews?: StockTypes.LatestNews[],
    recommendation?: StockTypes.Recommendation[],
    companySentiment?: StockTypes.CompanySentiment,
    companyPeers?: StockTypes.CompanyPeer[],
    companyEarnings?: StockTypes.CompanyEarnings[]
}

interface StockStateType {
    stockSymbol: string ,
    isLoading: boolean,
    data: StockDataType
}

const initialStockState: StockStateType = {
    stockSymbol: "",
    isLoading: false,
    data: {}
}

export const fetchStockData = createAsyncThunk(
    'stock/fetchBySymbol',
    async (symbol: string): Promise<StockDataType> => {
        const promiseArray: [Promise<StockTypes.CompanyProfile>, Promise<StockTypes.HistoricData[]>, Promise<StockTypes.Quote>, Promise<StockTypes.LatestNews[]>, Promise<StockTypes.Recommendation[]>, Promise<StockTypes.CompanySentiment>, Promise<StockTypes.CompanyPeer[]>, Promise<StockTypes.CompanyEarnings[]>] 
        = [    getCompanyProfile(symbol),
                getHistoricData(symbol),
                getQuote(symbol),
                getLatestNews(symbol),
                getRecommendation(symbol),
                getCompanySentiment(symbol),
                getCompanyPeers(symbol),
                getCompanyEarnings(symbol)
        ]
        const [companyProfile, historicData, quote, latestNews, recommendation, companySentiment, companyPeers, companyEarnings] = await Promise.all(promiseArray)
        const data: StockDataType = {companyProfile, historicData, quote, latestNews, recommendation, companySentiment, companyPeers, companyEarnings}
        return data
    }
)
const stockSlice = createSlice({
    name: "stock",
    initialState: initialStockState,
    reducers: {
        setStockState(state, action) {
            state = action.payload
        }
    },

    extraReducers: (builder) => {
        builder.addCase(fetchStockData.pending, (state, action) => {
            state.isLoading = true
        })

        builder.addCase(fetchStockData.fulfilled, (state, action) => {
            state.stockSymbol = action.payload.companyProfile ? action.payload.companyProfile.ticker : ""
            state.data = action.payload
            state.isLoading = false
        })
    }
})

export const stockActions = stockSlice.actions;

export default stockSlice;