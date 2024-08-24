import { Button } from '../button/Button'

import styles from './Prompt.module.css'

type PromptProps = {
  id: number
  title: string
  onClick: () => void
}

function Prompt({ title, onClick }: PromptProps) {
  return (
    <li className={styles.prompt} onClick={onClick}>
      <Button>{title}</Button>
    </li>
  )
}

export default Prompt
