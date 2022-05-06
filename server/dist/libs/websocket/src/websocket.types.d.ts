import { Socket } from 'socket.io';
export interface IWsPayload {
    event: string;
    cb: (sockets?: Socket[]) => any;
    room?: string;
}
