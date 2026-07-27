import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function isDev() {
  try {
    return process.env.NODE_ENV === 'development'
  } catch {
    return false
  }
}
