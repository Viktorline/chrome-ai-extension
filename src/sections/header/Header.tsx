import { Pages } from '../../app/App'
import { Button } from '../../components/button/Button'
import { EN_PAGE_EDITOR, EN_PAGE_SETTINGS } from '../../constants/text'
import React from 'react'

import './Header.css'

type HeaderProps = {
  onReturn: () => void
  onSettings: () => void
  onNewPrompt: () => void
  onDeletePrompt: () => void
  activeSection: Pages
}

function Header({
  onReturn,
  onSettings,
  onNewPrompt,
  onDeletePrompt,
  activeSection
}: HeaderProps) {
  return (
    <header className='header'>
      <nav>
        <ul className='menuList'>
          <li>
            {activeSection === EN_PAGE_EDITOR ? (
              <Button onClick={onDeletePrompt} icon='trashIcon' />
            ) : (
              <Button onClick={onNewPrompt} icon='plusIcon' />
            )}
          </li>
          <li>
            {activeSection === EN_PAGE_SETTINGS ? (
              <Button onClick={onReturn} icon='returnIcon' />
            ) : (
              <Button onClick={onSettings} icon='gearIcon' />
            )}
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
