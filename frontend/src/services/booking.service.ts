import api from './api';

export interface CreateBookingPayload {
  eventType: string;
  district: string;
  address: string;
  date: string;
  time: string;
  duration?: number;
  caste?: string;
  religion?: string;
  customerName: string;
  phone: string;
  altPhone?: string;
  email?: string;
  notes?: string;
  panditId?: string;
  packageId?: string;
  decorationId?: string;
}

export const bookingService = {
  create:         (payload: CreateBookingPayload) => api.post('/bookings', payload).then(r => r.data),
  getOne:         (id: string)                    => api.get(`/bookings/${id}`).then(r => r.data),
  confirmPayment: (id: string)                    => api.post(`/bookings/${id}/confirm-payment`).then(r => r.data),
  myBookings:     ()                              => api.get('/bookings/user/mine').then(r => r.data),
  panditBookings: ()                              => api.get('/bookings/pandit/mine').then(r => r.data),
  cancel:         (id: string, reason: string)    => api.patch(`/bookings/${id}/cancel`, { reason }).then(r => r.data),
};
