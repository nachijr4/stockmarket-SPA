import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {getCompanyProfile, getPriceData, getQuote,getLatestNews,
    getRecommendation, getCompanySentiment, getCompanyPeers, getCompanyEarnings} from './api/stockAPI'
import { checkWatchlisted } from "./api/watchlistApi";
import * as StockTypes from '../types/StockTypes'
import { RootState } from ".";
import * as utilities from '../utilities'
import { addWatchlistAction, checkWatchlistedAction, removeWatchlistAction } from "./watchlistSlice";
import { access } from "fs";
import { Portfolio } from "../types/PortfolioTypes";
import { isStockPurchased } from "./api/portfolioApi";
import { isStockPurchasedAction, purchaseStockAction, sellStockAction } from "./PortfolioSlice";
import { useNavigate } from "react-router-dom";

interface StockDataType {
    companyProfile?: StockTypes.CompanyProfile,
    yearlyPrice?: StockTypes.HistoricData[],
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
    yearlyPriceChart?: StockTypes.YearlyPriceChart
}

interface StockStateType {
    stockSymbol: string ,
    isLoading: boolean,
    data : StockDataType,
    displayStock: boolean,
    displayNoStock: boolean,
    noStockMsg: string,
    isMarketClosed: boolean,
    isWatchlisted: boolean,
    portfolio ?: Portfolio
}

interface StockFetchType {
    data: StockDataType,
    isMarketClosed: boolean,
}

const initialStockState: StockStateType = {
    stockSymbol: "",
    isLoading: false,
    displayStock: false,
    displayNoStock: false,
    noStockMsg: "",
    data: {},
    isMarketClosed: false,
    isWatchlisted: false,
}

type StockPromises = [
    Promise<StockTypes.CompanyProfile>, Promise<StockTypes.HistoricData[]>, 
    Promise<StockTypes.LatestNews[]>, Promise<StockTypes.Recommendation[]>, 
    Promise<StockTypes.CompanySentiment[]>, Promise<StockTypes.CompanyPeer[]>, 
    Promise<StockTypes.CompanyEarnings[]>] 

export const fetchStockData = createAsyncThunk(
    'stock/fetchBySymbol',
    async (symbol: string, thunkApi): Promise<StockFetchType> => {
        thunkApi.dispatch(stockSlice.actions.setStockTicker(symbol))
        try {

            const promiseArray: StockPromises
            = [    getCompanyProfile(symbol),
                    getPriceData(symbol, false),
                    getLatestNews(symbol),
                    getRecommendation(symbol),
                    getCompanySentiment(symbol),
                    getCompanyPeers(symbol),
                    getCompanyEarnings(symbol),
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
            const [companyProfile, yearlyPrice, latestNews, recommendation, companySentiments, companyPeers, companyEarnings] = await Promise.all(promiseArray)
            const recommendationChart = utilities.generateRecomChartData(recommendation)
            const companyEarningsChart = utilities.generateEPSChartData(companyEarnings)
            const yearlyPriceChart = utilities.generateYearlyPriceChart(yearlyPrice)
            try {
                const hourlyPricePromise = getQuote(symbol).then(data => {
                    quote = data
                    return getPriceData(symbol, true, quote)
                })
                var [hourlyPrice] = await Promise.all([hourlyPricePromise])
            } catch {
                var hourlyPrice = [] as StockTypes.HistoricData[]
            }
            const hourlyPriceChart = utilities.generateHourlyPriceChart(hourlyPrice)
            const data: StockDataType = {quote, companyEarningsChart, companyProfile, yearlyPrice, latestNews, recommendation, companySentiments, companyPeers, companyEarnings, recommendationChart, hourlyPrice, hourlyPriceChart, yearlyPriceChart}
            const isMarketClosed = quote.marketClosed
            return {data, isMarketClosed}
        } catch {
            thunkApi.abort();
        }
        
        return {} as StockFetchType
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
            state.noStockMsg = ""
            state.isWatchlisted = false
            state.portfolio = undefined
        },
        setPortfolio(state, action) {
            state.portfolio = action.payload
        },
        setErrEnterTicker(state) {
            state.displayNoStock = true
            state.noStockMsg = "Please enter a valid ticker."

        },
        setStockTicker(state, action) {
            state.stockSymbol = action.payload
        }

    },

    extraReducers: (builder) => {
        builder.addCase(fetchStockData.pending, (state, action) => {
            state.isLoading = true
            state.displayStock = false
            state.data = {}
            state.portfolio = undefined
        })

        builder.addCase(fetchStockData.fulfilled, (state, action) => {
            state.stockSymbol = action.payload.data.companyProfile ? action.payload.data.companyProfile.ticker : ""
            state.data = action.payload.data
            state.isLoading = false
            state.displayStock = true
            state.displayNoStock = false
            state.noStockMsg = ""
            state.isMarketClosed = action.payload.isMarketClosed
        })

        builder.addCase(fetchStockData.rejected, (state, action) => {
            state.data = {}
            state.displayStock = false
            state.isLoading = false
            state.displayNoStock = true
            state.noStockMsg = "No data found. Please enter a valid ticker"
            state.isWatchlisted = false
            state.portfolio = undefined
        })

        builder.addCase(fetchQuoteData.fulfilled, (state, action) => {
            state.data.quote = action.payload
            state.isMarketClosed = action.payload.marketClosed
        })

        // Watchlist actions

        builder.addCase(checkWatchlistedAction.pending, (state, action) => {
            state.isWatchlisted = false
        })

        builder.addCase(checkWatchlistedAction.fulfilled, (state, action) => {
            state.isWatchlisted = action.payload
        })
        
        builder.addCase(checkWatchlistedAction.rejected, (state, action) => {
            state.isWatchlisted = false
        })

        builder.addCase(addWatchlistAction.fulfilled, (state, action) => {
            state.isWatchlisted = true
        })

        builder.addCase(addWatchlistAction.rejected, (state, action) => {
            state.isWatchlisted = false
        })

        builder.addCase(removeWatchlistAction.fulfilled, (state, action) => {
            if(action.payload.stockTicker === state.data.companyProfile?.ticker)
                state.isWatchlisted = false
        })

        // Portfolio action

        builder.addCase(isStockPurchasedAction.fulfilled, (state, action) => {
            if(action.payload && Object.keys(action.payload).length > 0)
                state.portfolio = action.payload
        })

        builder.addCase(purchaseStockAction.fulfilled, (state, action) => {
            if(action.payload.portfolio.stockTicker === state.data.companyProfile?.ticker)
            state.portfolio = action.payload.portfolio
        })

        // builder.addCase(sellStockAction.fulfilled, (state, action) => {
        //     if(action.payload.portfolio.stockTicker === state.data.companyProfile?.ticker)
        //     state.portfolio = action.payload.portfolio
        // })
    }
})

export const stockActions = stockSlice.actions;

export default stockSlice;