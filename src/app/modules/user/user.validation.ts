import { z } from 'zod';

const userValidationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters long'),
  role: z.enum(['admin', 'user']),
  address: z.string().min(1, 'Address is required'),
});

export default userValidationSchema;
