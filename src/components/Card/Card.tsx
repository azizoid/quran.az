import React, { PropsWithChildren } from "react"

import {
  Card as CardShadcn,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"

export type CardProps = PropsWithChildren<{
  title: string,
  className?: string
}>

export const Card = ({
  title,
  className = "",
  children,
}: CardProps) => (
  <CardShadcn>
    <CardHeader className="p-4 pb-0">
      <CardDescription>{title}</CardDescription>
    </CardHeader>
    <CardContent className="p-4" >
      <CardDescription className={className}>
        {children}
      </CardDescription>
    </CardContent>
  </CardShadcn>
)
