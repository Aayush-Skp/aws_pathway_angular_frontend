import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecializationSectionTwo } from './specialization-section-two';

describe('SpecializationSectionTwo', () => {
  let component: SpecializationSectionTwo;
  let fixture: ComponentFixture<SpecializationSectionTwo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecializationSectionTwo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecializationSectionTwo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
