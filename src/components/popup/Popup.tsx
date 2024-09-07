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
  console.log(position)
  return (
    <div
      className='draggable-wrapper'
      ref={wrapperRef}
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        position: 'absolute'
      }}
    >
      <div className='popup'>
        <ul className='controls'>
          <li>
            <Button
              buttonRef={dragButtonRef}
              className={cn('button-drag', 'button')}
              icon='dragIcon'
              iconClassName='iconsPopup'
            />
          </li>
          <li>
            <Button
              className='button'
              onClick={onClose}
              icon='closeIcon'
              iconClassName='iconsPopup'
            />
          </li>
        </ul>

        <span>{text}</span>
      </div>
    </div>
  )
}
