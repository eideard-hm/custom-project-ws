import { memo } from 'react';

import type { FormikErrors } from 'formik';
import { MultiSelect, type Option } from 'react-multi-select-component';

import type { IInitialValues } from '../../types';

import generalStyles from './General.module.css';
import styles from './MessageEditor.module.css';

interface Props {
  peopleSendOptions: Option[];
  values: IInitialValues;
  handleChange: (e: any) => void;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean
  ) => Promise<void> | Promise<FormikErrors<IInitialValues>>;
}

function MessageEditor({
  peopleSendOptions,
  values,
  handleChange,
  setFieldValue,
}: Props) {
  return (
    <div className={generalStyles.card}>
      <h3 className={generalStyles.title}>Destinatarios y mensaje</h3>

      <div className={styles.container}>
        <div className={styles.group}>
          <label className={styles.label}>Personas a Enviar</label>
          <MultiSelect
            value={values.peopleSend}
            options={peopleSendOptions}
            onChange={(opts: Option[]) => setFieldValue('peopleSend', opts)}
            labelledBy='Select'
            className={generalStyles.multiSelect}
          />
        </div>

        <div className={styles.group}>
          <label className={styles.label}>
            Mensaje <span className={styles.required}>*</span>
          </label>
          <textarea
            className={styles.textarea}
            name='message'
            value={values.message}
            onChange={handleChange}
            placeholder='Escribe tu mensaje aquí... Recuerda usar las convenciones {name}, {user}, {location}'
            required
          />
          <div className={styles.tokenRow}>
            {['{name}', '{user}', '{location}'].map((t) => (
              <button
                key={t}
                type='button'
                className={styles.tokenBtn}
                onClick={() =>
                  setFieldValue(
                    'message',
                    `${values.message}${
                      values.message.endsWith(' ') || values.message === ''
                        ? ''
                        : ' '
                    }${t} `
                  )
                }
              >
                Insertar {t}
              </button>
            ))}
          </div>
        </div>

        <label className={styles.checkboxRow}>
          <input
            className={styles.checkbox}
            type='checkbox'
            name='sendWsContacts'
            id='send-ws-contacts'
            checked={values.sendWsContacts}
            onChange={handleChange}
          />
          <span>
            Enviar a mis <strong>contactos de WhatsApp</strong>
          </span>
        </label>
      </div>
    </div>
  );
}

export default memo(MessageEditor);
