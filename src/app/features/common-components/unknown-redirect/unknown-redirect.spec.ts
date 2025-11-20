import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnknownRedirect } from './unknown-redirect';

describe('UnknownRedirect', () => {
  let component: UnknownRedirect;
  let fixture: ComponentFixture<UnknownRedirect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnknownRedirect]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnknownRedirect);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
