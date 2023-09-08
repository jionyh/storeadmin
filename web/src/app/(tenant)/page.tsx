import { getPaymentMethods } from "@/utils/api";

export default async function Home() {
  const payments = await getPaymentMethods();

  console.log(payments);

  return <div> Home</div>;
}
