import React from 'react'

import './Popup.css'

export interface PopupProps {
  text: string
}

export function Popup({ text, ...props }: PopupProps) {
  return (
    <>
      <div className='wrapper'>
        <span>{text}</span>
      </div>
    </>
  )
}
