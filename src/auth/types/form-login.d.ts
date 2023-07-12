export interface IFormValues {
  email: string;
  password: string;
}

export interface ILoginResponse {
  loginSuccess: boolean;
  userId: string;
}
