import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditImagProfComponent } from './edit-imag-prof.component';

describe('EditImagProfComponent', () => {
  let component: EditImagProfComponent;
  let fixture: ComponentFixture<EditImagProfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditImagProfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditImagProfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
