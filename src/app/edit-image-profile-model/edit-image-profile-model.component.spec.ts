import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditImageProfileModelComponent } from './edit-image-profile-model.component';

describe('EditImageProfileModelComponent', () => {
  let component: EditImageProfileModelComponent;
  let fixture: ComponentFixture<EditImageProfileModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditImageProfileModelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditImageProfileModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
