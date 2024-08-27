import Header from '../sections/header/Header'
import Main from '../sections/main/Main'
import { useState } from 'react'

import styles from './App.module.css'

export type Pages = 'Prompts' | 'Settings' | 'Editor'

const PROMPTS_DATA = [
  {
    id: 1,
    title: 'Translate to Russian',
    instruction: 'Translate the selected text into Russian.'
  },
  {
    id: 2,
    title: 'Summarize Text',
    instruction: 'Blablablablablablabla'
  },
  {
    id: 3,
    title: 'Explain',
    instruction: 'Blablablablablablabla'
  },
  {
    id: 4,
    title: 'Explain',
    instruction: 'Blablablablablablabla'
  },
  {
    id: 5,
    title: 'Translate to Russian',
    instruction: 'Translate the selected text into Russian.'
  },
  {
    id: 6,
    title: 'Summarize Text',
    instruction: 'Blablablablablablabla'
  },
  {
    id: 7,
    title: 'Explain',
    instruction: 'Blablablablablablabla'
  },
  {
    id: 8,
    title: 'Explain',
    instruction: 'Blablablablablablabla'
  },
  {
    id: 9,
    title: 'Explain',
    instruction: 'Blablablablablablabla'
  },
  {
    id: 10,
    title: 'Explain',
    instruction: 'Blablablablablablabla'
  },
  {
    id: 11,
    title: 'Explain',
    instruction: 'Blablablablablablabla'
  },
  {
    id: 12,
    title: 'Explain',
    instruction: 'Blablablablablablabla'
  },

  {
    id: 13,
    title: 'Explain',
    instruction: 'Blablablablablablabla'
  },

  {
    id: 14,
    title: 'Explain',
    instruction: 'Blablablablablablabla'
  },

  {
    id: 15,
    title: 'Explain',
    instruction: 'Blablablablablablabla'
  },

  {
    id: 16,
    title: 'Explain',
    instruction: 'Blablablablablablabla'
  }
]

function App() {
  const [activeSection, setActiveSection] = useState<Pages>('Prompts')
  const [selectedPrompt, setSelectedPrompt] = useState<number | null>(null)

  const handleMenuClick = (page: Pages) => {
    setActiveSection(page)
  }

  const handleSave = (id: number, newTitle: string, newInstruction: string) => {
    console.log(
      `Prompt ${id} saved with title: ${newTitle} and instruction: ${newInstruction}`
    )
    setActiveSection('Prompts')
  }

  const handlePromptClick = (id: number) => {
    setSelectedPrompt(id)
    setActiveSection('Editor')
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Header onMenuClick={handleMenuClick} />
        <Main
          promptsData={PROMPTS_DATA}
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
