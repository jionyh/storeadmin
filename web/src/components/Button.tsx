'use client'
type ButtonProps = {
  children: string
  color?: 'blue' | 'red' | 'green'
  outline?: boolean
  submit?: boolean
}

export const Button = ({
  children,
  color = 'blue',
  outline = false,
  submit = false,
}: ButtonProps) => {
  const filledStyle = `bg-${color}-500 hover:bg-${color}-400 text-white`
  const outlineStyle = `border-${color}-500 border text-${color}-700 hover:bg-${color}-100`

  return (
    <button
      type={submit ? 'submit' : undefined}
      className={`w-full rounded border p-2 font-bold ${
        outline ? outlineStyle : filledStyle
      }`}
    >
      {children}
    </button>
  )
}
