export interface IGenerateQr {
  loginSuccess: boolean;
  qrImage: string;
  userImage: string;
}

export interface ILoginResponse {
  loginSuccess: boolean;
  qrImage: string;
}

export interface IGetOrCreateUserSession {
  userId: string;
}
