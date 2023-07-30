export interface IFormValues {
  email: string;
  password: string;
}

export interface ILoginResponse {
  loginSuccess: boolean;
  userData: IUserDataLogin;
}

export interface IUserDataLogin {
  userId: string;
  fullName: string;
  town: string;
}
