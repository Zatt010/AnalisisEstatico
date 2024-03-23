import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../servicio/user-service.service';

@Component({
  selector: 'app-changeinfo',
  templateUrl: './changeinfo.component.html',
  styleUrls: ['./changeinfo.component.css']
})
export class ChangeinfoComponent implements OnInit {
  userId?: string;
  userinfo: any;
  miFormulario!: FormGroup;
  profilePic: string = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
  profilePicOptions: string[] = [
    'https://store.playstation.com/store/api/chihiro/00_09_000/container/US/en/19/UP1063-CUSA15534_00-AV00000000000005/image?w=320&h=320&bg_color=000000&opacity=100&_version=00_09_000',
    'https://store.playstation.com/store/api/chihiro/00_09_000/container/US/en/19/UP4396-CUSA04289_00-AV00000000000009/image?w=320&h=320&bg_color=000000&opacity=100&_version=00_09_000',
    'https://image.api.playstation.com/cdn/UP4312/CUSA11327_00/Rzlb502W6Gs22lWIyOuqt8AEvF3O4LSi.png?w=440&thumb=false',
    'https://image.api.playstation.com/cdn/UP1024/CUSA04191_00/yTQp9ycrEcpToRR5rZaWfe0a1g94kA9u.png?w=440&thumb=false',
    'https://image.api.playstation.com/cdn/UP1023/CUSA07718_00/NttB60oN3WLqThv1xuCHTE7Ws0PoqCF9.png?w=440&thumb=false',
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
  ];
  isLoading = false;
  isSuccess = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.userId = params['id']; // Obtén el ID del usuario de la URL
      this.getUserInfo();
    });

    this.miFormulario = new FormGroup({
      nombre_u: new FormControl('', Validators.required),
      nombre_com: new FormControl('', Validators.required),
      Fecha_N: new FormControl('', Validators.required),
      ci: new FormControl('', Validators.required)
    });
  }

  getUserInfo() {
    if(this.userId){
    this.userService.getUserinfo(this.userId).subscribe(
      (response) => {
        this.userinfo = response;
        this.populateForm();
      },
      (error) => {
        console.error(error);
      }
    );
    }
  }

  populateForm() {
    this.miFormulario.setValue({
      nombre_u: this.userinfo.nombre_u,
      nombre_com: this.userinfo.nombre_com,
      Fecha_N: this.userinfo.Fecha_N.substring(0, 10), // Obtén solo la fecha sin la hora
      ci: this.userinfo.ci
    });

    this.profilePic = this.userinfo.profilePic;
  }

  changeProfilePic(option: string) {
    this.profilePic = option;
  }

  submitForm() {
    if (this.miFormulario.valid) {
      const { nombre_u, nombre_com, Fecha_N, ci } = this.miFormulario.value;
      const userData = {
        userID: this.userId,
        nombre_u,
        nombre_com,
        Fecha_N,
        ci,
        profilePic: this.profilePic
      };

      this.isLoading = true;
      if(this.userId){
      this.userService.updateUserInfo(this.userId, userData).subscribe(
        () => {
          this.isLoading = false;
          this.isSuccess = true;
        },
        (error) => {
          console.error(error);
          this.isLoading = false;
          this.isSuccess = false;
        }
      );
      }
    }
  }
}
