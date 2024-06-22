import { z } from 'zod';

export const bookingValidationSchema = z.object({
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format. Use YYYY-MM-DD.'),
  startTime: z
    .string()
    .regex(/^\d{2}:\d{2}$/, 'Invalid time format. Use HH:MM.'),
  endTime: z.string().regex(/^\d{2}:\d{2}$/, 'Invalid time format. Use HH:MM.'),
  user: z.string().uuid('Invalid user ID format.'),
  facility: z.string().uuid('Invalid facility ID format.'),
  payableAmount: z.number().min(0, 'Payable amount must be non-negative.'),
  isBooked: z.enum(['confirmed', 'unconfirmed', 'canceled']),
});
