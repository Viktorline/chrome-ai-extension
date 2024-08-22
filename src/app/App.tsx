import { Icon } from '../components/icon/Icon'
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
        <header className={styles.header}>
          <nav className={styles.nav}>
            <ul className={styles.menuList}>
              <li className={styles.instruction}>
                <button
                  className={styles.instructionButton}
                  onClick={() => handleMenuClick('Instructions')}
                >
                  Instructions
                </button>
              </li>
              <li className={styles.instruction}>
                <button
                  className={styles.instructionButton}
                  onClick={() => handleMenuClick('Settings')}
                >
                  <Icon icon='gearIcon' className={styles.gearIcon} />
                </button>
              </li>
            </ul>
          </nav>
        </header>

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
              <button className={styles.instructionButton}>
                Translate to Russian
              </button>
            </li>
            <li className={styles.instruction}>
              <button className={styles.instructionButton}>
                In development ...
              </button>
            </li>
            <li className={styles.instruction}>
              <button className={styles.instructionButton}>
                In development ...
              </button>
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
