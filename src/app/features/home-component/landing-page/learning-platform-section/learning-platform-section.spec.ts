import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningPlatformSection } from './learning-platform-section';

describe('LearningPlatformSection', () => {
  let component: LearningPlatformSection;
  let fixture: ComponentFixture<LearningPlatformSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearningPlatformSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearningPlatformSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
