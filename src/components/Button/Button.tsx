import { PropsWithChildren } from 'react'

export const Button = ({children}: PropsWithChildren) =>
  <button className="px-2 py-1 font-semibold text-white text-xs bg-blue-400 rounded-md hover:bg-blue-500">
    {children}
  </button>