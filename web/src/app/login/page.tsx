"use client";
import React, { useRef, useState } from "react";
import Logo from "@/assets/logo.svg";
import Image from "next/image";
import Cookies from "js-cookie";
import { getLogin } from "@/utils/api";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { useRouter } from "next/navigation";

export default function Login() {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [hasError, setHasError] = useState<string | null>(null);
  const router = useRouter();

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setHasError(null);
    e.preventDefault();
    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    const userData = { email, password };

    const login = await getLogin(userData);

    if (login.success) {
      Cookies.set("token", login.token, { expires: 0.5 });
      router.push("/");
      return;
    } else {
      setHasError(login.error);
    }
  };

  return (
    <div className="mx-10 my-36 rounded-lg  bg-white font-light text-slate-600 shadow-xl placeholder:text-slate-300">
      <div className="flex flex-col items-center justify-center p-7">
        <Image src={Logo} alt="" />
        <form
          onSubmit={handleFormSubmit}
          className="my-11 flex w-full flex-col items-center justify-center gap-5"
        >
          <Input ref={emailRef} placeholder="Digite o email" />
          <Input ref={passwordRef} placeholder="Digite a senha" password />
          {hasError && (
            <p className="w-full rounded bg-red-100 p-3 text-center font-bold text-red-500">
              {hasError}
            </p>
          )}
          <Button submit>Fazer login</Button>
        </form>
        <div className="flex w-full flex-col items-end justify-center gap-2 border-t-2">
          <p className="text-bold mt-2 text-right">Esqueceu a senha?</p>
          <Button color="red">Recuperar</Button>
        </div>
      </div>
    </div>
  );
}
