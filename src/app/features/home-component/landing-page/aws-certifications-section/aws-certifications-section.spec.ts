import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwsCertificationsSection } from './aws-certifications-section';

describe('AwsCertificationsSection', () => {
  let component: AwsCertificationsSection;
  let fixture: ComponentFixture<AwsCertificationsSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AwsCertificationsSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AwsCertificationsSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
