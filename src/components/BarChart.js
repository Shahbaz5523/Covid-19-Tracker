import React from 'react'
import { Bar } from 'react-chartjs-2';

export default function BarChart(props) {

    const data = {
        labels: ['Infected' , 'Recovered' , 'Deaths'],
        datasets: [
            {
                label: '# of Cases',
                data: [props.barData.infected , props.barData.recoverd , props.barData.deths],
                backgroundColor: [
                    'rgba(63,81,181,0.5)',
                    'rgba(50,205,50,0.5)',
                    'rgba(246, 36, 89, 0.5)',
                ],
                borderColor: [
                    'rgba(63,81,181,1)',
                    'rgba(50,205,50,1)',
                    'rgba(246, 36, 89, 1)',
                ],
                borderWidth: 1,
            },
        ],
    }
    
    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    }

    return (
        <Bar style={{width:'100%'}} data={data} options={options} />
    )
}
