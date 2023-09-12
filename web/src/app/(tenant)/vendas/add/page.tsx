import { PageHeader } from "@/components/PageHeader";

export default function AddSales() {
  return (
    <div>
      <PageHeader name="Adicionar vendas" />
      <form className="flex w-full flex-col items-center justify-center gap-2 p-4">
        <select className="w-full appearance-none rounded p-3 shadow">
          <option disabled value="" className="text-slate-400">
            Selecione a forma de pagamento
          </option>
          <option value={1}>Cartão</option>
          <option value={2}>Dinheiro</option>
        </select>
        <input className="w-full rounded p-3 shadow" placeholder="valor" />
        <div className="my-1 w-2/3 border-t-2 border-dashed border-slate-500"></div>
        <div className="flex w-full items-center justify-end gap-1">
          <button className="rounded bg-blue-500 p-2 text-sm font-bold text-white shadow hover:bg-blue-400">
            Novo Campo
          </button>
          <button className="rounded bg-green-500 p-2 text-sm font-bold text-white shadow hover:bg-green-400">
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}
