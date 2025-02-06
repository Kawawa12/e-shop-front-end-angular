import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementsComponent } from './managements.component';

describe('ManagementsComponent', () => {
  let component: ManagementsComponent;
  let fixture: ComponentFixture<ManagementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagementsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
