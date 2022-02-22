export interface IEmailPayload {
  subject: string;
  receivers: string[];
  content: string | Buffer;
  contentData?: any;
};