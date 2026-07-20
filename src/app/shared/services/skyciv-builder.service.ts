import { Injectable } from '@angular/core';
// import { Building } from '../interfaces/cad/building';
import { Building } from 'src/app/shared/interfaces/building/building';
import { NodeRegistry } from 'src/app/core/geometry/node-registry';
import { MemberRegistry } from 'src/app/core/geometry/member-registry';
import { ColumnBuilder } from 'src/app/core/geometry/builders/column-builder';
import { BeamBuilder } from 'src/app/core/geometry/builders/beam-builder';
import { GeometryContext } from 'src/app/shared/interfaces/building/geomentry-context';
import { SectionRegistry } from 'src/app/core/geometry/section-registry';

@Injectable({
  providedIn: 'root',
})
export class SkyCivBuilderService {
  build(building: Building) {
    const context: GeometryContext = {
      nextNodeId: 1,
      nextMemberId: 1,
      nextPlateId: 1,
      nextSectionId: 1,
      nodes: {},
      members: {},
      plates: {},
      sections: {},
      sectionMap: new Map(),
    };

    // ----------------------------------------------------
    // Fast lookup maps (O(1) access)
    // ----------------------------
    const sectionMap = new Map(building.sections.map((s) => [s.id, s] as const));

    const materialMap = new Map(building.materials.map((m) => [m.id, m] as const));

    const levelMap = new Map(building.levels.map((l) => [l.id, l] as const));

    // ----------------------------------------------------
    // Registries
    // ----------------------------------------------------
    const nodeRegistry = new NodeRegistry(context);
    const memberRegistry = new MemberRegistry(context);
    const sectionRegistry = new SectionRegistry(context);

    // ----------------------------------------------------
    // Builders
    // ----------------------------------------------------
    const columnBuilder = new ColumnBuilder(nodeRegistry, memberRegistry, sectionRegistry);

    const beamBuilder = new BeamBuilder(nodeRegistry, memberRegistry, sectionRegistry);

    // ----------------------------------------------------
    // Build Columns
    // ----------------------------------------------------
    for (const column of building.elements.columns) {
      const section = sectionMap.get(column.sectionId);

      if (!section) {
        throw new Error(`Section '${column.sectionId}' not found`);
      }

      columnBuilder.build(column, section);
    }

    // ----------------------------------------------------
    // Build Beams
    // ----------------------------------------------------
    for (const beam of building.elements.beams) {
      const section = sectionMap.get(beam.sectionId);

      if (!section) {
        throw new Error(`Section '${beam.sectionId}' not found`);
      }

      beamBuilder.build(beam, section);
    }

    // ----------------------------------------------------
    // Return SkyCiv model
    // ----------------------------------------------------
    console.log('Nodes:', context.nodes);
    console.log('Members:', context.members);
    console.log('Sections:', context.sections);
    return {
      nodes: context.nodes,
      members: context.members,
      sections: context.sections,

      plates: context.plates,

      supports: {},

      loads: {},

      load_combinations: {},
    };
  }
}
