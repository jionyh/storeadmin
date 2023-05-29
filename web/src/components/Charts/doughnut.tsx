import { Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Colors,
  ChartOptions,
  TooltipItem,
  Title,
} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend, Colors, Title)

type Props = {
  data: {
    category: string
    labels: string[]
    data: any
  }
}

export const DoughnutChart = ({ data }: Props) => {
  const optionChart: ChartOptions<'doughnut'> = {
    plugins: {
      title: {
        display: true,
        text: data.category,
        position: 'top',
        align: 'center',
        font: {
          size: 20,
        },
      },
      colors: {
        enabled: true,
        forceOverride: true,
      },
      tooltip: {
        displayColors: false,
        callbacks: {
          label: function (tooltipItem: TooltipItem<'doughnut'>): string {
            const value = tooltipItem.dataset.data[tooltipItem.dataIndex]
            // const label = tooltipItem.dataset.label
            return `€ ${value.toFixed(2)}`
          },
        },
      },
    },
  }

  const dataChart = {
    labels: data.labels,
    datasets: [
      {
        data: data.data,
        borderWidth: 1,
      },
    ],
  }

  return (
    <>
      {data.data.length === 0 && <h1>Não há dados para exibir!</h1>}
      {data.data.length > 0 && (
        <Doughnut
          options={optionChart}
          data={dataChart}
          // {...props}
        />
      )}
    </>
  )
}
