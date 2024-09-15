import { Pages, PromptOwn } from '../../app/App'
import Prompt from '../../components/prompt/Prompt'
import { EN_PAGE_EDITOR, EN_PAGE_SETTINGS } from '../../constants/text'
import Editor from '../../sections/editor/Editor'
import Settings from '../settings/Settings'
import cn from 'classnames'
import React from 'react'

import './Main.css'

type MainProps = {
  promptsData: Array<{ id: number; title: string; instruction: string }>
  activeSection: Pages
  selectedPrompt: PromptOwn | null
  apiKey: string
  onPromptClick: (prompt: PromptOwn) => void
  onSave: (id: number, newTitle: string, newInstruction: string) => void
  onReturn: () => void
  setApiKey: (newApiKey: string) => void
}

function Main({
  apiKey,
  promptsData,
  activeSection,
  selectedPrompt,
  onPromptClick,
  setApiKey,
  onReturn,
  onSave
}: MainProps) {
  return (
    <main className='main'>
      <ul className='promptsList'>
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
        className={cn('sidebar', 'left', {
          leftOpen: activeSection === EN_PAGE_EDITOR
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
        className={cn('sidebar', 'right', {
          rightOpen: activeSection === EN_PAGE_SETTINGS
        })}
      >
        <Settings apiKey={apiKey} setApiKey={setApiKey} />
      </section>
    </main>
  )
}

export default Main
