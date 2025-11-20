import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningTrack } from './learning-track';

describe('LearningTrack', () => {
  let component: LearningTrack;
  let fixture: ComponentFixture<LearningTrack>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearningTrack]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearningTrack);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
