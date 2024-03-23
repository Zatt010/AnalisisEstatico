import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HUserComponent } from './huser.component';

describe('HUserComponent', () => {
  let component: HUserComponent;
  let fixture: ComponentFixture<HUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
