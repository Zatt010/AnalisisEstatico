import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../servicio/user-service.service';

@Component({
  selector: 'app-huser',
  templateUrl: './huser.component.html',
  styleUrls: ['./huser.component.css']
})
export class HUserComponent {
  userId?: string;
  userinfo: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['id']; // Obtén el ID del usuario de la URL
    });
  }


}
