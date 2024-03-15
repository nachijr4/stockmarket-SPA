export interface Portfolio {
    stockTicker: string,
    quantity: number,
    totalCost: number
}

export interface User {
    name: string,
    balance: number
}
export interface PortfolioApiType {
    portfolio: Portfolio,
    user: User
}