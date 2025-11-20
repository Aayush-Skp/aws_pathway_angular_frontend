import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Specialization } from './specialization';

describe('Specialization', () => {
  let component: Specialization;
  let fixture: ComponentFixture<Specialization>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Specialization]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Specialization);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
