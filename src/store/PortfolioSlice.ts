import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPortfolio, isStockPurchased, purchaseStock, sellStock } from "./api/portfolioApi";
import { Portfolio, PortfolioQuoteType, User } from "../types/PortfolioTypes";
import { appActions } from "./AppSlice";
import { stockActions } from "./StockSlice";
import { getQuote } from "./api/stockAPI";
import { Quote } from "../types/StockTypes";
import { RootState } from ".";

interface PurchaseStockType {
    portfolio: Portfolio,
    user: User,
    c: number
}

export const isStockPurchasedAction = createAsyncThunk(
    'portfolio.isStockPurchased',
    async (symbol: string) => {
        const portfolio = await isStockPurchased(symbol)
        return portfolio
    }
)

export const purchaseStockAction = createAsyncThunk(
    'portfolio/purchaseStock',
    async (payload: any, thunkApi): Promise<PurchaseStockType> => {
        const portfolioData = await purchaseStock(payload.stockTicker, payload.quantity, payload.buyingPrice, payload.companyName)
        var data: any = {...portfolioData}
        
        if(payload.getQuote) {
            var quote: Quote = await getQuote(payload.stockTicker)
            data.c = quote.c
        } else {
            data.c = 0
        }
        
        thunkApi.dispatch(appActions.setWallet(portfolioData.user.balance))
        thunkApi.dispatch(appActions.showNotification({message: `${payload.stockTicker} bought successfully.`, type: "success"}))
        if(payload.reloadAll) {
            thunkApi.dispatch(fetchPortfolioAction({showSpinner: false, resetAll: false}))
        }

        return data as PurchaseStockType
    }
)

export const sellStockAction = createAsyncThunk(
    'portfolio/sellStock',
    async(payload: any, thunkApi): Promise<PurchaseStockType> => {
        const portfolioData = await sellStock(payload.stockTicker, payload.quantity, payload.sellingPrice)
        
        var state: RootState = thunkApi.getState() as RootState
        if(state.stock.data.companyProfile?.ticker === payload.stockTicker)
        thunkApi.dispatch(stockActions.setPortfolio(portfolioData.portfolio))
    
        var data: any = {...portfolioData}
        
        if(payload.getQuote) {
            var quote: Quote = await getQuote(payload.stockTicker)
            data.c = quote.c
        } else {
            data.c = 0
        }
        
        thunkApi.dispatch(appActions.setWallet(portfolioData.user.balance))
        thunkApi.dispatch(appActions.showNotification({message: `${payload.stockTicker} sold successfully.`, type: "danger"}))
        if(payload.reloadAll) {
            thunkApi.dispatch(fetchPortfolioAction({showSpinner: false, resetAll: false}))
        }

        return data as PurchaseStockType
    }
)

export const fetchPortfolioAction = createAsyncThunk(
    'portfolio/fetchPortfolio',
    async (payload: any, thunkApi): Promise<{[key: string]: PortfolioQuoteType}> => {
        const portfolios = await fetchPortfolio()

        const quotePromises: Promise<Quote>[] = []
        portfolios.forEach(item => quotePromises.push(getQuote(item.stockTicker)))
        const quotes: Quote[] = await Promise.all(quotePromises)

        const data:{[key: string]: PortfolioQuoteType} = {}

        portfolios.map((item, index) => {
            const q = quotes[index]
            data[item.stockTicker] = {...item, c: q.c}
        })

        return data
    }
)
interface PortfolioStateType {
    isLoading: boolean,
    portfolio: {[key: string] : PortfolioQuoteType}
}

const PortfolioSlice = createSlice({
    name: 'portfolio',
    initialState: {isLoading: false, portfolio: {}} as PortfolioStateType,
    reducers: {
        addPortfolio(state, action) {
            state.portfolio[action.payload.stockTicker] = action.payload
        }
    },
    extraReducers: (builder) => {
                
        builder.addCase(purchaseStockAction.fulfilled, (state, action) => {
            state.portfolio[action.payload.portfolio.stockTicker] = {
                stockTicker: action.payload.portfolio.stockTicker,
                quantity: action.payload.portfolio.quantity,
                totalCost: action.payload.portfolio.totalCost,
                companyName: action.payload.portfolio.companyName,
                c: action.payload.c
            }
        })

        builder.addCase(sellStockAction.fulfilled, (state, action) => {
            if(action.payload.portfolio.quantity === 0 && state.portfolio.hasOwnProperty(action.payload.portfolio.stockTicker))
                delete state.portfolio[action.payload.portfolio.stockTicker]
            else {
                state.portfolio[action.payload.portfolio.stockTicker] = {
                    stockTicker: action.payload.portfolio.stockTicker,
                    quantity: action.payload.portfolio.quantity,
                    totalCost: action.payload.portfolio.totalCost,
                    companyName: action.payload.portfolio.companyName,
                    c: action.payload.c
                }
            }
        })

        builder.addCase(fetchPortfolioAction.pending, (state, action) => {
            const inputPayload: any = action.meta.arg
            state.portfolio = inputPayload.resetAll ? {} : state.portfolio
            state.isLoading = inputPayload.showSpinner !== undefined? inputPayload.showSpinner : true
        })

        builder.addCase(fetchPortfolioAction.fulfilled, (state, action) => {
            state.portfolio = action.payload
            state.isLoading = false
        })
    }
})

export const portfolioActions = PortfolioSlice.actions;

export default PortfolioSlice;
