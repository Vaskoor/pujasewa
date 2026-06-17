import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const bookingSchema = z.object({
  eventTypeId: z.string().min(1, 'Event type is required'),
  eventDate: z.string().min(1, 'Date is required'),
  eventTime: z.string().min(1, 'Time is required'),
  location: z.string().min(5, 'Location is required'),
  packageId: z.string().optional(),
});

export type BookingFormData = z.infer<typeof bookingSchema>;

export function useBookingForm() {
  return useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { eventDate: new Date().toISOString().split('T')[0] },
  });
}
