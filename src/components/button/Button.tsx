import cn from 'classnames'
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

import styles from './Button.module.css'

export interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  isLoading?: boolean
  hint?: string
}

export function Button({
  children,
  className,
  disabled,
  isLoading,
  hint,
  ...props
}: ButtonProps) {
  return (
    <>
      <button
        className={cn(styles.button, className, {})}
        disabled={disabled || isLoading}
        {...props}
      >
        <div className={cn({ [styles.hidden]: isLoading })}>{children}</div>
        {/* {isLoading && <Icon icon='circleNotch' className={styles.spinner} />} */}
      </button>
      {hint && <span className={styles.hint}>{hint}</span>}
    </>
  )
}
