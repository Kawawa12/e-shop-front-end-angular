import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdminModelComponent } from './add-admin-model.component';

describe('AddAdminModelComponent', () => {
  let component: AddAdminModelComponent;
  let fixture: ComponentFixture<AddAdminModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAdminModelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAdminModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
