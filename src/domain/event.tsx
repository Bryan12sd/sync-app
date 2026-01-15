export type EventType = 'PAYMENT' | 'VISIT' | 'REWARD';
export type EventStatus = 'PENDING' | 'SYNCED' | 'FAILED';

export interface EventEntity {
  id: string;
  createdAt: string;
  status: EventStatus;
  payload: {
    type: EventType;
    amount?: number;
    note: string;
  };
}
