import { Pages } from '../../app/App'
import { Button } from '../../components/button/Button'
import { Icon } from '../../components/icon/Icon'

import styles from './Header.module.css'

type HeaderProps = {
  onMenuClick: (page: Pages) => void
  onNewPrompt: () => void
  onDeletePrompt: () => void
  activeSection: Pages
}

function Header({
  onMenuClick,
  onNewPrompt,
  onDeletePrompt,
  activeSection
}: HeaderProps) {
  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.menuList}>
          <li>
            {activeSection === 'Editor' ? (
              <Button onClick={onDeletePrompt}>
                <Icon icon='trashIcon' className={styles.gearIcon} />
              </Button>
            ) : (
              <Button onClick={onNewPrompt}>
                <Icon icon='plusIcon' className={styles.gearIcon} />
              </Button>
            )}
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
