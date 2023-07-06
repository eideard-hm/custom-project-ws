import { useFormik } from 'formik';
import toast from 'react-hot-toast';

import { Card } from '../../../shared/components';
import { sendMesssageLead } from '../../services';
import type { ISendMessageLead } from '../../types';
import { sendMessageLeadSchema } from '../../validator/sendMessageSchema';

export function FormMessages() {
  const submitForm = async (values: ISendMessageLead) => {
    if (!isValid) return;

    const { responseExSave } = await sendMesssageLead(values);

    if (isNaN(Number(responseExSave.id))) {
      toast.error(responseExSave.id);
      return;
    }

    toast.success('Mensage enviado correctamente!');
  };

  const { handleChange, handleSubmit, isValid } = useFormik<ISendMessageLead>({
    initialValues: {
      message: '',
      phone: '57',
    },
    onSubmit: submitForm,
    validationSchema: sendMessageLeadSchema,
  });

  return (
    <Card>
      <div className='col-12'>
        <div className='card-header'>
          <h4>Enviar mensaje</h4>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='card-body'>
            <div className='form-group'>
              <label>Número de Teléfono</label>
              <div className='input-group'>
                <div className='input-group-prepend'>
                  <div className='input-group-text'>
                    <i className='fas fa-phone'></i>
                  </div>
                </div>
                <input
                  type='text'
                  name='phone'
                  className='form-control phone-number'
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className='form-group mb-0'>
              <label>Mensaje</label>
              <textarea
                className='form-control'
                name='message'
                onChange={handleChange}
              ></textarea>
            </div>
          </div>

          <div className='card-footer text-right'>
            <button
              className='btn btn-primary mr-1'
              type='submit'
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </Card>
  );
}
