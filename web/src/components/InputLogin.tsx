/* eslint-disable react/display-name */
import React, { useState } from 'react'
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs'
import { Input as InputField } from '@/components/ui/input'
import { Eye, EyeOff } from 'lucide-react'

type InputProps = {
  placeholder?: string
  password?: boolean
}
export const InputLogin = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const { placeholder, password = false } = props
    const [showPassword, setShowPassword] = useState(false)
    return (
      <div className="relative flex w-full items-center">
        <InputField
          ref={ref}
          type={password && !showPassword ? 'password' : 'text'}
          placeholder={placeholder}
        />
        {password && (
          <div
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-2 cursor-pointer text-muted-foreground"
          >
            {showPassword ? (
              <Eye className="h-4 w-4" />
            ) : (
              <EyeOff className="h-4 w-4" />
            )}
          </div>
        )}
      </div>
    )
  },
)
