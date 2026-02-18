import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet} from "@angular/router";
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  showHomeContent = true;


}
