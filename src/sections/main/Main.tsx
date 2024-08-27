import { Pages } from '../../app/App'
import Prompt from '../../components/prompt/Prompt'
import Editor from '../../sections/editor/Editor'
import cn from 'classnames'

import styles from './Main.module.css'

type MainProps = {
  promptsData: Array<{ id: number; title: string; instruction: string }>
  activeSection: Pages
  selectedPrompt: number | null
  onPromptClick: (id: number) => void
  onSave: (id: number, newTitle: string, newInstruction: string) => void
}

function Main({
  promptsData,
  activeSection,
  selectedPrompt,
  onPromptClick,
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
            onClick={() => onPromptClick(prompt.id)}
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
            id={promptsData[selectedPrompt! - 1].id}
            title={promptsData[selectedPrompt! - 1].title}
            instruction={promptsData[selectedPrompt! - 1].instruction}
            onSave={onSave}
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
  )
}

export default Main
