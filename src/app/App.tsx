import Header from '../sections/header/Header'
import Main from '../sections/main/Main'
import { usePromptStore } from '../store/usePromptStore'
import { useEffect, useState } from 'react'

import styles from './App.module.css'

export type Pages = 'Prompts' | 'Settings' | 'Editor'

export type PromptOwn = {
  id: number
  title: string
  instruction: string
}

const EMPTY_PROMPT = { id: -1, title: '', instruction: '' }

function App() {
  const { prompts, addPrompt, loadPrompts, updatePrompt, deletePrompt } =
    usePromptStore()

  const clearPrompts = prompts.filter(prompt => prompt.title.trim() !== '')

  const [activeSection, setActiveSection] = useState<Pages>('Prompts')
  const [selectedPrompt, setSelectedPrompt] = useState<PromptOwn | null>(
    EMPTY_PROMPT
  )

  useEffect(() => {
    loadPrompts()
  }, [loadPrompts])

  const handleMenuClick = (page: Pages) => {
    setActiveSection(page)
  }

  const handleSave = (id: number, newTitle: string, newInstruction: string) => {
    if (newTitle.trim() && newInstruction.trim()) {
      updatePrompt(id, { id, title: newTitle, instruction: newInstruction })
    } else {
      deletePrompt(id)
    }
    setActiveSection('Prompts')
  }

  const handleNewPrompt = () => {
    const newId = Date.now()
    const newPrompt = { id: newId, title: '', instruction: '' }
    addPrompt(newPrompt)
    setSelectedPrompt(newPrompt)
    setActiveSection('Editor')
  }

  const handlePromptClick = (prompt: PromptOwn) => {
    setSelectedPrompt(prompt)
    setActiveSection('Editor')
  }

  const handleDeletePrompt = () => {
    if (selectedPrompt) {
      deletePrompt(selectedPrompt.id)
      setSelectedPrompt(EMPTY_PROMPT)
      setActiveSection('Prompts')
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Header
          onMenuClick={handleMenuClick}
          onNewPrompt={handleNewPrompt}
          onDeletePrompt={handleDeletePrompt}
          activeSection={activeSection}
        />
        <Main
          promptsData={clearPrompts}
          activeSection={activeSection}
          selectedPrompt={selectedPrompt}
          onPromptClick={handlePromptClick}
          onSave={handleSave}
        />
      </div>
    </div>
  )
}

export default App
