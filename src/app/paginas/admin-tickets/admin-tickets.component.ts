import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../../servicio/user-service.service';

@Component({
  selector: 'app-admin-tickets',
  templateUrl: './admin-tickets.component.html',
  styleUrls: ['./admin-tickets.component.css']
})
export class AdminTicketsComponent implements OnInit {
  events: any[] = [];
  miFormulario: FormGroup;

  constructor(private userService: UserService) {
    this.miFormulario = new FormGroup({
      id_event: new FormControl(),
      precio: new FormControl(),
      tipo: new FormControl()
    });
  }

  ngOnInit(): void {
    this.userService.getEvents().subscribe((data: any[]) => {
      this.events = data;
    });
  }

  showTicketForm(event: any): void {
    event.showForm = !event.showForm;
  }

  createTicket(event: any): void {
    const id_event = event.cod_E;
    const precio = this.miFormulario.get('precio')?.value;
    const tipo = this.miFormulario.get('tipo')?.value;

    const pro = {
      id_event: id_event,
      precio: precio,
      tipo: tipo,
      disponible: true
    };

    this.userService.createTicket(pro).subscribe(data => {
      alert('Ticket registrado!');
    });

    event.showForm = false;
  }
}
