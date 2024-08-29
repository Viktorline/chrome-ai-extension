import { GearIcon } from './icons/GearIcon'
import { PlusIcon } from './icons/PlusIcon'
import { TrashIcon } from './icons/TrashIcon'

export type IconName = 'gearIcon' | 'plusIcon' | 'trashIcon'

type IconProps = {
  icon: IconName
  className?: string
}

const icons = {
  gearIcon: GearIcon,
  plusIcon: PlusIcon,
  trashIcon: TrashIcon
}

export function Icon({ icon, className, ...props }: IconProps) {
  const Component = icons[icon]
  return <Component className={className} {...props} />
}
