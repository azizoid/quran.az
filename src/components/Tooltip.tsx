import type { PropsWithChildren } from 'react'

import {
  TooltipContent,
  TooltipProvider,
  Tooltip as TooltipShadcn,
  TooltipTrigger,
} from '@/components/ui/tooltip'

type TooltipProps = PropsWithChildren<{ hover: string }>

export const Tooltip = ({ hover, children }: TooltipProps) => {
  return (
    <TooltipProvider>
      <TooltipShadcn>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent>{hover}</TooltipContent>
      </TooltipShadcn>
    </TooltipProvider>
  )
}
