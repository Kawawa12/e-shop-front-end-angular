import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterProductsModelComponent } from './filter-products-model.component';

describe('FilterProductsModelComponent', () => {
  let component: FilterProductsModelComponent;
  let fixture: ComponentFixture<FilterProductsModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterProductsModelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterProductsModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
