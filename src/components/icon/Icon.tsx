import { CloseIcon } from './icons/CloseIcon'
import { DragIcon } from './icons/DragIcon'
import { GearIcon } from './icons/GearIcon'
import { PlusIcon } from './icons/PlusIcon'
import { ReturnIcon } from './icons/ReturnIcon'
import { TrashIcon } from './icons/TrashIcon'
import React from 'react'

export type IconName =
  | 'gearIcon'
  | 'plusIcon'
  | 'trashIcon'
  | 'returnIcon'
  | 'dragIcon'
  | 'closeIcon'

type IconProps = {
  icon: IconName
  className?: string
}

const icons = {
  gearIcon: GearIcon,
  plusIcon: PlusIcon,
  trashIcon: TrashIcon,
  returnIcon: ReturnIcon,
  dragIcon: DragIcon,
  closeIcon: CloseIcon
}

export function Icon({ icon, className, ...props }: IconProps) {
  const Component = icons[icon]
  return <Component className={className} {...props} />
}
