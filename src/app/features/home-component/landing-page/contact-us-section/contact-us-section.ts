import { CommonModule } from '@angular/common';
import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

@Component({
  selector: 'app-contact-us-section',
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-us-section.html',
  styleUrl: './contact-us-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactUsSection {
  formData = signal<ContactForm>({
    name: '',
    email: '',
    message: '',
  });

  // Method to update form data
  updateFormData(field: keyof ContactForm, value: string): void {
    this.formData.update((data) => ({
      ...data,
      [field]: value,
    }));
  }

  submitForm(): void {
    const currentData = this.formData();
    if (currentData.name && currentData.email && currentData.message) {
      console.log('Form Submitted!', currentData);
      this.formData.set({ name: '', email: '', message: '' });
      alert('Message sent successfully!');
    } else {
      alert('Please fill in all fields before submitting.');
    }
  }
}
