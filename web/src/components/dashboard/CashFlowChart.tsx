'use client'
import React, { useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  Title,
  LineController,
  BarController,
  plugins,
  TooltipItem,
} from 'chart.js'
import { Chart } from 'react-chartjs-2'
import colors from 'tailwindcss/colors'

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Title,
  Tooltip,
  LineController,
  BarController,
)

type Props = {
  data: {
    month: string
    inflow: string
    outflow: string
  }[]
}

export const CashflowChart = ({ data }: Props) => {
  const [chart, setChart] = useState<any[]>()
  const [labels, setLabels] = useState<string[]>([])
  const [inflow, setInflow] = useState<number[]>([])
  const [outflow, setOutflow] = useState<number[]>([])
  const [netflow, setNetflow] = useState<number[]>([])

  useEffect(() => {
    if (chart) {
      setLabels(chart.map((item) => item.month))
      setInflow(chart.map((item) => parseFloat(item.inflow)))
      setOutflow(chart.map((item) => parseFloat(item.outflow) * -1))
      setNetflow(
        chart.map(
          (item) => parseFloat(item.outflow) * -1 + parseFloat(item.inflow),
        ),
      )
    }
  }, [chart])

  useEffect(() => {
    if (data && !chart) {
      setChart(data)
    }
  }, [data])

  const chartData = {
    labels,
    datasets: [
      {
        type: 'line' as const,
        label: 'Saldo',
        fill: false,
        borderColor: colors.gray[500],
        borderWidth: 2,
        borderDash: [2, 2],
        data: netflow,
      },
      {
        type: 'bar' as const,
        label: 'Recebimentos',
        backgroundColor: colors.blue[400],
        data: inflow,
        stack: 'combined',
      },
      {
        type: 'bar' as const,
        label: 'Pagamentos',
        backgroundColor: colors.red[400],
        data: outflow,
        stack: 'combined',
      },
    ],
  }

  const config = {
    options: {
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Fluxo de Caixa',
        },
        legend: {
          display: false,
        },
        tooltip: {
          displayColors: false,
          callbacks: {
            title: function () {
              return ''
            },
            label: function (context: TooltipItem<'line' | 'bar'>) {
              let label = context.dataset.label || ''

              if (label) {
                label += ': '
              }
              if (context.parsed.y !== null) {
                label += `€ ${context.parsed.y.toFixed(2)}`
              }
              return label
            },
          },
        },
      },
      scales: {},
    },
  }

  return (
    <div className="flex h-60 w-full">
      <Chart type="bar" data={chartData} options={config.options} />
    </div>
  )
}
