import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { signIn, useSession } from "next-auth/react";

const useLogin = () => {
  const router = useRouter();
  const token = useSession();
  const [hasError, setHasError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setHasError(null);
    try {
      const loginResponse = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl: `/`,
      });

      if (!loginResponse?.error) {
        if (token.data) {
          Cookies.set("token", token.data.user.login.token, { expires: 0.5 });
        }
        router.push("/");
      } else {
        setHasError(loginResponse.error);
      }
    } catch (error) {
      // Handle any errors that occur during the login process
    }
  };

  return { login, hasError };
};

export default useLogin;
