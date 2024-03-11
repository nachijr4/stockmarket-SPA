import * as StockTypes from '../../types/StockTypes'

const stockBaseUrl = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL + process.env.REACT_APP_STOCK_BASE_PATH : ""

const validateResponse = (response: any) => {
    if (!response.ok) {
      // If the response is not ok, throw an error
      throw new Error('Network response was not ok');
    }
    return response.json(); // Parse the response body as JSON
  }

export const getCompanyProfile = (symbol: string): Promise<StockTypes.CompanyProfile> => {
    return fetch(stockBaseUrl + `/company-profile?symbol=${symbol}`)
    .then(validateResponse)
    .then(data => data.data as Promise<StockTypes.CompanyProfile>)
    .catch(error => {
        throw new Error('Error while making company-profile request');
      });
}

export const getHistoricData = (symbol: string): Promise<StockTypes.HistoricData[]> => {
    return fetch(stockBaseUrl + `/historic-data?symbol=${symbol}`)
    .then(validateResponse)
    .then(data => data.data as Promise<StockTypes.HistoricData[]>)
    .catch(error => {
        throw new Error('Error while making historic-data request');
      });
}

export const getQuote = (symbol: string): Promise<StockTypes.Quote> => {
    return fetch(stockBaseUrl + `/quote?symbol=${symbol}`)
    .then(validateResponse)
    .then(data => data.data  as Promise<StockTypes.Quote>)
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

export const getCompanySentiment = (symbol: string):  Promise<StockTypes.CompanySentiment>=> {
    return fetch(stockBaseUrl + `/company-sentiment?symbol=${symbol}`)
    .then(validateResponse)
    .then(data => data.data as Promise<StockTypes.CompanySentiment>)
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
