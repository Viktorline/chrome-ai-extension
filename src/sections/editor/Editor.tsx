import { Button } from '../../components/button/Button'
import { useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'

import styles from './Editor.module.css'

type PromptProps = {
  id: number
  title: string
  instruction: string
  onSave?: (id: number, newTitle: string, newInstruction: string) => void
}

function Editor({ id, title, instruction, onSave }: PromptProps) {
  const [editTitle, setEditTitle] = useState(title)
  const [editInstruction, setEditInstruction] = useState(instruction)

  const handleSave = () => {
    if (onSave) {
      onSave(id, editTitle, editInstruction)
    }
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
        maxRows={19}
      />
      <Button onClick={handleSave}>Save</Button>
    </div>
  )
}

export default Editor
