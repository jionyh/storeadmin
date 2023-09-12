import { getPaymentMethods } from "@/utils/api";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";

export default async function Home() {
  const login = await getServerSession();
  console.log(login);
  return <div> Home</div>;
}
