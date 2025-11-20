import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwsCertification } from './aws-certification';

describe('AwsCertification', () => {
  let component: AwsCertification;
  let fixture: ComponentFixture<AwsCertification>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AwsCertification]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AwsCertification);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
