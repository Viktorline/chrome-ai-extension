import { Icon, IconName } from '../icon/Icon'
import cn from 'classnames'
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

import styles from './Button.module.css'

export interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  isLoading?: boolean
  icon?: IconName
}

export function Button({
  children,
  className,
  disabled,
  isLoading,
  icon,
  ...props
}: ButtonProps) {
  return (
    <>
      <button
        className={cn(styles.default, className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {children && <span className={styles.text}>{children}</span>}
        {icon && <Icon icon={icon} className={styles.icon} />}
      </button>
    </>
  )
}
