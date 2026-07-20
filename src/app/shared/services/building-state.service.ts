import { Injectable } from '@angular/core';
import { Building } from 'src/app/shared/interfaces/building/building';
import { createEmptyBuilding } from 'src/app/shared/interfaces/building/building.factory';

@Injectable({
  providedIn: 'root'
})
export class BuildingStateService {

  building: Building = createEmptyBuilding();

}