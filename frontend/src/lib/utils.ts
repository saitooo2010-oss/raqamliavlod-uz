import {clsx, type ClassValue} from 'clsx'
import {twMerge} from 'tailwind-merge'
import type {ZodSchema} from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function justDate(dateString: string) {
  const date = new Date(dateString)
  return date.toDateString()
}

export function zodFieldValidator(schema: ZodSchema) {
  return (value: any) => {
    const result = schema.safeParse(value);
    if (result.success) return;
    return result.error.errors.map(err => err.message);
  };
}

