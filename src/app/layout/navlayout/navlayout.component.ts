import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navlayout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './navlayout.component.html',
  styleUrl: './navlayout.component.css'
})
export class NavlayoutComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
