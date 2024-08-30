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

function App() {
  const { prompts, addPrompt, loadPrompts, updatePrompt, deletePrompt } =
    usePromptStore()
  const [activeSection, setActiveSection] = useState<Pages>('Prompts')
  const [selectedPrompt, setSelectedPrompt] = useState<PromptOwn | null>(null)

  useEffect(() => {
    loadPrompts()
  }, [loadPrompts])

  const handleToSettings = () => {
    setActiveSection('Settings')
  }

  const handleNewPrompt = () => {
    setSelectedPrompt(null)
    setActiveSection('Editor')
  }

  const handlePromptClick = (prompt: PromptOwn) => {
    setSelectedPrompt(prompt)
    setActiveSection('Editor')
  }

  const handleReturn = () => {
    setActiveSection('Prompts')
  }

  const handleSave = (id: number, newTitle: string, newInstruction: string) => {
    const promptId = id !== -1 ? id : Date.now()
    const promptData = {
      id: promptId,
      title: newTitle,
      instruction: newInstruction
    }

    const existingPrompt = prompts.some(prompt => prompt.id === promptId)
    if (existingPrompt) {
      updatePrompt(promptId, promptData)
    } else {
      addPrompt(promptData)
      setSelectedPrompt(promptData)
    }
    setActiveSection('Prompts')
  }

  const handleDeletePrompt = () => {
    if (selectedPrompt) {
      deletePrompt(selectedPrompt.id)
      setSelectedPrompt(null)
    }
    setActiveSection('Prompts')
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Header
          activeSection={activeSection}
          onSettings={handleToSettings}
          onNewPrompt={handleNewPrompt}
          onDeletePrompt={handleDeletePrompt}
          onReturn={handleReturn}
        />
        <Main
          promptsData={prompts}
          activeSection={activeSection}
          selectedPrompt={selectedPrompt}
          onPromptClick={handlePromptClick}
          onReturn={handleReturn}
          onSave={handleSave}
        />
      </div>
    </div>
  )
}

export default App
