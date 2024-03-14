import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {getCompanyProfile, getHistoricData, getQuote,getLatestNews,
    getRecommendation, getCompanySentiment, getCompanyPeers, getCompanyEarnings} from './api/stockAPI'
import * as StockTypes from '../types/StockTypes'
import { RootState } from ".";
import * as utilities from '../utilities'
interface StockDataType {
    companyProfile?: StockTypes.CompanyProfile,
    historicData?: StockTypes.HistoricData[],
    hourlyPrice?: StockTypes.HistoricData[],
    quote?: StockTypes.Quote,
    latestNews?: StockTypes.LatestNews[],
    recommendation?: StockTypes.Recommendation[],
    companySentiments?: StockTypes.CompanySentiment[],
    companyPeers?: StockTypes.CompanyPeer[],
    companyEarnings?: StockTypes.CompanyEarnings[],
    recommendationChart ?: StockTypes.RecommendationChart,
    companyEarningsChart?: StockTypes.CompanyEarningsChart,
    hourlyPriceChart?: StockTypes.HourlyPriceChart[]
}

interface StockStateType {
    stockSymbol: string ,
    isLoading: boolean,
    data : StockDataType,
    displayStock: boolean,
    displayNoStock: boolean,
    isMarketClosed: boolean
}

const initialStockState: StockStateType = {
    stockSymbol: "",
    isLoading: false,
    displayStock: false,
    displayNoStock: false,
    data: {},
    isMarketClosed: false
}



export const fetchStockData = createAsyncThunk(
    'stock/fetchBySymbol',
    async (symbol: string): Promise<StockDataType> => {
        const promiseArray: [Promise<StockTypes.CompanyProfile>, Promise<StockTypes.HistoricData[]>, Promise<StockTypes.LatestNews[]>, Promise<StockTypes.Recommendation[]>, Promise<StockTypes.CompanySentiment[]>, Promise<StockTypes.CompanyPeer[]>, Promise<StockTypes.CompanyEarnings[]>] 
        = [    getCompanyProfile(symbol),
                getHistoricData(symbol, false),
                getLatestNews(symbol),
                getRecommendation(symbol),
                getCompanySentiment(symbol),
                getCompanyPeers(symbol),
                getCompanyEarnings(symbol)
        ]

        var quote: StockTypes.Quote = {
            o: 0,
            h: 0,
            l: 0,
            c: 0,
            pc: 0,
            d: 0,
            dp: 0,
            t: 0,
            ct: 0,
            marketClosed: false
        }

        const hourlyPricePromise = getQuote(symbol).then(data => {
            quote = data
            console.log("------------------------ Quote")
            console.log(quote)
            return getHistoricData(symbol, true, quote)
        })

        const [companyProfile, historicData, latestNews, recommendation, companySentiments, companyPeers, companyEarnings] = await Promise.all(promiseArray)
        const hourlyPrice = await hourlyPricePromise
        const recommendationChart = utilities.generateRecomChartData(recommendation)
        const companyEarningsChart = utilities.generateEPSChartData(companyEarnings)
        const hourlyPriceChart = utilities.generateHourlyPriceChart(hourlyPrice)
        const data: StockDataType = {quote, companyEarningsChart, companyProfile, historicData, latestNews, recommendation, companySentiments, companyPeers, companyEarnings, recommendationChart, hourlyPrice, hourlyPriceChart}
        return data
    }
)

export const fetchQuoteData = createAsyncThunk(
    'stock/fetchQuoteBySymbol', async (symbol: string, thunkApi): Promise<StockTypes.Quote> => {
        const state = thunkApi.getState() as RootState
        if (state.stock.data.companyProfile)
            return await getQuote(state.stock.data.companyProfile.ticker)
        else
            return await getQuote("")
    }
)

const stockSlice = createSlice({
    name: "stock",
    initialState: initialStockState,
    reducers: {
        resetStockState(state) {
            state.data = {}
            state.displayStock = false
            state.isLoading = false
            state.stockSymbol = ""
            state.displayNoStock = false
        }
    },

    extraReducers: (builder) => {
        builder.addCase(fetchStockData.pending, (state, action) => {
            state.isLoading = true
            state.displayStock = false
        })

        builder.addCase(fetchStockData.fulfilled, (state, action) => {
            state.stockSymbol = action.payload.companyProfile ? action.payload.companyProfile.ticker : ""
            state.data = action.payload
            state.isLoading = false
            state.displayStock = true
            if(state.data.quote !== undefined) {
                state.isMarketClosed = state.data.quote.marketClosed
            }
        })

        builder.addCase(fetchStockData.rejected, (state, action) => {
            state.stockSymbol = ""
            state.data = {}
            state.isLoading = false
            state.displayStock = false
            state.displayNoStock = true
        })

        builder.addCase(fetchQuoteData.fulfilled, (state, action) => {
            state.data.quote = action.payload
            state.isMarketClosed = action.payload.marketClosed
        })
    }
})

export const stockActions = stockSlice.actions;

export default stockSlice;