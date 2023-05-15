import { ReactNode } from 'react'

export type CardProps = {
  title: string | ReactNode
  titleClassName?: string | null
  contentClass?: string | null
  className?: string
  size?: 'small' | 'medium'
  children?: ReactNode
}

const cardSizes = {
  small: 'px-4',
  medium: 'px-7',
} as const

export const Card = ({
  title,
  titleClassName = '',
  className = '',
  size = 'medium',
  children,
}: CardProps) => (
  <div className="card">
    <div className={`card-title ${cardSizes[size]} ${titleClassName}`}>{title}</div>
    <div className={`card-content ${cardSizes[size]} ${className}`}>{children}</div>
  </div>
)
