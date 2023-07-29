import { useContext } from 'react';

import toast from 'react-hot-toast';

import { DashboardContext } from '../../../context';

export function Upload() {
  const { setAttachFile } = useContext(DashboardContext);

  const handleFileChosen = (file: File | undefined) => {
    if (!file) {
      toast.error('No se adjunto un archivo valido.');
      setAttachFile({ base64: '', type: '', name: '' });
      return;
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
        <div className='card'>
          <div className='card-header'>
            <h4>Seleccionar Archivo a Envíar</h4>
          </div>
          <div className='card-body'>
            <form className='dropzone dz-clickable'>
              <div className='form-group'>
                <input
                  type='file'
                  className='form-control'
                  onChange={(e) => handleFileChosen(e.target.files?.[0])}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
