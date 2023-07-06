export interface IAuth {
  isLoggin: boolean;
}

export interface IAuthContextProps {
  auth: IAuth,
  setAuth: React.Dispatch<React.SetStateAction<IAuth>>
}
