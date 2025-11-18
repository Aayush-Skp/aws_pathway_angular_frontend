import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockExamsSection } from './mock-exams-section';

describe('MockExamsSection', () => {
  let component: MockExamsSection;
  let fixture: ComponentFixture<MockExamsSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MockExamsSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MockExamsSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
