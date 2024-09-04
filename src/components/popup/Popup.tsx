import React from 'react'
import styles from './Popup.module.css'

export interface PopupProps {
  text: string
}

export function Popup({ text, ...props }: PopupProps) {
  return (
    <>
      <div>
        <span>{text}</span>
      </div>
    </>
  )
}
