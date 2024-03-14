import { Watchlist } from "../../types/WatchlistTypes";
const watchlistBaseUrl = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL + process.env.REACT_APP_WATCHLIST_BASE_PATH : ""

const validateResponse = (response: any) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }

export const checkWatchlisted = async (symbol: string): Promise<boolean> => {
    try {
        const response = await fetch(`${watchlistBaseUrl}/watchlisted?symbol=${symbol}`);
        const data = await validateResponse(response);
        return data.data.isWatchlisted;
    } catch (e) {
        throw new Error("Error while checking watchlist");
    }
}

export const addWatchlist = async (symbol: string, companyName: string): Promise<Watchlist> => {
    try {
        const response = await fetch(`${watchlistBaseUrl}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "stockTicker": symbol, "companyName": companyName })
        });
        const data = await validateResponse(response);
        return data.data ;
    } catch (e) {
        throw new Error("Error while checking watchlist");
    }
}

export const removeWatchlist = async (symbol: string): Promise<Watchlist> => {
    try {
        const response = await fetch(`${watchlistBaseUrl}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "stockTicker": symbol})
        });
        const data = await validateResponse(response);
        return data.data ;
    } catch (e) {
        throw new Error("Error while checking watchlist");
    }
}