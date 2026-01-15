import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import { saveEvent } from '../storage/eventRepository';
import { EventEntity, EventType } from '../domain/Event';

export default function RegisterEventScreen() {
  const [type, setType] = useState<EventType>('PAYMENT');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

  const save = async () => {
    const event: EventEntity = {
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      status: 'PENDING',
      payload: {
        type,
        amount: amount ? Number(amount) : undefined,
        note,
      },
    };

    await saveEvent(event);
    setAmount('');
    setNote('');
  };

  return (
    <View>

      <TextInput placeholder="Amount" value={amount} onChangeText={setAmount} keyboardType="numeric" />
      <TextInput placeholder="Note" value={note} onChangeText={setNote} />
      <Button title="Guardar offline" onPress={save} />
    </View>
  );
}
