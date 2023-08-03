import { ReactNode, useState } from 'react';

import { DashboardContext } from '../context';
import type { ILoginResponse } from '../dashboard/types';
import type { IAttachFile } from '../types/dashboard';

interface Props {
  children?: ReactNode;
}

export function DashboardProvider({ children }: Props) {
  const [attachedFile, setAttachedFile] = useState<IAttachFile>({
    base64: '',
    type: '',
    name: '',
  });

  const [qrImg, setQrImg] = useState<ILoginResponse>({
    loginSuccess: false,
    qrImage: '',
  });

  const setAttachFile = (file: IAttachFile) => {
    setAttachedFile(file);
  };

  const setLoginInfo = (loginInfo: ILoginResponse) =>
    setQrImg({ ...loginInfo });

  return (
    <DashboardContext.Provider
      value={{
        attachFile: attachedFile,
        setAttachFile,
        loginInfo: qrImg,
        setLoginInfo,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
