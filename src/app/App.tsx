import { Button } from '../components/button/Button'
import Prompt from '../components/prompt/Prompt'
import Editor from '../sections/editor/Editor'
import Header from '../sections/header/Header'
import cn from 'classnames'
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

  console.log(selectedPrompt)
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Header onMenuClick={handleMenuClick} />

        <main className={styles.main}>
          <ul className={styles.promptsList}>
            {PROMPTS_DATA.map(prompt => (
              <Prompt
                key={prompt.id}
                id={prompt.id}
                title={prompt.title}
                onClick={() => handlePromptClick(prompt.id)}
              />
            ))}
          </ul>

          <section
            className={cn(styles.sidebar, styles.left, {
              [styles.leftOpen]: activeSection === 'Editor'
            })}
          >
            {selectedPrompt !== null && (
              <Editor
                key={selectedPrompt}
                id={PROMPTS_DATA[selectedPrompt! - 1].id}
                title={PROMPTS_DATA[selectedPrompt! - 1].title}
                instruction={PROMPTS_DATA[selectedPrompt! - 1].instruction}
                onSave={handleSave}
              />
            )}
          </section>

          <section
            className={cn(styles.sidebar, styles.right, {
              [styles.rightOpen]: activeSection === 'Settings'
            })}
          >
            <div>Settings Content</div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default App
