import {
  EN_PAGE_EDITOR,
  EN_PAGE_PROMPTS,
  EN_PAGE_SETTINGS
} from '../constants/text'
import Header from '../sections/header/Header'
import Main from '../sections/main/Main'
import { usePromptStore } from '../store/usePromptStore'
import { useEffect, useState } from 'react'

import styles from './App.module.css'
import React from 'react'

export type Pages =
  | typeof EN_PAGE_PROMPTS
  | typeof EN_PAGE_SETTINGS
  | typeof EN_PAGE_EDITOR

export type PromptOwn = {
  id: number
  title: string
  instruction: string
}

function App() {
  const { prompts, addPrompt, loadPrompts, updatePrompt, deletePrompt } =
    usePromptStore()
  const [activeSection, setActiveSection] = useState<Pages>(EN_PAGE_PROMPTS)
  const [selectedPrompt, setSelectedPrompt] = useState<PromptOwn | null>(null)

  useEffect(() => {
    loadPrompts()
  }, [loadPrompts])

  const handleToSettings = () => {
    setActiveSection(EN_PAGE_SETTINGS)
  }

  const handleNewPrompt = () => {
    setSelectedPrompt(null)
    setActiveSection(EN_PAGE_EDITOR)
  }

  const handlePromptClick = (prompt: PromptOwn) => {
    setSelectedPrompt(prompt)
    setActiveSection(EN_PAGE_EDITOR)
  }

  const handleReturn = () => {
    setActiveSection(EN_PAGE_PROMPTS)
  }

  const handleSave = (id: number, newTitle: string, newInstruction: string) => {
    const promptId = id !== -1 ? id : Date.now()
    const promptData = {
      id: promptId,
      title: newTitle,
      instruction: newInstruction
    }

    const existingPrompt = prompts.some((prompt: { id: number }) => prompt.id === promptId)
    if (existingPrompt) {
      updatePrompt(promptId, promptData)
    } else {
      addPrompt(promptData)
      setSelectedPrompt(promptData)
    }
    setActiveSection(EN_PAGE_PROMPTS)
  }

  const handleDeletePrompt = () => {
    if (selectedPrompt) {
      deletePrompt(selectedPrompt.id)
      setSelectedPrompt(null)
    }
    setActiveSection(EN_PAGE_PROMPTS)
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
