import Link from "next/link";
import { ReactElement, ReactNode } from "react";

type Params = {
  children?: ReactNode | ReactElement;
  href?: string;
};
export const MenuList = ({ children, href = "/" }: Params) => {
  return (
    <Link href={href}>
      <li className="flex w-full cursor-pointer items-center gap-3 px-4 text-red-500 hover:bg-red-100">
        {children}
      </li>
    </Link>
  );
};
