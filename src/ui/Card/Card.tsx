import { PropsWithChildren, ReactNode } from 'react'

export type CardProps = {
  title: string | ReactNode
  titleClassName?: string | null
  contentClass?: string | null
  className?: string
  size?: 'small' | 'medium' | 'fit'
  children?: ReactNode
}

enum cardSize {
  small = 'px-4',
  medium = 'px-7',
}

export const Card = ({
  title,
  titleClassName = '',
  className = '',
  size = 'medium',
  children,
}: CardProps) => (
  <div className="card">
    <div className={`card-title ${cardSize[size]} ${titleClassName}`}>{title}</div>
    <div className={`card-content ${cardSize[size]} ${className}`}>{children}</div>
  </div>
)
