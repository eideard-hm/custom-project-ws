import { ReactNode, useState } from 'react';
import { DashboardContext } from '../context';
import { IAttachFile } from '../types/dashboard';

interface Props {
  children?: ReactNode;
}

export function DashboardProvider({ children }: Props) {
  const [attachedFile, setAttachedFile] = useState<IAttachFile>({
    base64: '',
    type: '',
    name: ''
  });

  const setAttachFile = (file: IAttachFile) => {
    setAttachedFile(file);
  };

  return (
    <DashboardContext.Provider
      value={{ attachFile: attachedFile, setAttachFile }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
