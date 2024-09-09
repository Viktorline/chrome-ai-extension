import { useDrag } from '../../hooks/useDrag'
import { Button } from '../button/Button'
import cn from 'classnames'
import React, { useRef } from 'react'

import './Popup.css'

export interface PopupProps {
  text: string
  onClose: () => void
  startTop: number
  startLeft: number
}

export function Popup({ text, onClose, startTop, startLeft }: PopupProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const dragButtonRef = useRef<HTMLButtonElement | null>(null)

  const position = useDrag(wrapperRef, dragButtonRef, startTop, startLeft)

  return (
    <div
      className={cn('chromefastcom', 'chromefastcom-wrapper')}
      ref={wrapperRef}
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        position: 'absolute'
      }}
    >
      <div className='chromefastcom-popup'>
        <ul className='chromefastcom-controls'>
          <li>
            <Button
              buttonRef={dragButtonRef}
              className={cn(
                'chromefastcom-button-drag',
                'chromefastcom-button'
              )}
              icon='dragIcon'
              iconClassName='chromefastcom-iconsPopup'
            />
          </li>
          <li>
            <Button
              className='chromefastcom-button'
              onClick={onClose}
              icon='closeIcon'
              iconClassName='chromefastcom-iconsPopup'
            />
          </li>
        </ul>

        <span>112323{text}</span>
      </div>
    </div>
  )
}
