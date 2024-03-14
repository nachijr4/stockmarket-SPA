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

export const getCompanyProfile = (symbol: string): Promise<StockTypes.CompanyProfile> => {
    return fetch(stockBaseUrl + `/company-profile?symbol=${symbol}`)
    .then(validateResponse)
    .then(data => data.data as Promise<StockTypes.CompanyProfile>)
    .catch(error => {
        throw new Error('Error while making company-profile request');
      });
}

export const getPriceData = (symbol: string, hourly: boolean, quote?: StockTypes.Quote): Promise<StockTypes.HistoricData[]> => {
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

    return fetch(stockBaseUrl + `/historic-data?symbol=${symbol}&timespan=${timespan}&from=${fromDate}&to=${toDate}`)
    .then(validateResponse)
    .then(data => data.data as Promise<StockTypes.HistoricData[]>)
    .catch(error => {
        throw new Error('Error while making historic-data request');
      });
}

export const getQuote = (symbol: string): Promise<StockTypes.Quote> => {
    return fetch(stockBaseUrl + `/quote?symbol=${symbol}`)
    .then(validateResponse)
    .then(data => {
        data.data.ct = new Date().getTime()
        data.data.marketClosed = isMarketClosed(data.data as StockTypes.Quote)
        return data.data  as Promise<StockTypes.Quote>
    })
    .catch(error => {
        throw new Error('Error while making quote request');
      });
}

export const getLatestNews = (symbol: string): Promise<StockTypes.LatestNews[]>=> {
    return fetch(stockBaseUrl + `/latest-news?symbol=${symbol}`)
    .then(validateResponse)
    .then(data => data.data as Promise<StockTypes.LatestNews[]>)
    .catch(error => {
        throw new Error('Error while making latest-news request');
      });
}

export const getRecommendation = (symbol: string): Promise<StockTypes.Recommendation[]>=> {
    return fetch(stockBaseUrl + `/recommendation?symbol=${symbol}`)
    .then(validateResponse)
    .then(data => data.data as Promise<StockTypes.Recommendation[]>)
    .catch(error => {
        throw new Error('Error while making recommendation request');
      });
}

export const getCompanySentiment = (symbol: string):  Promise<StockTypes.CompanySentiment[]>=> {
    return fetch(stockBaseUrl + `/company-sentiment?symbol=${symbol}`)
    .then(validateResponse)
    .then(data => data.data as Promise<StockTypes.CompanySentiment[]>)
    .catch(error => {
        throw new Error('Error while making company-sentiment request');
      });
}

export const getCompanyPeers = (symbol: string): Promise<StockTypes.CompanyPeer[]> => {
    return fetch(stockBaseUrl + `/company-peers?symbol=${symbol}`)
    .then(validateResponse)
    .then(data => data.data as Promise<StockTypes.CompanyPeer[]>)
    .catch(error => {
        throw new Error('Error while making company-peers request');
      });
}

export const getCompanyEarnings = (symbol: string): Promise<StockTypes.CompanyEarnings[]> => {
    return fetch(stockBaseUrl + `/company-earnings?symbol=${symbol}`)
    .then(validateResponse)
    .then(data => data.data as Promise<StockTypes.CompanyEarnings[]>)
    .catch(error => {
        throw new Error('Error while making company-earnings request');
      });
}