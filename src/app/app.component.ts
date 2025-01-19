import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavlayoutComponent } from "./layout/navlayout/navlayout.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavlayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ClientApp';
}
