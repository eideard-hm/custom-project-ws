import { useCallback } from 'react';

import toast from 'react-hot-toast';

import {
  buildPayload,
  FilterCriteria,
  filterRecipients,
  isAtLeastAge,
  MIN_AGE,
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
  validateDateOfBirth: boolean;
  attach: ISendBulkMessageWithAttach['attach'];
  onSuccess?: () => void;
};

export function useBulkMessaging({
  shipments,
  fullName,
  validateDateOfBirth,
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
      let recipients: ShipmentOrdersResponse[] = [];

      if (!form.sendWsContacts) {
        recipients = filterRecipients(shipments, criteria);

        if (recipients.length === 0) {
          toast.error(
            'No se encontraron receptores para los criterios de búsqueda.',
          );
          return;
        }

        if (validateDateOfBirth) {
          recipients = recipients.filter((r) => {
            if (!r.BirthDate) return true;
            return isAtLeastAge(r.BirthDate, MIN_AGE);
          });

          if (recipients.length === 0) {
            toast.error(
              `Todos los receptores con fecha de nacimiento registrada son menores de ${MIN_AGE} años.`,
            );
            return;
          }
        }
      } else {
        // send template for build when send to their ws contacts
        recipients = [
          {
            Phone: '573104867527',
            FullName: 'Jhon Doe',
            Id: Date.now(),
            Email: null,
            BirthDate: null,
            DocumentType: null,
            NaturalHose: null,
            NaturalHose_ShipmentOrders_EconomicActivityToNaturalHose: null,
            Services_ShipmentOrders_ServiceActivityIdToServices: null,
            Services: {
              Id: 1,
              TitleNameServices: 'Servicio de prueba',
            },
            Sex: {
              Id: 1,
              TitleNaturalHose: 'Masculino',
            },
          },
        ];
      }

      const payload = buildPayload(
        form.message,
        recipients,
        {
          sendWsContacts: form.sendWsContacts,
          user: fullName,
          location: town,
        },
        attach,
      );

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
    [shipments, fullName, town, attach, validateDateOfBirth, onSuccess],
  );

  return { send };
}
