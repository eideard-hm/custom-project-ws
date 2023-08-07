import type { INaturalHoseByService } from './natural-hose';
import type { ISex } from './sex';

export interface ShipmentOrdersCreateInput {
  FirstName: string;
  LastName: string;
  Email?: string | undefined;
  Phone?: string | undefined;
  HouseId?: number | null;
  BirthDate?: string | undefined;
  DocumentType?: string | undefined;
  DocumentId?: string | undefined;
  SexId: number;
  ServicesId: number | string;
  Sidewalk: string;
  Need?: string | null;
  ModifyUserId?: string;
  EconomicActivity?: number | null;
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
  Need: string | null;
  Sex: ISex;
  Services: Services;
}

export interface Services {
  Id: number;
  TitleNameServices: string;
  NaturalHose: INaturalHoseByService[];
}

export interface IShipmentOrdersCreateInput extends ShipmentOrdersCreateInput {
  serviceCode: string;
  naturalHose: string | undefined;
}
