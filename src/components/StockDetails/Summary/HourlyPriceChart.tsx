import React, { useEffect } from "react";
import Highcharts from 'highcharts/highstock';
// import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useAppSelector } from "../../../store/hooks";

const HourlyPriceChart: React.FC = () => {
    const companyProfile = useAppSelector(state=> state.stock.data.companyProfile)
    const data = useAppSelector(state => state.stock.data.hourlyPriceChart)
    const isMarketClosed = useAppSelector(state => state.stock.isMarketClosed)

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
            format: `<span style="color:{color}">\u25CF</span> {series.name}: <b>{y} </b> `
        },
        series: [
          {
            data: data,
            name: companyProfile?.ticker,
            color: isMarketClosed ? "red" : "",
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