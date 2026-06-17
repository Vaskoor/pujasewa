import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../services/api';
import { socketService } from '../../services/socket';
import { LoadingSpinner } from '../../components/LoadingSpinner';

export function PanditCalendar() {
  const queryClient = useQueryClient();
  const [events, setEvents] = useState<any[]>([]);
  const { data: slots, isLoading } = useQuery({
    queryKey: ['availability'],
    queryFn: () => api.get('/pandits/me/availability').then(r => r.data),
  });

  useEffect(() => {
    socketService.connect();
    socketService.onAvailabilityUpdate(() => queryClient.invalidateQueries({ queryKey: ['availability'] }));
    return () => {
      socketService.offAvailabilityUpdate(() => {});
      socketService.disconnect();
    };
  }, [queryClient]);

  useEffect(() => {
    if (slots) {
      const mapped = slots.map((slot: any) => ({
        id: slot.id,
        title: slot.isBooked ? 'Booked' : 'Available',
        start: `${slot.date?.split('T')[0]}T${slot.startTime}`,
        end: `${slot.date?.split('T')[0]}T${slot.endTime}`,
        backgroundColor: slot.isBooked ? '#ef4444' : '#10b981',
        borderColor: slot.isBooked ? '#ef4444' : '#10b981',
      }));
      setEvents(mapped);
    }
  }, [slots]);

  if (isLoading) return <LoadingSpinner />;
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Availability Calendar</h1>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{ left: 'prev,next today', center: 'title', right: 'dayGridMonth,timeGridWeek,timeGridDay' }}
        initialView="timeGridWeek"
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        events={events}
        height="auto"
      />
    </div>
  );
}
