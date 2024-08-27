import { Button } from '../../components/button/Button'
import { useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'

import styles from './Editor.module.css'

type PromptProps = {
  id: number
  title: string
  instruction: string
  onReturn: () => void
  onSave: (id: number, newTitle: string, newInstruction: string) => void
}

function Editor({ id, title, instruction, onSave, onReturn }: PromptProps) {
  const [editTitle, setEditTitle] = useState(title)
  const [editInstruction, setEditInstruction] = useState(instruction)

  const isModified = editTitle !== title || editInstruction !== instruction

  const handleClick = () => {
    isModified ? onSave(id, editTitle, editInstruction) : onReturn()
  }

  return (
    <div className={styles.prompt}>
      <input
        className={styles.input}
        type='text'
        value={editTitle}
        onChange={e => setEditTitle(e.target.value)}
        placeholder='Enter title'
      />
      <TextareaAutosize
        className={styles.textarea}
        value={editInstruction}
        onChange={e => setEditInstruction(e.target.value)}
        placeholder='Enter instruction'
        minRows={1}
        maxRows={27}
      />
      <Button onClick={handleClick}> {isModified ? 'Save' : 'Return'}</Button>
    </div>
  )
}

export default Editor
