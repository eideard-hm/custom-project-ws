import { IGenerateQr } from '../dashboard/types';

export interface IAttachFileContext {
  attachFile: IAttachFile[];
  setAttachFile: (file: IAttachFile[]) => void;
  loginInfo: IGenerateQr;
  setLoginInfo: (loginInfo: IGenerateQr) => void;
}

export interface IAttachFile {
  base64: string;
  type: string;
  name: string;
}
