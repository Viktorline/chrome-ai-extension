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
        className={cn('default', className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {children && <span className='text'>{children}</span>}{' '}
        {icon && <Icon icon={icon} className='icon' />}
      </button>
    </>
  )
}
