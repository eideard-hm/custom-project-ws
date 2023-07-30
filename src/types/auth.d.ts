export interface IAuth {
  isLoggin: boolean;
}

export interface IAuthContextProps {
  auth: IAuth;
  setAuth: (status: IAuth) => void;
  userData: IUserData,
  setUserData: (userData: IUserData) => void
}

export interface IUserData {
  fullName: string;
  town: string;
  userImage: string;
}
