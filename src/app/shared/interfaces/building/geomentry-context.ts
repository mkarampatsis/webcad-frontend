import { Section } from 'src/app/shared/interfaces/building/sections';

export interface GeometryContext {
    nextNodeId: number;
    nextMemberId: number;
    nextPlateId: number;
    nextSectionId: number;
    nodes: Record<number, any>;
    members: Record<number, any>;
    plates: Record<number, any>;
    sections: Record<number, any>;
    sectionMap: Map<string, number>;
}

// export interface GeometryContext {
//   nextNodeId: number;
//   nextMemberId: number;
//   nextPlateId: number;
//   nodes: Record<number, any>;
//   members: Record<number, any>;
//   plates: Record<number, any>;
// }