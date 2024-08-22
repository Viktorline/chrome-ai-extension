import { GearIcon } from './icons/GearIcon'

type IconName = 'gearIcon'

type IconProps = {
  icon: IconName
  className?: string
}

const icons = {
  gearIcon: GearIcon
}

export function Icon({ icon, className, ...props }: IconProps) {
  const Component = icons[icon]
  return <Component className={className} {...props} />
}
