type Props = {
  data: { month: string; inflow: string; outflow: string }[]
}
export const CashflowChart = async ({ data }: Props) => {
  return (
    <>
      <ul className="w-full">
        <li className="flex justify-between font-bold">
          <span className="flex-1 text-left">Mês</span>
          <span className="flex-1 text-left">Entrada</span>
          <span className="flex-1 text-left">Saida</span>
        </li>
        {data.map((item, i) => (
          <li key={i} className="flex justify-between">
            <span className="flex-1 text-left">{item.month}</span>
            <span className="flex-1 text-left">{item.inflow}</span>
            <span className="flex-1 text-left">{item.outflow}</span>
          </li>
        ))}
      </ul>
    </>
  )
}
