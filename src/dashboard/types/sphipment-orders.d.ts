export interface ShipmentOrdersCreateInput {
  Id?: bigint | number;
  FirstName: string;
  LastName: string;
  Email: string;
  Phone: string;
  FromCityCode: string;
  BirthDate: string;
  DocumentType: string;
  DocumentId?: string | null;
  SexId: string;
  Ubication: string;
  Sidewalk: string;
  Need?: string | undefined;
  ModifyUserId?: string | null;
}

export type ShipmentOrdersCreateResponse = {
  Id: number;
};
