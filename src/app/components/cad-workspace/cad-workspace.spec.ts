import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadWorkspace } from './cad-workspace';

describe('CadWorkspace', () => {
  let component: CadWorkspace;
  let fixture: ComponentFixture<CadWorkspace>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadWorkspace],
    }).compileComponents();

    fixture = TestBed.createComponent(CadWorkspace);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
