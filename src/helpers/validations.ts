import { z } from 'zod'

export const soorahValidation = z.number().int().min(1).max(114)
export const translatorValidation = z.number().int()
