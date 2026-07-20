import { NodeRegistry } from 'src/app/core/geometry/node-registry';
import { MemberRegistry } from 'src/app/core/geometry/member-registry';
import { Column } from 'src/app/shared/interfaces/building/elements/column';
import { SectionRegistry } from '../section-registry';
import { Section } from 'src/app/shared/interfaces/building/sections';

export class ColumnBuilder {
  constructor(
    private nodeRegistry: NodeRegistry,
    private memberRegistry: MemberRegistry,
    private sectionRegistry: SectionRegistry,
  ) {}

  build(column: Column, section: Section) {
    const nodeI = this.nodeRegistry.getOrCreate(column.base);
    const nodeJ = this.nodeRegistry.getOrCreate(column.top);
    const sectionId = this.sectionRegistry.getOrCreate(section);

    this.memberRegistry.create(nodeI, nodeJ, sectionId);
  }
}
