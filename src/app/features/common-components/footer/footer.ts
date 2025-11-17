import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-footer',
  imports: [FormsModule, CommonModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  email: string = '';

  onSubmit(event: Event): void {
    event.preventDefault();

    if (this.email && this.validateEmail(this.email)) {
      console.log('Email submitted:', this.email);
      alert('Thank you for joining the AWS Pathway Community!');
      this.email = '';
    } else {
      alert('Please enter a valid email address');
    }
  }

  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
