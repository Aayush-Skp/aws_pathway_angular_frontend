import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactUsSection } from './contact-us-section';

describe('ContactUsSection', () => {
  let component: ContactUsSection;
  let fixture: ComponentFixture<ContactUsSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactUsSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactUsSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
