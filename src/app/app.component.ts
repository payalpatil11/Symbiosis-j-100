import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SalesmanagementComponent } from './salesmanagement/salesmanagement.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,SalesmanagementComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'project1';
}
