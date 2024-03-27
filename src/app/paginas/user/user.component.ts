import { Component, OnInit } from '@angular/core';
import { UserService } from '../../servicio/user-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: any[] = [];
  selectedUser: any = {};
  newUser: any = {};
  isEditing: boolean = false;
  roles: string[] = ['user', 'admin'];
  currentUser: any = {};

  usersAdmin: any[] = []; // Agregar esta línea
  usersUser: any[] = []; // Agregar esta línea

  constructor(private userService: UserService,private router: Router) { }
  ngOnInit(): void {
    this.userService.getUserByRole('admin').subscribe({
      next: (adminResponse: any) => {
        this.userService.getUserByRole('user').subscribe({
          next: (userResponse: any) => {
            this.users = [
              { role: 'users-admin', users: adminResponse },
              { role: 'users-user', users: userResponse }
            ];
          },
          error: (userError: any) => {
            console.error(userError);
          }
        });
      },
      error: (adminError: any) => {
        console.error(adminError);
      }
    });
  }

  selectUser(user: any): void {
    this.selectedUser = { ...user };
    this.isEditing = false;
  }

  deleteUser(user: any): void {
    const confirmDelete = confirm('¿Estás seguro de eliminar este usuario?');
    if (confirmDelete) {
      this.userService.deleteUser(user.id).subscribe({
        next: () => {
          // Actualizar la lista de usuarios después de eliminar el usuario
          if (user.role === 'admin') {
            this.usersAdmin = this.usersAdmin.filter(u => u.id !== user.id);
          } else {
            this.usersUser = this.usersUser.filter(u => u.id !== user.id);
          }
          alert('Usuario eliminado');
          location.reload(); // Recargar la página
        },
        error: (error: any) => {
          console.error(error);
        }
      });
    }
  }

  saveChanges(): void {
    this.userService.updateUser(
      this.selectedUser.id,
      {
        email: this.selectedUser.email,
        password: this.selectedUser.password,
        role: this.selectedUser.role
      }
    ).subscribe({
      next: () => {
        alert('Usuario modificado');
        window.location.reload();
        this.isEditing = false;
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }


}
