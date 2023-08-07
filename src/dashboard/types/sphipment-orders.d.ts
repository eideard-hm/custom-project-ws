import type { INaturalHoseByService } from './natural-hose';
import type { ISex } from './sex';

export interface ShipmentOrdersCreateInput {
  FirstName: string;
  LastName: string;
  Email?: string | undefined;
  Phone?: string | undefined;
  HouseId?: string | undefined;
  BirthDate?: string | undefined;
  DocumentType?: string | undefined;
  DocumentId?: string | undefined;
  SexId: number | string;
  ServicesId: number | string;
  Sidewalk: string;
  Need?: string | null;
  ModifyUserId?: string;
  EconomicActivity?: string | undefined;
  ServiceActivityId?: string | undefined;
}

export type ShipmentOrdersCreateResponse = {
  Id: number;
};

export interface ShipmentOrdersResponse {
  FirstName: string;
  LastName: string;
  Email: string | null;
  Phone: string | null;
  BirthDate: string | null;
  DocumentType: string | null;
  Sex: ISex;
  Services: Services;
  NaturalHose: INaturalHoseByService | null;
  NaturalHose_ShipmentOrders_EconomicActivityToNaturalHose: INaturalHoseByService | null;
  Services_ShipmentOrders_ServiceActivityIdToServices: Services | null;
}

export interface Services {
  Id: number;
  TitleNameServices: string;
}
