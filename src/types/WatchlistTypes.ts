export interface Watchlist {
    stockTicker: string,
    companyName: string
}

export interface WatchlistQuote {
    stockTicker: string,
    companyName: string,
    d: number,
    dp: number,
    c: number,
}