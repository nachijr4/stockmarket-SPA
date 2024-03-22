import { current } from '@reduxjs/toolkit';
import * as StockTypes from '../../types/StockTypes'
import { isMarketClosed } from '../../utilities';

const stockBaseUrl = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL + process.env.REACT_APP_STOCK_BASE_PATH : ""

const validateResponse = (response: any) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }

export const getCompanyProfile = async (symbol: string): Promise<StockTypes.CompanyProfile> => {
    try {
        const response = await fetch(stockBaseUrl + `/company-profile?symbol=${symbol}`);
        const data = await validateResponse(response);
        return await (data.data as Promise<StockTypes.CompanyProfile>);
    } catch (error) {
        throw new Error('Error while making company-profile request');
    }
}

export const getPriceData = async (symbol: string, hourly: boolean, quote?: StockTypes.Quote): Promise<StockTypes.HistoricData[]> => {
    var timespan: string = "hour"
    var currentDate = new Date();

    if(hourly && quote)
        var currentDate = new Date(quote.t * 1000);
    var year = currentDate.getFullYear();
    var month = String(currentDate.getMonth() + 1).padStart(2, '0');
    var day = String(currentDate.getDate()).padStart(2, '0');

    const toDate = `${year}-${month}-${day}`;

    if(!hourly) {
        currentDate.setFullYear(currentDate.getFullYear() - 2);
        timespan = "day"
    } else {
        currentDate.setDate(currentDate.getDate() - 1);
    }



    year = currentDate.getFullYear();
    month = String(currentDate.getMonth() + 1).padStart(2, '0');
    day = String(currentDate.getDate()).padStart(2, '0');

    const fromDate = `${year}-${month}-${day}`

    try {
        const response = await fetch(stockBaseUrl + `/historic-data?symbol=${symbol}&timespan=${timespan}&from=${fromDate}&to=${toDate}`);
        const data = await validateResponse(response);
        return await (data.data as Promise<StockTypes.HistoricData[]>);
    } catch (error) {
        throw new Error('Error while making historic-data request');
    }
}

export const getQuote = async (symbol: string): Promise<StockTypes.Quote> => {
    try {
        const response = await fetch(stockBaseUrl + `/quote?symbol=${symbol}`);
        const data = await validateResponse(response);
        data.data.ct = new Date().getTime();
        data.data.marketClosed = isMarketClosed(data.data as StockTypes.Quote);
        return await (data.data as Promise<StockTypes.Quote>);
    } catch (error) {
        throw new Error('Error while making quote request');
    }
}

export const getLatestNews = async (symbol: string): Promise<StockTypes.LatestNews[]>=> {
    try {
        const response = await fetch(stockBaseUrl + `/latest-news?symbol=${symbol}`);
        const data = await validateResponse(response);
        return await (data.data as Promise<StockTypes.LatestNews[]>);
    } catch (error) {
        throw new Error('Error while making latest-news request');
    }
}

export const getRecommendation = async (symbol: string): Promise<StockTypes.Recommendation[]>=> {
    try {
        const response = await fetch(stockBaseUrl + `/recommendation?symbol=${symbol}`);
        const data = await validateResponse(response);
        return await (data.data as Promise<StockTypes.Recommendation[]>);
    } catch (error) {
        throw new Error('Error while making recommendation request');
    }
}

export const getCompanySentiment = async (symbol: string):  Promise<StockTypes.CompanySentiment[]>=> {
    try {
        const response = await fetch(stockBaseUrl + `/company-sentiment?symbol=${symbol}`);
        const data = await validateResponse(response);
        return await (data.data as Promise<StockTypes.CompanySentiment[]>);
    } catch (error) {
        throw new Error('Error while making company-sentiment request');
    }
}

export const getCompanyPeers = async (symbol: string): Promise<StockTypes.CompanyPeer[]> => {
    try {
        const response = await fetch(stockBaseUrl + `/company-peers?symbol=${symbol}`);
        const data = await validateResponse(response);
        return await (data.data as Promise<StockTypes.CompanyPeer[]>);
    } catch (error) {
        throw new Error('Error while making company-peers request');
    }
}

export const getCompanyEarnings = async (symbol: string): Promise<StockTypes.CompanyEarnings[]> => {
    try {
        const response = await fetch(stockBaseUrl + `/company-earnings?symbol=${symbol}`);
        const data = await validateResponse(response);
        return await (data.data as Promise<StockTypes.CompanyEarnings[]>);
    } catch (error) {
        throw new Error('Error while making company-earnings request');
    }
}