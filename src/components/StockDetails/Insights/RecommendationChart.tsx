import React from 'react'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts/highstock';
import { useAppSelector } from '../../../store/hooks';

const RecommendationChart: React.FC = () => {

    const data = useAppSelector(state => state.stock.data.recommendationChart)
    var options
    if(data)
     options = {
        chart: {
            type: 'column',
            backgroundColor: "#f4f1f1",
            spacingBottom: 50
        },
        credits: {
            enabled: false
        },
        title: {
            text: 'Recommendation Trends',
            align: 'center'
        },
        xAxis: {
            categories: data['dates']
        },
        yAxis: {
            min: 0,
            title: {
                text: '#Analysis'
            },
            stackLabels: {
                enabled: false
            }
        },
        legend: {
            y: 40,
            align: "center",
            verticalAlign: 'bottom',
            floating: true,
            shadow: false,
            // width: 300
        },
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 350
                },
                chartOptions: {
                    legend: {
                        x: 45,
                        y: 40,
                        align: "center",
                        verticalAlign: 'bottom',
                        width: 300
                    },
                    chart: {
                        marginBottom: 110,
                    },
                }
            }]
        },
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true
                }
            }
        },
        
        series: [{
            name: 'StrongBuy',
            data: data['strongBuy'],
            color: "#1a6536"
        }, {
            name: 'Buy',
            data: data['buy'],
            color: "#1a9c46"
        }, {
            name: 'Hold',
            data: data['hold'],
            color: "#8e6a1a"
        }, {
            name: 'Sell',
            data: data['sell'],
            color: "#9f3a3b"
        }, {
            name: 'StrongSell',
            data: data['strongSell'],
            color: "#552122"
        }
    ]
    }

    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    )
}

export default RecommendationChart;