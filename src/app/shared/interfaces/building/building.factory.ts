import { Building } from './building';

export function createEmptyBuilding(): Building {

  return {
    project: {
      id: crypto.randomUUID(),
      name: 'Untitled Project',
      units: 'm'
    },
    materials: [],
    sections: [],
    levels: [],
    elements: {
      columns: [],
      beams: [],
      walls: [],
      slabs: [],
      roofs: [],
      foundations: [],
      openings: [],
      stairs: []
    },
    loads: [],
    supports: [],
    settings: {
      defaultMaterialId: '',
      defaultSectionId: ''
    }
  };
}