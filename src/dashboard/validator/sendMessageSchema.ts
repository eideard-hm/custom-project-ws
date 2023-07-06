import { object, string } from 'yup';

import type { ISendMessageLead } from '../types';

export const sendMessageLeadSchema = object<ISendMessageLead>().shape({
  phone: string().required('El número de teléfono es requerido').trim(),
  message: string().required('El número de teléfono es requerido').trim(),
});
