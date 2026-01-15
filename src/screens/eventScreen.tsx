import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { getAllEvents } from '../storage/eventRepository';
import { EventEntity } from '../domain/Event';
import { syncPendingEvents } from '../domain/syncService';

export default function EventsScreen() {
  const [events, setEvents] = useState<EventEntity[]>([]);

  const load = async () => {
    const data = await getAllEvents();
    data.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    setEvents(data);
  };

  useEffect(() => {
    load();
  }, []);

  const sync = async () => {
    await syncPendingEvents();
    await load();
  };

  return (
    <View>
      <Button title="Sync" onPress={sync} />

      <FlatList
        data={events}
        keyExtractor={i => i.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.payload.type}</Text>
            <Text>{item.payload.note}</Text>
            <Text>{item.status}</Text>
          </View>
        )}
      />
    </View>
  );
}
