import React, { useEffect } from "react";
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { useAppSelector } from "../../../store/hooks";

const HourlyPriceChart: React.FC = () => {
    const companyProfile = useAppSelector(state=> state.stock.data.companyProfile)
    const data = useAppSelector(state => state.stock.data.hourlyPriceChart)
    // const isMarketClosed = useAppSelector(state => state.stock.isMarketClosed)
    const quote = useAppSelector(state=> state.stock.data.quote)

    var chartColor
    if(quote)
        chartColor = quote.d > 0 ? "green" : quote.d < 0 ? "red" : ""

    var options
    if(data)
    options = {
        chart: {
          type: 'line',
          backgroundColor: "#f7f7f7",
          height: "300px"
        },
        legend: {
            enabled: false
        },
        yAxis: {
            opposite: true,
            title: "",
            labels: {
                x: -15,
                y: -5
            }
        },
        scrollbar: {
            enabled: true
        },
        xAxis: {
            type: 'datetime',
        },
        title: {
          text: `${companyProfile?.ticker} Hourly Price Variation`,
          style: {
            color: "grey",
            fontWeight: "500",
            fontSize: "16px",
            fontFamily: "roboto"
          }
        },
        tooltip: {
            split: true,
            formatter: function (this: Highcharts.TooltipFormatterContextObject) {
                const date = Highcharts.dateFormat('%A, %e %b, %H:%M', this.x as number);
                return [
                    `<span>${date}</span>`,
                    `<span style="color:${this.color}">\u25CF</span> ${this.series.name}: <b>${this.y} </b> `
                ]
            }
        },
        series: [
          {
            data: data,
            name: companyProfile?.ticker,
            color: chartColor,
            tooltip: {
                valueDecimals: 2
            },
            marker: {
                enabled: false,
                states: {
                    hover: {
                        enabled: true
                    }
                }
            } 
          }
        ]
      };

      return (
        <div>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
      )
}

export default React.memo<React.FC>(HourlyPriceChart)