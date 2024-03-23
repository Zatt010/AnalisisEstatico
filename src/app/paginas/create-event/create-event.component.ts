import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../../servicio/user-service.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent {
  evento: any[] = [];
  categoria: string[] = ['Convencion', 'Musica', 'Deportes'];
  miFormulario = new FormGroup({
    categoria: new FormControl('Convencion'),
    nombre: new FormControl(''),
    fechaHora: new FormControl(''),
    pais: new FormControl(''),
    ciudad: new FormControl(''),
    lugar: new FormControl(''),
    artista: new FormControl(''),
    equipo1: new FormControl(''),
    equipo2: new FormControl('')
  });
  isLoading = false;
  isSuccess = false;

  constructor(private userService: UserService) {}

  onSubmit() {
    this.isLoading = true;
    const categoria = this.miFormulario.value.categoria;
    const nombre = this.miFormulario.value.nombre;
    const fechaHora = this.miFormulario.value.fechaHora;
    const pais = this.miFormulario.value.pais;
    const ciudad = this.miFormulario.value.ciudad;
    const lugar = this.miFormulario.value.lugar;
    const pro = {
      nombre,
      fechaHora,
      pais,
      ciudad,
      lugar,
      categoria,
      ...(categoria === 'Musica' && { artista: this.miFormulario.value.artista }),
      ...(categoria === 'Deportes' && {
        equipo1: this.miFormulario.value.equipo1,
        equipo2: this.miFormulario.value.equipo2
      })
    };

    this.userService.createEvent(pro).subscribe(data => {
      this.evento.push(data);
      setTimeout(() => {
        this.isLoading = false;
        this.isSuccess = true;
      }, 10000);
    });
  }
  reloadPage() {
    location.reload();
  }
}
