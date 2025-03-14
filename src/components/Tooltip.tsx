import { PropsWithChildren } from 'react'

import {
  Tooltip as TooltipShadcn,
  TooltipContent,
  TooltipProvider,
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
