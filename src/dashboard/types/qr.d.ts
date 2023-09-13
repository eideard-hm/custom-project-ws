export interface IGenerateQr {
  loginSuccess: boolean;
  qrImage: string;
  userImage: string;
  socketId: string;
  reloadPage: boolean;
}

export interface IGetOrCreateUserSession {
  userId: string;
}
