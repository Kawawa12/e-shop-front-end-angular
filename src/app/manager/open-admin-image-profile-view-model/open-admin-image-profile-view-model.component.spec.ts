import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenAdminImageProfileViewModelComponent } from './open-admin-image-profile-view-model.component';

describe('OpenAdminImageProfileViewModelComponent', () => {
  let component: OpenAdminImageProfileViewModelComponent;
  let fixture: ComponentFixture<OpenAdminImageProfileViewModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpenAdminImageProfileViewModelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenAdminImageProfileViewModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
