import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageViewModelComponent } from './image-view-model.component';

describe('ImageViewModelComponent', () => {
  let component: ImageViewModelComponent;
  let fixture: ComponentFixture<ImageViewModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageViewModelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageViewModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
