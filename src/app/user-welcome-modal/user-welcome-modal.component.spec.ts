import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserWelcomeModalComponent } from './user-welcome-modal.component';

describe('UserWelcomeModalComponent', () => {
  let component: UserWelcomeModalComponent;
  let fixture: ComponentFixture<UserWelcomeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserWelcomeModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserWelcomeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
