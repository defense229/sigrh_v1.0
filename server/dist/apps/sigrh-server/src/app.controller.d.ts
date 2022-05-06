import { WsGateway } from '@sigrh/websocket';
export declare class AppController {
    private readonly ws;
    constructor(ws: WsGateway);
    testWs(): string;
}
