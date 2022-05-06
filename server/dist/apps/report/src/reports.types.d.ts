export declare enum PDFFormat {
    A0 = "A0",
    A1 = "A1",
    A2 = "A2",
    A3 = "A3",
    A4 = "A4",
    A5 = "A5",
    A6 = "A6",
    Letter = "Letter"
}
export declare class IPdfDownloadPayload {
    html: string;
    landscape?: boolean;
    format?: PDFFormat;
    margin?: any;
}
export declare class IXlsxDownloadPayload {
    data: Record<string, string>[];
}
