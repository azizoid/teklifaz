import { PropsWithChildren } from 'react'

type ButtonTypes = 'button' | 'text'

type ButtonProps = {
  type: ButtonTypes
}

const classes: Record<ButtonTypes, string> = {
  button: 'px-2 text-white text-xs bg-blue-400 rounded-md hover:bg-blue-500',
  text: 'px-1 text-xs'
}

export const Button = ({type = 'button', children}: PropsWithChildren<ButtonProps>) =>
  <button className={`py-1 font-semibold ${classes[type]}`}>
    {children}
  </button>