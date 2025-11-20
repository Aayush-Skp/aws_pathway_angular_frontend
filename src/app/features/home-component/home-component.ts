import { Component } from '@angular/core';
import { Navbar } from '../common-components/navbar/navbar';
import { LandingPage } from './landing-page/landing-page';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-home-component',
  imports: [Navbar, LandingPage],
  templateUrl: './home-component.html',
  styleUrl: './home-component.scss',
})
export class HomeComponent {}
