import { Building } from "../building/building";

export interface AIRequest {
  prompt: string;
  building: Building;
}