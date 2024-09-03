import styles from './Popup.module.css'

export interface PopupProps {
  text: string
}

export function Popup({ text, ...props }: PopupProps) {
  return (
    <>
      <div className={styles.wrapper} {...props}>
        <span className={styles.text}>{text}</span>
      </div>
    </>
  )
}
