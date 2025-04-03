import { ReactNode, useState } from 'react';

import { DashboardContext } from '../context';
import type { IGenerateQr } from '../dashboard/types';
import type { SessionStatusEvent, WAConnectionState } from '../dashboard/types/ws';
import type { IAttachFile } from '../types/dashboard';

interface Props {
  children?: ReactNode;
}

export function DashboardProvider({ children }: Props) {
  const attachFiles: IAttachFile[] = [];
  attachFiles.push({ base64: '', type: '', name: '' });

  const [attachedFile, setAttachedFile] = useState<IAttachFile[]>(attachFiles);
   const [sessionStatus, setSessionStatus] =
      useState<WAConnectionState>('close');

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

  const setWsSessionStatus = (status: SessionStatusEvent) =>
    setSessionStatus(status.status);

  return (
    <DashboardContext.Provider
      value={{
        attachFile: attachedFile,
        setAttachFile,
        loginInfo: qrImg,
        setLoginInfo,
        wsSessionStatus: sessionStatus,
        setWsSessionStatus,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
