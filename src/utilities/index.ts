import * as StockTypes from '../types/StockTypes'

export const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${year}:${month}:${day} ${hours}:${minutes}:${seconds}`;
  }

  export const toFixedIfNecessary = ( value: string|number | undefined, dp: number ) => {
    return +parseFloat(value as string).toFixed( dp );
  }

export const generateRecomChartData = (data: StockTypes.Recommendation[]): StockTypes.RecommendationChart => {
    const dates:string[] = [], strongSell: number[] = [], strongBuy: number[] = [], buy: number[] = [], sell: number[] = [], hold: number[] = []

    data.forEach(rec => {
        dates.push(rec.period.substring(0,7))
        strongBuy.push(rec.strongBuy)
        strongSell.push(rec.strongSell)
        buy.push(rec.buy)
        sell.push(rec.sell)
        hold.push(rec.hold)
    })
    return {dates, strongBuy, strongSell, buy, sell, hold}
}

export const generateEPSChartData = (data: StockTypes.CompanyEarnings[]): StockTypes.CompanyEarningsChart => {
    const years:number[] = [], actual: [number, number][] = [], estimate:  [number, number][] = []

    data.forEach(earning => {
        years.push(new Date(earning.period.substring(0,10)).getTime())
        actual.push([new Date(earning.period.substring(0,10)).getTime(), earning.actual])
        estimate.push([new Date(earning.period.substring(0,10)).getTime(),earning.estimate])
    });
    return {years, actual, estimate}
}

export const generateHourlyPriceChart = (data: StockTypes.HistoricData[]): StockTypes.HourlyPriceChart[] => {
    return data.map(price => [price.t, price.c])
}

export const isMarketClosed = (quote: StockTypes.Quote): boolean => {
    if(quote !== undefined) {
        const marketTime = new Date(quote.t * 1000)
        const currentTime = new Date(quote.ct * 1000)
        return ((currentTime.getTime() - marketTime.getTime()) / 1000 > 300)
    }

    return false
}