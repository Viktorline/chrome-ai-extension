import { Button } from '../button/Button'
import React from 'react'

import './Prompt.css'

type PromptProps = {
  id: number
  title: string
  onClick: () => void
}

function Prompt({ title, onClick }: PromptProps) {
  return (
    <li className='prompt' onClick={onClick}>
      <Button>{title}</Button>
    </li>
  )
}

export default Prompt
