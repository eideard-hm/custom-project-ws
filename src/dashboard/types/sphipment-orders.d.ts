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
