import { Component } from '@angular/core';

@Component({
  selector: 'app-datos-usuario',
  templateUrl: './datos-usuario.component.html',
  styleUrls: ['./datos-usuario.component.css']
})
export class DatosUsuarioComponent {
  changeProfileImage(event: any): void {
    const file = event.target.files[0]; // Obtiene el archivo seleccionado

    // Realiza las validaciones necesarias antes de cambiar la imagen
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const imgElement = document.getElementById('profile-img');
        if (imgElement) {
          imgElement.setAttribute('src', e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  }

  changeName(): void {
    // Lógica para cambiar el nombre
  }

  changeUsername(): void {
    // Lógica para cambiar el nombre de usuario
  }

  changeBirthdate(): void {
    // Lógica para cambiar la fecha de nacimiento
  }

  changeCountry(): void {
    // Lógica para cambiar el país
  }

  changeCi(): void {
    // Lógica para cambiar el número de CI
  }

  changeEmail(): void {
    // Lógica para cambiar el correo electrónico
  }
}
