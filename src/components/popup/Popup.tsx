import React from 'react'

import './Popup.css'

export interface PopupProps {
  text: string
  onClose: () => void
}

export function Popup({ text, onClose }: PopupProps) {
  return (
    <>
      <div className='wrapper'>
        <div className='popup'>
          <button className='popup-close' onClick={onClose}>
            &times;
          </button>
          <span>{text}</span>
        </div>
      </div>
    </>
  )
}
