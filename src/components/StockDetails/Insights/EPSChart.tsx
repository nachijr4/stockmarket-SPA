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
                reversed: false,
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