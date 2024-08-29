import { Pages } from '../../app/App'
import { Button } from '../../components/button/Button'

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
              <Button onClick={onDeletePrompt} icon='trashIcon' />
            ) : (
              <Button onClick={onNewPrompt} icon='plusIcon' />
            )}
          </li>
          <li>
            <Button onClick={() => onMenuClick('Settings')} icon='gearIcon' />
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
