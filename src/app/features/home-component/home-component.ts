import { Component } from '@angular/core';
import { Navbar } from '../common-components/navbar/navbar';
import { Footer } from '../common-components/footer/footer';
import { LandingPage } from './landing-page/landing-page';

@Component({
  standalone: true,
  selector: 'app-home-component',
  imports: [Navbar, Footer, LandingPage],
  templateUrl: './home-component.html',
  styleUrl: './home-component.scss',
})
export class HomeComponent {}
