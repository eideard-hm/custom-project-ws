import type { Option } from 'react-multi-select-component';

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
  sendWsContacts: boolean;
  userId?: string;
}

export interface ISendBulkMessage {
  phone: string;
  message: string;
}

export interface IInitialValues {
  service: string;
  message: string;
  sendWsContacts: boolean;
  sex: string;
  sendAllNaturalHoses: boolean;
  economicSector: string;
  peopleSend: Option[];
}
