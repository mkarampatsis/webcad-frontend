import { NodeRegistry } from 'src/app/core/geometry/node-registry';
import { MemberRegistry } from 'src/app/core/geometry/member-registry';
import { Beam } from 'src/app/shared/interfaces/building/elements/beam';
import { SectionRegistry } from '../section-registry';
import { Section } from 'src/app/shared/interfaces/building/sections';

export class BeamBuilder {
  constructor(
    private nodeRegistry: NodeRegistry,
    private memberRegistry: MemberRegistry,
    private sectionRegistry: SectionRegistry,
  ) {}

  build(beam: Beam, section: Section): void {
    const nodeI = this.nodeRegistry.getOrCreate(beam.start);
    const nodeJ = this.nodeRegistry.getOrCreate(beam.end);
    const sectionId = this.sectionRegistry.getOrCreate(section);

    this.memberRegistry.create(nodeI, nodeJ, sectionId);
  }
}
