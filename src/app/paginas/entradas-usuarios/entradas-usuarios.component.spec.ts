import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntradasUsuariosComponent } from './entradas-usuarios.component';

describe('EntradasUsuariosComponent', () => {
  let component: EntradasUsuariosComponent;
  let fixture: ComponentFixture<EntradasUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntradasUsuariosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntradasUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
