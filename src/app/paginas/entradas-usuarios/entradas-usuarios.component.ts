import { Component, OnInit } from '@angular/core';
import { UserService } from '../../servicio/user-service.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-entradas-usuarios',
  templateUrl: './entradas-usuarios.component.html',
  styleUrls: ['./entradas-usuarios.component.css']
})
export class EntradasUsuariosComponent implements OnInit {
  userId: string | null = null;
  ticketItems: any[] = [];
  ticketItems1: any[] = [];

  constructor(private eventService: UserService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params['id'];
      console.log('userId:', this.userId);
      this.loadTicketItems();
    });
  }

  loadTicketItems(): void {
    if (this.userId) {
    this.eventService.getTicket_user(this.userId).subscribe(
      (response) => {
        const ticketIDs = response.map((item: any) => item.ticketID.toString());
        console.log('ticketIDs:', ticketIDs); // Specify the 'any' type for 'item'
        this.loadTickets(ticketIDs);
      },
      (error) => {
        console.error(error);
      }
    );
    }
  }

  loadTickets(ticketIDs: string[]): void {
    const idEventString = ticketIDs.join(',');
    this.eventService.getTicketID(idEventString).subscribe(
      (response) => {
        const events = response as any[];
        for (const event of events) {
          const id_event = event.id_event;
          const precio = event.precio;
          const tipo = event.tipo;
          console.log('precio:', precio);
          console.log('tipo:', tipo);
          console.log('id_event:', id_event);

          const eventDetails = {
            id_event: id_event,
            precio: precio,
            tipo: tipo
            // Agrega aquí las demás propiedades del evento que necesites
          };

          this.loadEvent(id_event);
          this.ticketItems1.push(eventDetails);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }



  loadEvent(id_event: string): void {
    this.eventService.getEventID(id_event).subscribe(
      (response) => {
        console.log('evento buscado:', response);
        const eventCategory = response[0].categoria;
        const eventDetails = this.getEventDetails(eventCategory, response[0]);
        console.log('eventCategory:', eventCategory);
        console.log('eventDetails:', eventDetails);
        this.ticketItems.push(eventDetails);
      },
      (error) => {
        console.error(error);
      }
    );
  }


  getEventDetails(category: string, event: any): any {
    let eventDetails: any = {
      nombre: event.nombre,
      fechaHora: event.fechaHora,
      pais: event.pais,
      ciudad: event.ciudad,
      lugar: event.lugar
    };

    if (category === 'Deportes') {
      eventDetails.equipo1 = event.equipo1;
      eventDetails.equipo2 = event.equipo2;
    } else if (category === 'Musica') {
      eventDetails.artista = event.artista;
    }

    return eventDetails;
  }
}
