import { ReactNode } from 'react'

import Link from 'next/link'

type PaginationLinkProps = {
  href: string
  children?: ReactNode
  className?: string
}

export const PaginationLink = ({ href, className, children }: PaginationLinkProps) => (
  <Link href={href} className={`pagination-item ${className}`} prefetch={false}>
    {children}
  </Link>
)
