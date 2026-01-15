import { getAllEvents, updateEvent } from '../storage/eventRepository';
import { EventEntity } from './Event';
const sentIds = new Set<string>();

export const fakeServerSend = async (id: string) => {
  await new Promise<void>(resolve => setTimeout(resolve, 500));

  if (sentIds.has(id)) return { ok: true };

  if (Math.random() < 0.3) throw new Error('Network error');

  sentIds.add(id);
  return { ok: true };
};
export const syncPendingEvents = async () => {
  const events = await getAllEvents();

  const pending = events.filter(
    e => e.status === 'PENDING' || e.status === 'FAILED'
  );

  for (const event of pending) {
    try {
      await fakeServerSend(event.id); // idempotente
      await updateEvent({ ...event, status: 'SYNCED' });
    } catch (e) {
      console.log('sync failed', e);
      await updateEvent({ ...event, status: 'FAILED' });
    }
  }
};