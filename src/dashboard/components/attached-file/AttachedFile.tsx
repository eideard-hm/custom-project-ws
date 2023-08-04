/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useRef } from 'react';

import toast from 'react-hot-toast';

import { useDashboardContext } from '../../../hooks';
import { Card } from '../../../shared/components';
import {
  MAX_SIZE_DOCUMENTS_ALLOW_BYTES,
  MAX_SIZE_MEDIA_ALLOW_BYTES
} from '../../../utils';

export function AttachedFile() {
  const { setAttachFile } = useDashboardContext();
  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleFileChosen = (file: File | undefined) => {
    if (!file) {
      toast.error('No se adjunto un archivo valido.');
      setAttachFile({ base64: '', type: '', name: '' });
      inputFileRef.current!.value = '';
      return;
    }

    if (
      file.type.includes('video') ||
      file.type.includes('image') ||
      file.type.includes('audio')
    ) {
      // El tamaño máximo permitido para todos los archivos multimedia (fotos, videos y mensajes de voz) enviados o reenviados por WhatsApp es de 16 MB.
      // 16MB -> 16_777_216bytes
      if (file.size >= MAX_SIZE_MEDIA_ALLOW_BYTES) {
        toast.error('El archivo supera el máximo permitido que son 16MB.');
        setAttachFile({ base64: '', type: '', name: '' });
        inputFileRef.current!.value = '';
        return;
      }
    }

    if (file.type.includes('application')) {
      // Para documentos, el tamaño máximo es de 100 MB.
      if (file.size >= MAX_SIZE_DOCUMENTS_ALLOW_BYTES) {
        toast.error('El archivo supera el máximo permitido que son 100MB.');
        setAttachFile({ base64: '', type: '', name: '' });
        inputFileRef.current!.value = '';
        return;
      }
    }

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      const fileBase64 = fileReader.result?.toString().split(',')[1] ?? '';
      setAttachFile({
        base64: fileBase64,
        type: file.type,
        name: file.name,
      });
    };
    fileReader.onerror = (error) => {
      console.error(error);
      setAttachFile({ base64: '', type: '', name: '' });
    };
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
                  onChange={(e) => handleFileChosen(e.target.files?.[0])}
                />
              </div>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
}
