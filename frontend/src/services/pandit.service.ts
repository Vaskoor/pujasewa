import api from './api';

export const panditService = {
  searchPandits: async (filters?: any) => {
    const res = await api.get('/pandits', { params: filters });
    return res.data;
  },
};
