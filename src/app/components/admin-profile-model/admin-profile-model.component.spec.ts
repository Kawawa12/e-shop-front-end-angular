import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProfileModelComponent } from './admin-profile-model.component';

describe('AdminProfileModelComponent', () => {
  let component: AdminProfileModelComponent;
  let fixture: ComponentFixture<AdminProfileModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminProfileModelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminProfileModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
