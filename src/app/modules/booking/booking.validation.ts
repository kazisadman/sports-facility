import { Types } from 'mongoose';
import { z } from 'zod';

export const bookingValidationSchema = z.object({
  facility: z.instanceof(Types.ObjectId),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format. Must be YYYY-MM-DD.'),
  startTime: z
    .string()
    .regex(/^\d{2}:\d{2}$/, 'Invalid startTime format. Must be HH:MM.'),
  endTime: z
    .string()
    .regex(/^\d{2}:\d{2}$/, 'Invalid endTime format. Must be HH:MM.'),
  user: z.instanceof(Types.ObjectId),
  payableAmount: z.number().min(0, 'Payable amount must be non-negative.'),
  isBooked: z.enum(['confirmed', 'unconfirmed', 'canceled']),
});
