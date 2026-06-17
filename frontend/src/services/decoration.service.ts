import api from './api';

export const decorationService = {
  list: () => api.get('/decorations').then(r => r.data),
  get:  (id: string) => api.get(`/decorations/${id}`).then(r => r.data),
};
