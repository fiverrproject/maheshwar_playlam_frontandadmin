import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMainLayout } from './admin-main-layout';

describe('AdminMainLayout', () => {
  let component: AdminMainLayout;
  let fixture: ComponentFixture<AdminMainLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminMainLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminMainLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
