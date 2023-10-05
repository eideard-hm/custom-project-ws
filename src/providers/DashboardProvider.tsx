import { ReactNode, useState } from 'react';

import { DashboardContext } from '../context';
import type { IGenerateQr } from '../dashboard/types';
import type { IAttachFile } from '../types/dashboard';

interface Props {
  children?: ReactNode;
}

export function DashboardProvider({ children }: Props) {
  
  const attachFiles: IAttachFile[] = [];
  attachFiles.push({ base64: '', type: '', name: '' })
          
  const [attachedFile, setAttachedFile] = useState<IAttachFile[]>(attachFiles);

  const [qrImg, setQrImg] = useState<IGenerateQr>({
    loginSuccess: false,
    qrImage: '',
    userImage: '',
    reloadPage: false,
    socketId: '',
  });

  const setAttachFile = (file: IAttachFile[]) => {
    setAttachedFile(file);
  };

  const setLoginInfo = (loginInfo: IGenerateQr) => setQrImg({ ...loginInfo });

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
