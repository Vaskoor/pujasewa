import { io, Socket } from 'socket.io-client';

class SocketService {
  private socket: Socket | null = null;

  connect() {
    if (this.socket?.connected) return;
    this.socket = io(import.meta.env.VITE_API_URL?.replace('/api/v1', '') || 'http://localhost:3000', {
      path: '/socket.io',
      transports: ['websocket'],
    });
    this.socket.on('connect', () => console.log('Socket connected'));
  }

  disconnect() { this.socket?.disconnect(); }
  onAvailabilityUpdate(callback: (data: any) => void) { this.socket?.on('availability-update', callback); }
  offAvailabilityUpdate(callback: (data: any) => void) { this.socket?.off('availability-update', callback); }
}

export const socketService = new SocketService();
