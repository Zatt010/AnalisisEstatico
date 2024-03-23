import { Component, OnInit } from '@angular/core';
import { UserService } from '../../servicio/user-service.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-eventos-usuarios',
  templateUrl: './eventos-usuarios.component.html',
  styleUrls: ['./eventos-usuarios.component.css']
})
export class EventosUsuariosComponent implements OnInit {
  events: any[] = [];
  selectedEvent: any = null;
  ticketsAvailable: any[] = [];
  userId: string | null = null;
  selectedEventId: string | null = null;
  selectedCategory: string | null = null;
  ticketAddedToCart: boolean = false;
  cartItems: any[] = [];

  constructor(private eventService: UserService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params['id'];
      console.log('userId:', this.userId);
      this.getEvents();
      this.getCartItems();
    });
  }

  getEvents(category: string | null = null): void {
    if (!category) {
      this.eventService.getEvents().subscribe(
        (response) => {
          this.events = response;
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      this.eventService.getEventbyCate(category).subscribe(
        (response) => {
          this.events = response;
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
  showTickets(event: any): void {
    if (!this.selectedCategory) {
        this.selectedEventId = event.cod_E;
    }
    this.ticketAddedToCart = false; // Reset the ticket added to cart flag
    this.eventService.getTicketEvent(event.cod_E).subscribe(
        (response) => {
            // Filtrar solo los tickets disponibles
            this.ticketsAvailable = response.filter((ticket: any) => ticket.disponible === true);
        },
        (error) => {
            console.error(error);
        }
    );
}


  buyTicket(ticket: any): void {
    const cartItem = {
      userID: this.userId,
      ticketID: ticket._id,
      precio: ticket.precio
    };
    this.eventService.createCart(cartItem).subscribe(
      (response) => {
        console.log('Ticket added to cart:', response);
        this.ticketAddedToCart = true;
        alert('En el carrito!'); // Mueve la alerta aquí
        window.location.reload();
      },
      (error) => {
        console.error(error);
      }
    );
  }
  getCartItems(): void {
    if (this.userId) {
      this.eventService.getUserCart(this.userId).subscribe(
        (response) => {
          this.cartItems = response;
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  removeCartItem(ticketID: string): void {
    if (this.userId) {
    this.eventService.deleteCart(this.userId).subscribe(
      (response) => {
        console.log('Cart item removed:', response);
        this.getCartItems(); // Update cart items after removing a ticket
      },
      (error) => {
        console.error(error);
      }
    );
    }
  }

  checkout(): void {
    // Update ticket availability and move items to a different database
    const ticketIDs = this.cartItems.map(item => item.ticketID);
    console.log('Ticket IDs:', ticketIDs); // Agregar este console.log()
    const data = {
      _id: ticketIDs,
      disponible: false
    };
    const data2 = {
      userID: this.userId,
      ticketID: ticketIDs
    };
    this.eventService.updateTicketDis(data).subscribe(
      (response) => {
        this.saveUserTickets(data2);
        console.log('Tickets updated:', response);
        this.deleteCartItems();
        alert('Compra realizada!'); //  la alerta
        window.location.reload();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  saveUserTickets(data: any): void {
    this.eventService.createuserTicketsave(data).subscribe(
      (saveResponse) => {
        console.log('User tickets saved:', saveResponse);
        this.deleteCartItems();
      },
      (saveError) => {
        console.error(saveError);
      }
    );
  }

  deleteCartItems(): void {
    if (this.userId) {
    this.eventService.deleteCart(this.userId).subscribe(
      (response) => {
        console.log('Cart items deleted:', response);
        // Perform any additional actions after deleting cart items
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
}
