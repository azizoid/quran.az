import { PropsWithChildren } from 'react'

import Link from 'next/link'

type PaginationLinkProps = PropsWithChildren<{
  href: string
  className?: string
}>

export const PaginationLink = ({ href, className, children }: PaginationLinkProps) => (
  <Link href={href} className={`pagination-item ${className}`} prefetch={false}>
    {children}
  </Link>
)
