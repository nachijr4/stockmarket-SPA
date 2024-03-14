export interface CompanyProfile {
    country: string, 
    currency: string, 
    exchange: string,
    name: string,
    ticker: string,
    ipo: string,
    marketCapitalization: string,
    shareOutstanding: string,
    logo: string,
    phone: string,
    weburl: string,
    finnhubIndustry: string
}

export interface HistoricData {
    v: number,
    vw: number,
    o: number,
    c: number,
    h: number,
    l: number,
    t: number,
    n: number
}

export interface Quote {
    o: number,
    h: number,
    l: number,
    c: number,
    pc: number,
    d: number,
    dp: number,
    t: number,
    ct: number,
    marketClosed: boolean
}

export interface LatestNews {
    category: string,
    datetime: EpochTimeStamp,
    headline: string,
    id: string,
    image: string,
    related: string,
    source: string,
    summary: string,
    url: string
}

export interface Recommendation {
    symbol: string,
    buy: number,
    hold: number,
    period: string,
    sell: number,
    strongBuy: number,
    strongSell: number
}

export interface RecommendationChart {
    dates: string[], 
    strongBuy: number[], 
    strongSell: number[], 
    buy: number[], 
    sell: number[], 
    hold: number[]
}

export interface CompanySentiment {
    symbol: string,
    year: number,
    month: number,
    change: number,
    mspr: number
}

export type CompanyPeer = string

export interface CompanyEarnings {
    actual: number,
    estimate: number,
    surprise: string,
    surprisePercent: string,
    period: string,
    symbol: string,
    year: number,
    quater: number
}

export interface CompanyEarningsChart {
    years: number[],
    actual: [number, number][],
    estimate: [number, number][]
}

export type HourlyPriceChart = [number, number]