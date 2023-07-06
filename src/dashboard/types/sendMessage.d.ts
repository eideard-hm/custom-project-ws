export interface ISendMessageLead {
  message: string;
  phone: string;
}

export interface ISendMessageResponse {
  responseDbSave: Lead | null | undefined;
  responseExSave: { id: string };
}

export interface Lead {
  uuid: string;
  message: string;
  phone: string;
}
