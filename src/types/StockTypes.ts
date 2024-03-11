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
    o: string,
    h: string,
    l: string,
    c: string,
    pc: string,
    d: string,
    dp: string
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
    buy: string,
    hold: string,
    period: string,
    sell: string,
    strongBuy: string,
    stringSell: string
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
    actual: string,
    estimate: string,
    surprise: string,
    surprisePercent: string,
    period: string,
    symbol: string,
    year: number,
    quater: number
}