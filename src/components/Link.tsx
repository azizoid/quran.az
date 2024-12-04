import { AnchorHTMLAttributes } from 'react'

import NextLink from 'next/link'
import type { LinkProps as NextLinkProps } from 'next/link'

export type LinkProps = NextLinkProps & AnchorHTMLAttributes<HTMLAnchorElement>

export const Link = (props: LinkProps) => <NextLink prefetch={false} {...props} />