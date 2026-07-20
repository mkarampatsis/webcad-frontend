import { GeometryContext } from "src/app/shared/interfaces/building/geomentry-context";
import { Section } from "src/app/shared/interfaces/building/sections";

export class SectionRegistry {
  constructor(private context: GeometryContext) {}

  getOrCreate(section: Section): number {
    const existing = this.context.sectionMap.get(section.id);

    if (existing !== undefined) {
      return existing;
    }

    const id = this.context.nextSectionId++;

    this.context.sections[id] = {
      type: 'rect',
      b: section.width,
      d: section.height,
    };

    this.context.sectionMap.set(section.id, id);
    return id;
  }
}
