import { Component } from '@angular/core';
import { Navbar } from '../common-components/navbar/navbar';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-home-component',
  imports: [Navbar, RouterModule],
  templateUrl: './home-component.html',
  styleUrl: './home-component.scss',
})
export class HomeComponent {}
