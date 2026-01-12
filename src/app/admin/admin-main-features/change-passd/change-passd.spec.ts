import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePassd } from './change-passd';

describe('ChangePassd', () => {
  let component: ChangePassd;
  let fixture: ComponentFixture<ChangePassd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChangePassd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangePassd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
