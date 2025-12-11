import type { LinkProps as NextLinkProps } from 'next/link'
import NextLink from 'next/link'
import type { AnchorHTMLAttributes } from 'react'

export type LinkProps = NextLinkProps & AnchorHTMLAttributes<HTMLAnchorElement>

export const Link = (props: LinkProps) => <NextLink prefetch={false} {...props} />
