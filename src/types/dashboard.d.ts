import { ILoginResponse } from '../dashboard/types';

export interface IAttachFileContext {
  attachFile: IAttachFile;
  setAttachFile: (file: IAttachFile) => void;
  loginInfo: ILoginResponse;
  setLoginInfo: (loginInfo: ILoginResponse) => void;
}

export interface IAttachFile {
  base64: string;
  type: string;
  name: string;
}
