import { object, string } from 'yup';

import { IFormValues } from '../types';

export const schema = object<IFormValues>().shape({
  email: string().email('Email inválido.').required(),
  password: string().required()
});
