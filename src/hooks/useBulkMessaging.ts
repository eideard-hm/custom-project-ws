import { useCallback } from 'react';

import toast from 'react-hot-toast';

import {
  buildPayload,
  FilterCriteria,
  filterRecipients,
  validateTemplate,
} from '../dashboard/domain/bulkMessaging';
import { sendMesssageBulkAsync } from '../dashboard/services';
import type {
  IInitialValues,
  ISendBulkMessageWithAttach,
  ShipmentOrdersResponse,
} from '../dashboard/types';

type Deps = {
  shipments: ShipmentOrdersResponse[];
  fullName: string;
  town: string;
  attach: ISendBulkMessageWithAttach['attach'];
  onSuccess?: () => void;
};

export function useBulkMessaging({
  shipments,
  fullName,
  town,
  attach,
  onSuccess,
}: Deps) {
  const send = useCallback(
    async (form: IInitialValues, criteria: FilterCriteria) => {
      // 1) Validación template
      const v = validateTemplate(form.message);
      if (v.ok === false) {
        const missing = v.missing.join(', ');
        toast.error(`Faltan tokens: ${missing}`);
        return;
      }

      // 2) Filtrado
      const recipients = filterRecipients(shipments, criteria);
      if (recipients.length === 0) {
        toast.error(
          'No se encontraron receptores para los criterios de búsqueda.'
        );
        return;
      }

      // 3) Payload
      const payload = buildPayload(
        form.message,
        recipients,
        { sendWsContacts: form.sendWsContacts, user: fullName, location: town },
        attach
      );

      // 4) Llamada API
      const res = await sendMesssageBulkAsync(payload);

      if (!res || res.length === 0) {
        toast.error('No se recibió respuesta del servidor.');
        return;
      }

      const hasErr = res.some((r: any) => r?.error);
      if (hasErr) {
        res
          .filter((r: any) => r?.error)
          .forEach(({ error }: any) => toast.error(error || 'Error'));
        return;
      }

      toast.success(`Mensajes enviados correctamente: ${res.length}`);
      onSuccess?.();
    },
    [shipments, fullName, town, attach, onSuccess]
  );

  return { send };
}
