import type { IGenerateQr } from '../dashboard/types';
import type { SessionStatusEvent, WAConnectionState } from '../dashboard/types/ws';

export interface IAttachFileContext {
  attachFile: IAttachFile[];
  setAttachFile: (file: IAttachFile[]) => void;
  loginInfo: IGenerateQr;
  setLoginInfo: (loginInfo: IGenerateQr) => void;
  wsSessionStatus: WAConnectionState;
  setWsSessionStatus: (sessionStatus: SessionStatusEvent) => void;
}

export interface IAttachFile {
  base64: string;
  type: string;
  name: string;
}
