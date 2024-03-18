import React from "react";
import Highcharts from 'highcharts';
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
          backgroundColor: "#f7f7f7"
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
          text: `${companyProfile?.ticker} Hourly Price Variation`,
          style: {
            color: "grey",
            fontWeight: "500",
            fontSize: "16px",
            fontFamily: "roboto"
          }
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