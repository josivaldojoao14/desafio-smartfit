import { Locations } from "./locations.interface";

export interface UnitsResponse {
  current_country_id: number,
  locations: Locations[]
}
