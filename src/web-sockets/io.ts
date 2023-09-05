import { io } from 'socket.io-client';

import { WHATSAAP_API_URL } from '../config';

export const socket = io(WHATSAAP_API_URL, {});
