import { HttpService } from '@nestjs/axios';
export interface IQrcode {
    id?: string;
    tag: string;
    data: string;
    dataUrl?: string;
}
export declare class QrcodeService {
    private http;
    baseUrl: string;
    constructor(http: HttpService);
    create(qrcode: IQrcode): Promise<IQrcode>;
    verify(qrcodeValue: string): Promise<string | null>;
}
