import React from "react";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useAppSelector } from "../../../store/hooks";

const HourlyPriceChart: React.FC = () => {
    const stockTicker = useAppSelector(state=> state.stock.stockSymbol)
    const data = useAppSelector(state => state.stock.data.hourlyPriceChart)
    const isMarketClosed = useAppSelector(state => state.stock.isMarketClosed)
    var options
    if(data)
    options = {
        chart: {
          type: 'line',
          backgroundColor: "#f4f1f1"
        },
        credits: {
            enabled: false
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
        xAxis: {
            type: 'datetime',
            scrollbar: {
                enabled: true
            }
        },
        title: {
          text: `${stockTicker} Hourly Price Variation`
        },
        series: [
          {
            data: data,
            color: isMarketClosed ? "red" : "",
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