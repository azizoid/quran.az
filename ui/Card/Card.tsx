import { FC, ReactNode } from 'react'

export type CardProps = {
  title: string | ReactNode
  titleClassName?: string | null
  contentClass?: string | null
  className?: string
  size?: 'small' | 'medium' | 'fit'
}

enum cardSize {
  small = 'px-4',
  medium = 'px-7',
}

export const Card: FC<CardProps> = ({
  title,
  titleClassName = '',
  className = '',
  size = 'medium',
  children,
}) => (
  <div className="card">
    <div className={`card-title ${cardSize[size]} ${titleClassName}`}>{title}</div>
    <div className={`card-content ${cardSize[size]} ${className}`}>{children}</div>
  </div>
)
