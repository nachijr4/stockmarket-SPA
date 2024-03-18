export interface Portfolio {
    stockTicker: string,
    quantity: number,
    totalCost: number,
    companyName: string
}

export interface User {
    name: string,
    balance: number
}
export interface PortfolioApiType {
    portfolio: Portfolio,
    user: User
}

export interface PortfolioQuoteType {
    stockTicker: string,
    quantity: number,
    totalCost: number,
    companyName: string,
    c: number
}