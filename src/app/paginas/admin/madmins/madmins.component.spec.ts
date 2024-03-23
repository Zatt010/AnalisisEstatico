import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MadminsComponent } from './madmins.component';

describe('MadminsComponent', () => {
  let component: MadminsComponent;
  let fixture: ComponentFixture<MadminsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MadminsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MadminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
