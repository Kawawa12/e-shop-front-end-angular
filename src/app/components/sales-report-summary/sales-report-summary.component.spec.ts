import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesReportSummaryComponent } from './sales-report-summary.component';

describe('SalesReportSummaryComponent', () => {
  let component: SalesReportSummaryComponent;
  let fixture: ComponentFixture<SalesReportSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesReportSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesReportSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
