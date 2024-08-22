import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

export function Button({}: ButtonProps) {
  return (
    <>
      <input />
    </>
  )
}
