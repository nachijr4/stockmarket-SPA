import { Portfolio, PortfolioApiType } from "../../types/PortfolioTypes";
import axios from "axios";

const portfolioBaseUrl = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL + process.env.REACT_APP_PORTFOLIO_BASE_PATH : ""

const validateResponse = (response: any) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }

  function validateAxiosResponse(response: any) {
    if (response.status === 200 || response.status === 201) {
        return response.data;
    } else {
        throw new Error(`Request failed with status ${response.status}`);
    }
}

export const isStockPurchased = async (symbol: string): Promise<Portfolio> => {
    try {
        const response = await fetch(`${portfolioBaseUrl}/${symbol}`);
        const data = await validateResponse(response);
        return data.data;
    } catch (e) {
        throw new Error("Error while checking watchlist");
    }
}

export const purchaseStock = async(symbol: string, quantity: number, buyingPrice: number): Promise<PortfolioApiType> => {
    try {
        const payload = {stockTicker: symbol, quantity, buyingPrice}
        const response = await axios.post(portfolioBaseUrl + "/buy", payload)
        const data =  validateAxiosResponse(response)
        return data.data
    } catch (e) {
        throw new Error("Error while buying portfolio")
    }
}

export const sellStock = async(symbol: string, quantity: number, sellingPrice: number): Promise<PortfolioApiType> => {
    try {
        const payload = {stockTicker: symbol, quantity, sellingPrice}
        const response = await axios.post(portfolioBaseUrl + "/sell", payload)
        const data =  validateAxiosResponse(response)
        return data.data
    } catch (e) {
        throw new Error("Error while buying portfolio")
    }
}