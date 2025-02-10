import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectAddSalesComponent } from './direct-add-sales.component';

describe('DirectAddSalesComponent', () => {
  let component: DirectAddSalesComponent;
  let fixture: ComponentFixture<DirectAddSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DirectAddSalesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirectAddSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
