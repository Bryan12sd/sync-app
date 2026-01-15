import AsyncStorage from '@react-native-async-storage/async-storage';
import { EventEntity } from '../domain/Event';

const KEY = 'EVENTS';

export const getAllEvents = async (): Promise<EventEntity[]> => {
  try {
    const data = await AsyncStorage.getItem(KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.log('getAllEvents error', e);
    return [];
  }
};

export const saveEvent = async (event: EventEntity) => {
  try {
    const events = await getAllEvents();
    events.push(event);
    await AsyncStorage.setItem(KEY, JSON.stringify(events));
  } catch (e) {
    console.log('saveEvent error', e);
  }
};

export const updateEvent = async (updated: EventEntity) => {
  try {
    const events = await getAllEvents();
    const newList = events.map(e => (e.id === updated.id ? updated : e));
    await AsyncStorage.setItem(KEY, JSON.stringify(newList));
  } catch (e) {
    console.log('updateEvent error', e);
  }
};
