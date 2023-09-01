"use client";

import { SaleResponse, SingleSaleResponse } from "@/types/saleTypes";
import { getSale } from "@/utils/api";

import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<SingleSaleResponse | null>(null);

  useEffect(() => {
    const res = getSale(2);
    console.log(res);
  }, []);

  return (
    <main className="m-auto h-screen w-[425px] min-w-[375px] border-2 border-red-500">
      <h1 className="w-full border-2 border-green-700">oi</h1>
      <button className="m-2 w-4/12 border bg-blue-500 p-2 text-white">
        Clique aqui
      </button>
    </main>
  );
}
