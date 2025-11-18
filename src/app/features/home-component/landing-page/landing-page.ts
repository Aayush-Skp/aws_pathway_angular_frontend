import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  imports: [CommonModule],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
})
export class LandingPage {
  stars: any[] = [];
  ngOnInit() {
    for (let i = 0; i < 150; i++) {
      this.stars.push({
        size: Math.random() * 2.5 + 0.5,
        top: Math.random() * 70,
        left: Math.random() * 100,
        opacity: Math.random() * 0.7 + 0.3,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 2,
      });
    }
  }
}
