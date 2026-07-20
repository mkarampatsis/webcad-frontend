import { Injectable, inject } from '@angular/core';

import { BuildingStateService } from './building-state.service';

import { Operation } from 'src/app/shared/models/operation.model';
import { OperationType } from 'src/app/shared/models/operation-type';

import { Level } from 'src/app/shared/interfaces/building/level';
import { Slab } from 'src/app/shared/interfaces/building/elements/slab';
import { Column } from 'src/app/shared/interfaces/building/elements/column';
import { Beam } from 'src/app/shared/interfaces/building/elements/beam';
import { Wall } from 'src/app/shared/interfaces/building/elements/wall';
import { Roof } from 'src/app/shared/interfaces/building/elements/roof';
import { Foundation } from 'src/app/shared/interfaces/building/elements/foundation';

@Injectable({
  providedIn: 'root',
})
export class OperationExecutorService {
  private buildingState = inject(BuildingStateService);

  execute(operations: Operation[]): void {
    for (const operation of operations) {
      switch (operation.type) {
        case OperationType.CREATE_LEVEL:
          this.createLevel(operation.parameters);
          break;
        case OperationType.CREATE_SLAB:
          this.createSlab(operation.parameters);
          break;
        case OperationType.CREATE_COLUMN:
          this.createColumn(operation.parameters);
          break;
        case OperationType.CREATE_BEAM:
          this.createBeam(operation.parameters);
          break;
        case OperationType.CREATE_WALL:
          this.createWall(operation.parameters);
          break;
        case OperationType.CREATE_ROOF:
          this.createRoof(operation.parameters);
          break;
        case OperationType.CREATE_FOUNDATION:
          this.createFoundation(operation.parameters);
          break;
        default:
          console.warn('Unknown operation', operation);
      }
    }
  }

  private createLevel(parameters: any): void {
    const level: Level = {
      id: crypto.randomUUID(),
      name: parameters.name,
      elevation: parameters.elevation,
    };
    this.buildingState.building.levels.push(level);
  }

  private createSlab(parameters: any): void {
    const slab: Slab = {
      id: crypto.randomUUID(),
      name: parameters.name,
      levelId: parameters.levelId,
      materialId: parameters.materialId,
      thickness: parameters.thickness,
      vertices: parameters.vertices,
    };

    this.buildingState.building.elements.slabs.push(slab);
  }

  private createColumn(parameters: any): void {
    const column: Column = {
      id: crypto.randomUUID(),
      name: parameters.name,
      levelId: parameters.levelId,
      materialId: parameters.materialId,
      sectionId: parameters.sectionId,
      base: parameters.base,
      top: parameters.top,
    };

    this.buildingState.building.elements.columns.push(column);
  }

  private createBeam(parameters: any): void {
    const beam: Beam = {
      id: crypto.randomUUID(),
      name: parameters.name,
      levelId: parameters.levelId,
      materialId: parameters.materialId,
      sectionId: parameters.sectionId,
      start: parameters.start,
      end: parameters.end,
    };

    this.buildingState.building.elements.beams.push(beam);
  }

  private createWall(parameters: any): void {
    const wall: Wall = {
      id: crypto.randomUUID(),
      name: parameters.name,
      levelId: parameters.levelId,
      materialId: parameters.materialId,
      vertices: parameters.vertices,
      height: parameters.height,
      thickness: parameters.thickness,
    };

    this.buildingState.building.elements.walls.push(wall);
  }

  private createRoof(parameters: any): void {
    const roof: Roof = {
      id: crypto.randomUUID(),
      name: parameters.name,
      levelId: parameters.levelId,
      materialId: parameters.materialId,
      type: parameters.type,
      vertices: parameters.vertices,
      height: parameters.height,
    };

    this.buildingState.building.elements.roofs.push(roof);
  }

  private createFoundation(parameters: any): void {
    const foundation: Foundation = {
      id: crypto.randomUUID(),
      name: parameters.name,
      levelId: parameters.levelId,
      materialId: parameters.materialId,
      type: parameters.type,
      vertices: parameters.vertices,
      thickness: parameters.thickness,
    };

    this.buildingState.building.elements.foundations.push(foundation);
  }
}
