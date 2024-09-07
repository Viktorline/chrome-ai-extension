import { useDrag } from '../../hooks/useDrag'
import React, { useRef } from 'react'

import './Popup.css'

export interface PopupProps {
  text: string
  onClose: () => void
}

export function Popup({ text, onClose }: PopupProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const dragButtonRef = useRef<HTMLButtonElement | null>(null)

  const position = useDrag(wrapperRef, dragButtonRef)

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
        <div className='controls'>
          <button ref={dragButtonRef} className='button-drag'>
            &#x2630;
          </button>
          <button className='button-close' onClick={onClose}>
            &times;
          </button>
        </div>

        <span>{text}</span>
      </div>
    </div>
  )
}
