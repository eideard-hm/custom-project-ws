export type WAConnectionState = 'open' | 'connecting' | 'close';

export type SessionStatusEvent = {
  sessionId: string;
  status: WAConnectionState;
};
