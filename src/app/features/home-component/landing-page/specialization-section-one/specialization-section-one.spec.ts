import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecializationSectionOne } from './specialization-section-one';

describe('SpecializationSectionOne', () => {
  let component: SpecializationSectionOne;
  let fixture: ComponentFixture<SpecializationSectionOne>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecializationSectionOne]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecializationSectionOne);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
