import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { IWsPayload } from './websocket.types';

@WebSocketGateway({
  cors: { origin: '*' },
})
export class WsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private _sockets: Socket[] = [];

  handleConnection(client: Socket) {
    this._sockets.push(client);
  }

  handleDisconnect(client: Socket) {
    this._sockets = this._sockets.filter(
      (_socket: Socket) => _socket.id !== client.id,
    );
  }

  async joinRoom(name: string, client: Socket) {
    await client.join([...client.rooms, name]);
  }

  async leaveRoom(name: string, client: Socket) {
    await client.leave(name);
  }

  async broadcast(event: string, cb: any) {
    const data = await cb(this._sockets);
    for (const client of this._sockets) {
      client.emit(event, data);
    }
  }

  async broadcastRoom(room: string, event: string, cb: any) {
    const data = await cb(this._sockets);
    const sockets_ = this._sockets.filter((client: Socket) =>
      client.rooms.has(room),
    );
    for (const client of sockets_) {
      client.emit(event, data);
    }
  }

  async notify(data: IWsPayload) {
    console.log('[websocket-notification]: ', data);
    if (data.room) {
      await this.broadcastRoom(data.room, data.event, data.cb);
      return;
    }
    this.broadcast(data.event, data.cb);
  }
}
