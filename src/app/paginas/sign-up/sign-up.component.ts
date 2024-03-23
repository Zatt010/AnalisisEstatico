import { Component } from '@angular/core';
import { UserService } from '../../servicio/user-service.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  usuario: any[] = [];
  miFormulario = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
  isLoading = false;
  isSuccess = false;
  showLoginButton = false;

  constructor(private userService: UserService) {}

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
            'role': "user"
          };
          this.userService.createUser(pro).subscribe(data => {
            this.usuario.push(data);
            setTimeout(() => {
              this.isLoading = false;
              this.isSuccess = true;
              this.showLoginButton = true; // Mostrar el botón
            }, 10000);
          });
        }
      });
    }
  }


}

