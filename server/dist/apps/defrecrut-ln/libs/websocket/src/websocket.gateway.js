"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WsGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
let WsGateway = class WsGateway {
    constructor() {
        this._sockets = [];
    }
    handleConnection(client) {
        this._sockets.push(client);
    }
    handleDisconnect(client) {
        this._sockets = this._sockets.filter((_socket) => _socket.id !== client.id);
    }
    async joinRoom(name, client) {
        await client.join([...client.rooms, name]);
    }
    async leaveRoom(name, client) {
        await client.leave(name);
    }
    async broadcast(event, cb) {
        const data = await cb(this._sockets);
        for (const client of this._sockets) {
            client.emit(event, data);
        }
    }
    async broadcastRoom(room, event, cb) {
        const data = await cb(this._sockets);
        const sockets_ = this._sockets.filter((client) => client.rooms.has(room));
        for (const client of sockets_) {
            client.emit(event, data);
        }
    }
    async notify(data) {
        console.log('[websocket-notification]: ', data, await data.cb());
        if (data.room) {
            await this.broadcastRoom(data.room, data.event, data.cb);
            return;
        }
        this.broadcast(data.event, data.cb);
    }
};
WsGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: { origin: '*' },
        transports: ['websocket'],
    })
], WsGateway);
exports.WsGateway = WsGateway;
//# sourceMappingURL=websocket.gateway.js.map