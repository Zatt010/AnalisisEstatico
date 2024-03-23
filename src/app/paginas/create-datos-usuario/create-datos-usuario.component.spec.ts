import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDatosUsuarioComponent } from './create-datos-usuario.component';

describe('CreateDatosUsuarioComponent', () => {
  let component: CreateDatosUsuarioComponent;
  let fixture: ComponentFixture<CreateDatosUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDatosUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateDatosUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
