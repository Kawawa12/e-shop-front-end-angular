import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMAnagerProfileComponent } from './update-manager-profile.component';

describe('UpdateMAnagerProfileComponent', () => {
  let component: UpdateMAnagerProfileComponent;
  let fixture: ComponentFixture<UpdateMAnagerProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateMAnagerProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateMAnagerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
