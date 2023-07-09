import { FormikHelpers, useFormik } from 'formik';
import toast from 'react-hot-toast';

import { Card } from '../../../shared/components';
import { sendMesssageLead } from '../../services';
import type { ISendMessageLead } from '../../types';
import { sendMessageLeadSchema } from '../../validator/sendMessageSchema';

const initialValuesForm: ISendMessageLead = {
  message: '',
  phone: '',
};

export function FormMessages() {
  const submitForm = async (
    values: ISendMessageLead,
    { resetForm }: FormikHelpers<ISendMessageLead>
  ) => {
    if (!isValid) return;

    const message = { ...values };
    message.phone = `57${values.phone}`;
    const { responseExSave } = await sendMesssageLead(message);

    if (responseExSave.error) {
      toast.error(responseExSave.error);
      return;
    }

    toast.success(`Mensage enviado correctamente! ${responseExSave.id}`);
    resetForm({ values: initialValuesForm });
  };

  const { dirty, handleChange, handleSubmit, isValid, values } =
    useFormik<ISendMessageLead>({
      initialValues: initialValuesForm,
      enableReinitialize: true,
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
                    57
                  </div>
                </div>
                <input
                  type='text'
                  name='phone'
                  autoFocus={true}
                  className='form-control phone-number'
                  onChange={handleChange}
                  value={values.phone}
                />
              </div>
            </div>
            <div className='form-group mb-0'>
              <label>Mensaje</label>
              <textarea
                className='form-control'
                name='message'
                onChange={handleChange}
                value={values.message}
              ></textarea>
            </div>
          </div>

          <div className='card-footer text-right'>
            <button
              className='btn btn-primary mr-1'
              type='submit'
              disabled={!dirty}
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </Card>
  );
}
