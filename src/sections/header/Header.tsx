import { Button } from '../../components/button/Button'
import { Icon } from '../../components/icon/Icon'

import styles from './Header.module.css'

type HeaderProps = {
  onMenuClick: (page: 'Instructions' | 'Settings') => void
}

function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles.menuList}>
          <li className={styles.instruction}>
            <Button
              className={styles.instructionButton}
              onClick={() => onMenuClick('Instructions')}
            >
              Instructions
            </Button>
          </li>
          <li className={styles.instruction}>
            <Button
              className={styles.instructionButton}
              onClick={() => onMenuClick('Settings')}
            >
              <Icon icon='gearIcon' className={styles.gearIcon} />
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
