import { Icon, IconName } from '../icon/Icon'
import cn from 'classnames'
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'
import React from 'react'

import './Button.css'

export interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  iconClassName?: string
  isLoading?: boolean
  icon?: IconName
  buttonRef?: React.RefObject<HTMLButtonElement>
}

export function Button({
  children,
  className,
  iconClassName,
  disabled,
  isLoading,
  icon,
  buttonRef,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn('default', className)}
      disabled={disabled || isLoading}
      ref={buttonRef}
      {...props}
    >
      {children && <span className='text'>{children}</span>}
      {icon && <Icon icon={icon} className={cn('icon', iconClassName)} />}
    </button>
  )
}
