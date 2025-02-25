import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesRecordsComponent } from './sales-records.component';

describe('SalesRecordsComponent', () => {
  let component: SalesRecordsComponent;
  let fixture: ComponentFixture<SalesRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesRecordsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
