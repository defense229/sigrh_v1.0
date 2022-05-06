import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { IWsPayload } from './websocket.types';
export declare class WsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private _sockets;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    joinRoom(name: string, client: Socket): Promise<void>;
    leaveRoom(name: string, client: Socket): Promise<void>;
    broadcast(event: string, cb: any): Promise<void>;
    broadcastRoom(room: string, event: string, cb: any): Promise<void>;
    notify(data: IWsPayload): Promise<void>;
}
