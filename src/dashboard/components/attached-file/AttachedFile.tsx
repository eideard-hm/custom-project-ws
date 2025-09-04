/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useRef } from 'react';

import toast from 'react-hot-toast';

import { useDashboardContext } from '../../../hooks';
import { Card } from '../../../shared/components';
import {
  MAX_SIZE_DOCUMENTS_ALLOW_BYTES,
  MAX_SIZE_MEDIA_ALLOW_BYTES,
} from '../../../utils';

import type { IAttachFile } from '../../../../src/types/dashboard';

export function AttachedFile() {
  const { setAttachFile } = useDashboardContext();
  const inputFileRef = useRef<HTMLInputElement>(null);
  const handleFileChosen = (file: FileList | null) => {
    if (!file) {
      toast.error('No se adjunto un archivo valido.');
      inputFileRef.current!.value = '';
      return;
    }

    const files = file ? [...file] : [];
    // 👇 Create new FormData object and append files
    const data = new FormData();
    const attachFiles: IAttachFile[] = [];

    files.forEach((element, i) => {
      if (
        element.type.includes('video') ||
        element.type.includes('image') ||
        element.type.includes('audio') ||
        element.type.startsWith('application/') ||
        element.type.startsWith('text/')
      ) {
        // El tamaño máximo permitido para todos los archivos multimedia (fotos, videos y mensajes de voz) enviados o reenviados por WhatsApp es de 16 MB.
        // 16MB -> 16_777_216bytes
        if (element.size >= MAX_SIZE_MEDIA_ALLOW_BYTES) {
          toast.error('El archivo supera el máximo permitido que son 16MB.');
          attachFiles.push({ base64: '', type: '', name: '' });
          setAttachFile(attachFiles);
          inputFileRef.current!.value = '';
          return;
        }

        if (element.type.includes('application')) {
          // Para documentos, el tamaño máximo es de 100 MB.
          if (element.size >= MAX_SIZE_DOCUMENTS_ALLOW_BYTES) {
            toast.error('El archivo supera el máximo permitido que son 100MB.');
            attachFiles.push({ base64: '', type: '', name: '' });
            setAttachFile(attachFiles);
            inputFileRef.current!.value = '';
            return;
          }
        }

        data.append(`file-${i}`, element, element.name);
        const fileReader = new FileReader();
        fileReader.readAsDataURL(element);
        fileReader.onload = () => {
          const fileBase64 = fileReader.result?.toString() ?? '';
          attachFiles.push({
            base64: fileBase64,
            type: element.type,
            name: element.name,
          });
        };
        fileReader.onerror = (error) => {
          console.error(error);
          setAttachFile([]);
        };
      }
    });
    console.log({ attachFiles });
    setAttachFile(attachFiles);
  };

  return (
    <div className='row'>
      <div className='col-12'>
        <Card>
          <div className='card-header'>
            <h4>Seleccionar Archivo a Envíar</h4>
          </div>
          <div className='card-body'>
            <form className='dropzone dz-clickable'>
              <div className='form-group'>
                <input
                  ref={inputFileRef}
                  type='file'
                  className='form-control'
                  multiple
                  onChange={(e) => handleFileChosen(e?.target?.files)}
                />
              </div>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
}
