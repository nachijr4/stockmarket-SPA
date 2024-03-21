import React, {useState, useEffect} from 'react'
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import highchartsVolumeByPrice from "highcharts/indicators/volume-by-price";
import highchartsIndicators from "highcharts/indicators/indicators";
import { useAppSelector } from '../../store/hooks';

const Charts: React.FC = () => {

    const data = useAppSelector(state => state.stock.data.yearlyPriceChart)
    const companyProfile = useAppSelector(state => state.stock.data.companyProfile)

    highchartsIndicators(Highcharts);
    highchartsVolumeByPrice(Highcharts);
    var groupingUnits: Object =  [[
        'week',
        [1]
    ], [
        'month',
        [1, 2, 3, 4, 6]
    ]];

    const options = {
        chart: {
            // height:  (9/16)*100 + '%',
            height: "600px",
            backgroundColor: '#f7f7f7',
        },
        title: {
            text: `${companyProfile?.ticker} Historical`,
            style: {
                // color: "grey",
                fontWeight: "500",
                fontSize: "16px",
                fontFamily: "roboto"
              }
        },

        subtitle: {
            text: 'With SMA and Volume by Price technical indicators'
        },
        xAxis: {
            type: 'datetime'
        },
        yAxis: [{
            opposite: true,
            startOnTick: false,
            endOnTick: false,
            labels: {
                align: 'right',
                x: -3
            },
            title: {
                text: 'OHLC'
            },
            height: '60%',
            lineWidth: 2,
            resize: {
                enabled: true
            }
        }, {
            opposite: true,
            labels: {
                align: 'right',
                x: -3
            },
            title: {
                text: 'Volume'
            },
            top: '65%',
            height: '35%',
            offset: 0,
            lineWidth: 2
        }],

        tooltip: {
            split: true
        },

        plotOptions: {
            series: {
                dataGrouping: {
                    units: groupingUnits
                }
            },
            column: {
                pointWidth: 5,
                pointPlacement: "on",
                pointInterval: 1
            }
        },
        navigator: {
            enabled: true
        },
        rangeSelector: {
            allButtonsEnabled: true,
            enabled: true,
            buttons: [{
                type: 'month',
                count: 1,
                text: '1m',
                title: 'View 1 month'
            }, {
                type: 'month',
                count: 3,
                text: '3m',
                title: 'View 3 months'
            }, {
                type: 'month',
                count: 6,
                text: '6m',
                title: 'View 6 months'
            }, {
                type: 'ytd',
                text: 'YTD',
                title: 'View year to date'
            }, {
                type: 'year',
                count: 1,
                text: '1y',
                title: 'View 1 year'
            }, {
                type: 'all',
                text: 'All',
                title: 'View all'
            }],
            selected: 2
        },

        series: [{
            type: 'candlestick',
            name: companyProfile?.ticker,
            id: companyProfile?.ticker,
            zIndex: 2,
            data: data?.ohlc
        }, {
            type: 'column',
            name: 'Volume',
            id: 'volume',
            data: data?.volume,
            yAxis: 1
        }, {
            type: 'vbp',
            linkedTo: companyProfile?.ticker,
            params: {
                volumeSeriesID: 'volume'
            },
            dataLabels: {
                enabled: false
            },
            zoneLines: {
                enabled: false
            }
        }, {
            type: 'sma',
            linkedTo: companyProfile?.ticker,
            zIndex: 1,
            marker: {
                enabled: false
            }
        }]
    }
    return (
        <div style={{height: "600px"}}>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    )
}

export default Charts