export interface IAttachFileContext {
  attachFile: IAttachFile;
  setAttachFile: (file: IAttachFile) => void;
}

export interface IAttachFile {
  base64: string;
  type: string;
}
