import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosUsuariosComponent } from './eventos-usuarios.component';

describe('EventosUsuariosComponent', () => {
  let component: EventosUsuariosComponent;
  let fixture: ComponentFixture<EventosUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventosUsuariosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventosUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
