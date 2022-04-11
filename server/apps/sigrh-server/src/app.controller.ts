import { Controller, Get } from '@nestjs/common';
import { WsGateway } from '@sigrh/websocket';

@Controller()
export class AppController {
  constructor(private readonly ws: WsGateway) {}

  @Get('ws')
  testWs() {
    this.ws.notify({
      event: 'test',
      cb: (socketInfo: any) => {
        console.log(socketInfo);
        return {
          message: 'Hello',
        };
      },
    });
    return 'ok';
  }
}
