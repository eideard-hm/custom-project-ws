export interface IAuth {
  isLoggin: boolean;
}

export interface IAuthContextProps {
  auth: IAuth,
  setAuth: (status: IAuth) => void
}
