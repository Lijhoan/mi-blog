import * as React from "react"
import { cn } from "@/lib/utils"

function Card({ className, ...props }) {
  return <div className={cn("bg-card text-card-foreground rounded-xl border shadow", className)} {...props} />
}

function CardHeader({ className, ...props }) {
  return <div className={cn("p-6 border-b", className)} {...props} />
}

function CardTitle({ className, ...props }) {
  return <h3 className={cn("text-lg font-semibold", className)} {...props} />
}

function CardDescription({ className, ...props }) {
  return <p className={cn("text-sm text-muted-foreground", className)} {...props} />
}

function CardContent({ className, ...props }) {
  return <div className={cn("p-6", className)} {...props} />
}

function CardFooter({ className, ...props }) {
  return <div className={cn("flex items-center p-6 border-t", className)} {...props} />
}

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
}
