import { Component } from '@angular/core';
import { UserService } from '../../../servicio/user-service.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-madmins',
  templateUrl: './madmins.component.html',
  styleUrls: ['./madmins.component.css']
})
export class MadminsComponent {
  usuario: any[] = [];
  miFormulario = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
  isLoading = false;
  isSuccess = false;

  searchQuery: string;
  adminUsers: any[];
  selectedUser: any;
  password: string;
  email: string;
  role: string;

  constructor(private userService: UserService) {
    this.searchQuery = '';
    this.adminUsers = [];
    this.selectedUser = null;
    this.password = '';
    this.email = '';
    this.role = '';
  }

  onSubmit() {
    this.isLoading = true;
    const email = this.miFormulario.value.email;
    const password = this.miFormulario.value.password;
    if (email) {
      this.userService.verifyEmail(email).subscribe(result => {
        if (result.exists) {
          alert('El email ya está registrado');
        } else {
          const pro = {
            'email': email,
            'password': password,
            'role': 'admin'
          };
          this.userService.createUser(pro).subscribe(data => {
            this.usuario.push(data);
            setTimeout(() => {
              this.isLoading = false;
              this.isSuccess = true;
            }, 10000);
          });
        }
      });
    }
  }

}
