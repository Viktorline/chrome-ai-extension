import { POPUP_SIZE_HEIGHT, POPUP_SIZE_WIDTH } from '../../constants/numbers'
import { useDrag } from '../../hooks/useDrag'
import { usePromptStore } from '../../store/usePromptStore'
import { Button } from '../button/Button'
import { Messages } from '../messages/Messages'
import cn from 'classnames'
import React, { useEffect, useRef } from 'react'

import './Popup.css'

export interface PopupProps {
  text: string
  onClose: () => void
  startTop: number
  startLeft: number
  boundary: { width: number; height: number }
  popupSize: { width: number; height: number }
}

export function Popup({
  text,
  onClose,
  startTop,
  startLeft,
  boundary,
  popupSize
}: PopupProps) {
  const { getAnswer, loading, messages } = usePromptStore()

  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const dragButtonRef = useRef<HTMLButtonElement | null>(null)

  const position = useDrag(
    wrapperRef,
    dragButtonRef,
    startTop,
    startLeft,
    boundary,
    popupSize
  )

  useEffect(() => {
    getAnswer(text)
  }, [text, getAnswer])

  return (
    <div
      className={cn('chromefastcom', 'chromefastcom-wrapper')}
      ref={wrapperRef}
      style={{
        position: 'absolute',
        top: `${position.top}px`,
        left: `${position.left}px`,
        width: `${POPUP_SIZE_WIDTH}px`
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

        <Messages messages={messages} loading={loading} />
      </div>
    </div>
  )
}
