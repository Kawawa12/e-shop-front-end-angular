import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesBasedDateModelComponent } from './sales-based-date-model.component';

describe('SalesBasedDateModelComponent', () => {
  let component: SalesBasedDateModelComponent;
  let fixture: ComponentFixture<SalesBasedDateModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesBasedDateModelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesBasedDateModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
