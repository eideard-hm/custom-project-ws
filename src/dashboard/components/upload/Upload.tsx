import { useContext } from 'react';

import { DashboardContext } from '../../../context';

export function Upload() {
  const { setAttachFile } = useContext(DashboardContext);

  const handleFileChosen = (file: File | undefined) => {
    if (!file || /\.(jpe?g|png|pdf)$/i.test(file.name) === false) {
      setAttachFile({ base64: '', type: '' });
      return;
    }

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      const fileBase64 = fileReader.result?.toString().split(',')[1] ?? '';
      setAttachFile({
        base64: fileBase64,
        type: file.type,
      });
    };
    fileReader.onerror = (error) => {
      console.error(error);
      setAttachFile({ base64: '', type: '' });
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
                  accept='image/*, application/pdf'
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
