import { equalsIgnoringCase } from '../../utils';
import type {
  ISendBulkMessage,
  ISendBulkMessageWithAttach,
  ShipmentOrdersResponse,
} from '../types';

export type FilterCriteria = {
  peopleIds?: string[];
  serviceId?: string;
  sexId?: string;
  economicSectorId?: string;
  naturalHoseIdsByService?: string[];
  naturalHoseIdsByEco?: string[];
  sendAllNaturalHoses: boolean;
};

export type TemplateContext = {
  user: string;
  location: string;
  receiverName: string;
};

export const REQUIRED_TOKENS = ['{name}', '{user}', '{location}'] as const;

export function validateTemplate(
  message: string
): { ok: true } | { ok: false; missing: string[] } {
  const lower = message.toLowerCase();
  const missing = REQUIRED_TOKENS.filter((t) => !lower.includes(t));
  return missing.length ? { ok: false, missing } : { ok: true };
}

export function compileTemplate(
  template: string,
  ctx: TemplateContext,
  keepTokens = false
): string {
  if (keepTokens) return template;
  return template
    .replace(/{name}/gi, `*${ctx.receiverName.trim()}*`)
    .replace(/{user}/gi, `*${ctx.user.trim()}*`)
    .replace(/{location}/gi, `*${ctx.location.trim()}*`);
}

/** Filtrado puro, O(n) con sets para mejor perf. */
export function filterRecipients(
  shipments: ShipmentOrdersResponse[],
  criteria: FilterCriteria
): ShipmentOrdersResponse[] {
  let result = shipments;

  const peopleSet = new Set((criteria.peopleIds ?? []).map(String));
  if (peopleSet.size > 0) {
    result = result.filter((s) => peopleSet.has(String(s.Id)));
  }

  if (criteria.serviceId) {
    result = result.filter((s) =>
      equalsIgnoringCase(String(s.Services?.Id ?? ''), criteria.serviceId!)
    );
  }

  if (criteria.sexId) {
    result = result.filter((s) =>
      equalsIgnoringCase(String(s.Sex?.Id ?? ''), criteria.sexId!)
    );
  }

  if (criteria.economicSectorId) {
    result = result.filter((s) =>
      equalsIgnoringCase(
        String(s.Services_ShipmentOrders_ServiceActivityIdToServices?.Id ?? ''),
        criteria.economicSectorId!
      )
    );
  }

  if (!criteria.sendAllNaturalHoses) {
    const hoseSet = new Set(
      (criteria.naturalHoseIdsByService ?? []).map(String)
    );
    if (hoseSet.size > 0) {
      result = result.filter((s) =>
        hoseSet.has(String(s.NaturalHose?.Id ?? ''))
      );
    }
  }

  const econHoseSet = new Set((criteria.naturalHoseIdsByEco ?? []).map(String));
  if (econHoseSet.size > 0) {
    result = result.filter((s) =>
      econHoseSet.has(
        String(
          s.NaturalHose_ShipmentOrders_EconomicActivityToNaturalHose?.Id ?? ''
        )
      )
    );
  }

  return result;
}

/** Construye el payload final para el API. */
export function buildPayload(
  template: string,
  recipients: ShipmentOrdersResponse[],
  opts: { sendWsContacts: boolean; user: string; location: string },
  attach: ISendBulkMessageWithAttach['attach']
): ISendBulkMessageWithAttach {
  const content: ISendBulkMessage[] = recipients
    .filter((r) => r.Phone)
    .map((r) => ({
      phone: r.Phone ?? '',
      message: compileTemplate(
        template,
        {
          receiverName: r.FullName ?? '',
          user: opts.user,
          location: opts.location,
        },
        opts.sendWsContacts
      ),
    }));

  return { content, attach, sendWsContacts: opts.sendWsContacts };
}
