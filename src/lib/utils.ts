import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const themes: string[] = [
  'Modern',
  'Minimalist',
  'Professional',
  'Industrial',
  'Realistic',
  'Classic',
  'Arabian',
  'Vintage',
  'Coastal',
]
export const rooms: string[] = [
  'Living Room',
  'Dining Room',
  'Office',
  'Bedroom',
  'Bathroom',
  'Kitchen',
  'Basement',
  'Arabian Majlis',
  'Outdoor Patio',
  'Programming Room',
]
export const colors: string[] = [
  'White',
  'Green',
  'Orange',
  'Blue',
  'Red',
  'Yellow',
  'Purple',
  'Black',
]
