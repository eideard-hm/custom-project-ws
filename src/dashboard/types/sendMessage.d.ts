import type { IAttachFile } from '../../types';

export interface ISendMessageLead {
  message: string;
  phone: string;
}

export interface ISendMessageResponse {
  responseDbSave: Lead | null | undefined;
  responseExSave: { id?: string; error?: string };
}

export interface Lead {
  uuid: string;
  message: string;
  phone: string;
}

export interface ISendBulkMessageWithAttach {
  content: ISendBulkMessage[];
  attach: IAttachFile;
}

export interface ISendBulkMessage {
  fullName: string;
  phone: string;
}
