import React from 'react'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts/highstock';
// import Highcharts from 'highcharts';
import { useAppSelector } from '../../../store/hooks';

const EPSChart:React.FC = () => {

    const data = useAppSelector(state => state.stock.data.companyEarningsChart)
    const surprise: any = {}

    var options

    if(data) {

        data.years.forEach((value, index) => {
            surprise[value] = (data.actual[index][1] - data.estimate[index][1]).toFixed(4)
        })

        options = {
            chart: {
                type: 'spline',
                backgroundColor: "#f4f1f1"
            },
            credits: {
                enabled: false
            },
            title: {
                text: 'Historical EPS Surprises',
                align: 'center'
            },
            xAxis: {
                reversed: true,
                minPadding: 0.15,
                maxPadding: 0.15,
                endOnTick: false,
                tickWidth: 0,
                type: 'datetime',
                tickPositions: data.years,
                labels: {
                    formatter: function (this: Highcharts.AxisLabelsFormatterContextObject) {
                        var date = Highcharts.dateFormat('%Y-%m-%d', this.value as number)
                        return `${date} <br /> Surprise: ${surprise[this.value]}`
                    }
                }       
            },
            yAxis: {
                title: {
                    text: 'Quaterly EPS'
                }
            },
            legend: {
                enabled: true
            },
            plotOptions: {
                spline: {
                    marker: {
                        enable: false
                    }
                }
            },
            tooltip: {
                shared: true,
                useHtml: true,
                formatter: function (this: Highcharts.TooltipFormatterContextObject) {
                    var date = Highcharts.dateFormat('%Y-%m-%d', this.x as number)
                    var string = ""
                    if (this.points)
                        string =  `<b>Date: ${date}</b> <hr />
                        <br/> 
                        &nbsp; Surprise: ${surprise[this.x as number]}
                        <br /><span style="color:${this.points[0].color}">\u25CF</span> Actual: ${this.points[0].y} 
                        <br /><span style="color:${this.points[1].color}">\u25CF</span> Estimate: ${this.points?this.points[1].y:""}`
                        
                        return string
                },
            },
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 350
                    },
                    chartOptions: {
                        xAxis: {
                            labels: {
                                rotation: -45,
                                style: {
                                    fontSize: '13px'
                                }
                            }
                        }
                    }
                }]
            },
            series: [{
                name: 'Actual',
                data: data.actual
            },
            {
                name: 'Estimate',
                data: data.estimate
            }]
        }
    }

    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    )
}

export default EPSChart