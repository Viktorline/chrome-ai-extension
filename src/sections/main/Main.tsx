import { Pages, PromptOwn } from '../../app/App'
import Prompt from '../../components/prompt/Prompt'
import { EN_PAGE_EDITOR, EN_PAGE_SETTINGS } from '../../constants/text'
import Editor from '../../sections/editor/Editor'
import cn from 'classnames'

import styles from './Main.module.css'
import React from 'react'

type MainProps = {
  promptsData: Array<{ id: number; title: string; instruction: string }>
  activeSection: Pages
  selectedPrompt: PromptOwn | null
  onPromptClick: (prompt: PromptOwn) => void
  onSave: (id: number, newTitle: string, newInstruction: string) => void
  onReturn: () => void
}

function Main({
  promptsData,
  activeSection,
  selectedPrompt,
  onPromptClick,
  onReturn,
  onSave
}: MainProps) {
  return (
    <main className={styles.main}>
      <ul className={styles.promptsList}>
        {promptsData.map(prompt => (
          <Prompt
            key={prompt.id}
            id={prompt.id}
            title={prompt.title}
            onClick={() => onPromptClick(prompt)}
          />
        ))}
      </ul>

      <section
        className={cn(styles.sidebar, styles.left, {
          [styles.leftOpen]: activeSection === EN_PAGE_EDITOR
        })}
      >
        <Editor
          key={selectedPrompt ? selectedPrompt.id : ''}
          id={selectedPrompt ? selectedPrompt.id : -1}
          title={selectedPrompt ? selectedPrompt.title : ''}
          instruction={selectedPrompt ? selectedPrompt.instruction : ''}
          onSave={onSave}
          onReturn={onReturn}
        />
      </section>

      <section
        className={cn(styles.sidebar, styles.right, {
          [styles.rightOpen]: activeSection === EN_PAGE_SETTINGS
        })}
      >
        <div>Settings Content</div>
      </section>
    </main>
  )
}

export default Main
