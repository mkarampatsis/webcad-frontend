import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpBox } from './help-box';

describe('HelpBox', () => {
  let component: HelpBox;
  let fixture: ComponentFixture<HelpBox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelpBox],
    }).compileComponents();

    fixture = TestBed.createComponent(HelpBox);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
