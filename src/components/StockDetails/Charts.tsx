import React, {useState, useEffect} from 'react'
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import highchartsVolumeByPrice from "highcharts/indicators/volume-by-price";
import highchartsIndicators from "highcharts/indicators/indicators";
import { useAppSelector } from '../../store/hooks';

const Charts: React.FC = () => {

    const data = useAppSelector(state => state.stock.data.yearlyPriceChart)
    const stockTicker = useAppSelector(state => state.stock.stockSymbol)

    highchartsIndicators(Highcharts);
    highchartsVolumeByPrice(Highcharts);
    var groupingUnits: Object =  [
        ['day', [1]],
        [
        'week',
        [1]
    ], 
    [
        'month',
        [1]
    ]
];

    const options = {
        chart: {
            height: "600px",
            backgroundColor: '#f7f7f7',
        },
        title: {
            text: `${stockTicker} Historical`,
            style: {
                fontWeight: "500",
                fontSize: "16px",
                fontFamily: "roboto"
              }
        },

        subtitle: {
            text: 'With SMA and Volume by Price technical indicators'
        },
        xAxis: {
            type: 'datetime',
            ordinal: true,
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
                dataGrouping: {
                    enabled: true,
                    units: groupingUnits
                },
                groupPadding: 0.1,
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
            name: stockTicker,
            id: stockTicker,
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
            linkedTo: stockTicker,
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
            linkedTo: stockTicker,
            zIndex: 1,
            marker: {
                enabled: false
            }
        }]
    }
    return (
        <div style={{height: "600px"}}>
          {data && <HighchartsReact highcharts={Highcharts} options={
            {
                chart: {
                    height: "600px",
                    backgroundColor: '#f7f7f7',
                },
                title: {
                    text: `${stockTicker} Historical`,
                    style: {
                        fontWeight: "500",
                        fontSize: "16px",
                        fontFamily: "roboto"
                      }
                },
        
                subtitle: {
                    text: 'With SMA and Volume by Price technical indicators'
                },
                xAxis: {
                    type: 'datetime',
                    ordinal: true,
                    crosshair: {
                        width: 1
                    }
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
                    split: true,
                },
        
                plotOptions: {
                    series: {
                        dataGrouping: {
                            enabled: true,
                            units: groupingUnits
                        }
                    },
                    column: {
                        dataGrouping: {
                            enabled: true,
                            units: groupingUnits
                        },
                        // groupPadding: 0.1,
                    }
                },
                navigator: {
                    enabled: true
                },
                scrollbar: {
                    enabled: true
                },
                rangeSelector: {
                    // allButtonsEnabled: true,
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
                    name: stockTicker,
                    id: stockTicker,
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
                    linkedTo: stockTicker,
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
                    linkedTo: stockTicker,
                    zIndex: 1,
                    marker: {
                        enabled: false
                    }
                }]
            }
          } />}
        </div>
    )
}

export default React.memo(Charts)