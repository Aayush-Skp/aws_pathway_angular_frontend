import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrequentlyAskedQuestionsSection } from './frequently-asked-questions-section';

describe('FrequentlyAskedQuestionsSection', () => {
  let component: FrequentlyAskedQuestionsSection;
  let fixture: ComponentFixture<FrequentlyAskedQuestionsSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrequentlyAskedQuestionsSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrequentlyAskedQuestionsSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
