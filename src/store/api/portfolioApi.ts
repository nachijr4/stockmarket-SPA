import { Portfolio } from "../../types/PortfolioTypes";

const portfolioBaseUrl = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL + process.env.REACT_APP_PORTFOLIO_BASE_PATH : ""

const validateResponse = (response: any) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
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