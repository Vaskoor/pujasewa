export function getGoogleCalendarLink(event: { title: string; start: Date; end: Date; description: string; location: string }) {
  const start = event.start.toISOString().replace(/-|:|\.\d+/g, '');
  const end = event.end.toISOString().replace(/-|:|\.\d+/g, '');
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${start}/${end}`,
    details: event.description,
    location: event.location,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
