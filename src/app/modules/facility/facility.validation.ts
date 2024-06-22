import { z } from 'zod';

const FacilityValidationSchema = z.object({
  name: z.string().nonempty('Name is required'),
  description: z.string().nonempty('Description is required'),
  pricePerHour: z
    .number()
    .min(0, 'Price per hour must be a non-negative number'),
  location: z.string().nonempty('Location is required'),
  isDeleted: z.boolean().default(false),
});

export { FacilityValidationSchema };
