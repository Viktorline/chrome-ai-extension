import { Pages } from '../../app/App'
import { Button } from '../../components/button/Button'
import { Icon } from '../../components/icon/Icon'

import styles from './Header.module.css'

type HeaderProps = {
  onMenuClick: (page: Pages) => void
}

function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.menuList}>
          <li>
            <Button
              className={styles.promptButton}
              onClick={() => onMenuClick('Prompts')}
            >
              Prompts
            </Button>
          </li>
          <li>
            <Button onClick={() => onMenuClick('Settings')}>
              <Icon icon='gearIcon' className={styles.gearIcon} />
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
