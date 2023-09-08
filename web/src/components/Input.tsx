import React, { useState } from "react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

type InputProps = {
  placeholder?: string;
  password?: boolean;
};
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const { placeholder, password = false } = props;
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="relative flex w-full items-center">
        <input
          ref={ref}
          className="w-full rounded border p-2 shadow-sm focus:outline-none"
          type={password && !showPassword ? "password" : "text"}
          placeholder={placeholder}
        />
        {password && (
          <div
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-2 cursor-pointer text-2xl text-slate-400"
          >
            {showPassword ? <BsEyeFill /> : <BsEyeSlashFill />}
          </div>
        )}
      </div>
    );
  },
);
