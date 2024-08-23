import { Button } from '../components/button/Button'
import Header from '../sections/header/Header'
import cn from 'classnames'
import { useState } from 'react'

import styles from './App.module.css'

type Pages = 'Instructions' | 'Settings'

function App() {
  const [activeSection, setActiveSection] = useState<Pages>('Instructions')

  const handleMenuClick = (page: Pages) => {
    setActiveSection(page)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Header onMenuClick={handleMenuClick} />

        <main className={styles.main}>
          <section
            className={cn(styles.sidebar, {
              [styles.sidebarOpen]: activeSection === 'Settings'
            })}
          >
            <div>Settings Content</div>
          </section>

          <ul className={styles.instructionsList}>
            <li className={styles.instruction}>
              <Button>Translate to Russian</Button>
            </li>
            <li className={styles.instruction}>
              <Button>In development ...</Button>
            </li>
            <li className={styles.instruction}>
              <Button>In development ...</Button>
            </li>
          </ul>

          <section
            className={cn(styles.sidebar, {
              [styles.sidebarOpen]: activeSection === 'Settings'
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
