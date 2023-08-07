import type { INaturalHoseByService } from './natural-hose';
import type { ISex } from './sex';

export interface ShipmentOrdersCreateInput {
  FirstName: string;
  LastName: string;
  Email?: string | undefined;
  Phone?: string | undefined;
  HouseId?: number | undefined;
  BirthDate?: string | undefined;
  DocumentType?: string | undefined;
  DocumentId?: string | undefined;
  SexId: number;
  ServicesId: number;
  Sidewalk: string;
  Need?: string | undefined;
  ModifyUserId?: string;
  EconomicActivity?: number | undefined;
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
