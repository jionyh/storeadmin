"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { usePayments } from "@/utils/queries/payments";

import Link from "next/link";
import { DefaultTable } from "@/components/configPage/defaultTable";


function FormasPagamento() {
  const payments = usePayments();

  const handlePaymentMethodDelete = (id:number)=>{
    console.log(`Deletando forma de pagamento ${id}`)
  }

  return (
    <div className="mb-3 w-full px-5">
      <Link className="my-5 flex items-center justify-end" href="/vendas/add">
        <Button size="sm" variant='outline'><Plus className="h-3 w-3 text-inherit"/> Adicionar Forma de Pagamento</Button>
      </Link>
      {payments.data && <DefaultTable handleDelete={handlePaymentMethodDelete} title="formas de pagamento" data={payments.data.paymentMethods}/>}
    </div>
  );
}

export default FormasPagamento;
