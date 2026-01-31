import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LamPdf } from './lam-pdf';

describe('LamPdf', () => {
  let component: LamPdf;
  let fixture: ComponentFixture<LamPdf>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LamPdf]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LamPdf);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
