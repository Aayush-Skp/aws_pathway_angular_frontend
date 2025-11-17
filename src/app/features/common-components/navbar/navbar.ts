import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-navbar',
  imports: [FormsModule, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  currentDate: string = 'बुधबार, फदौं २५, २०८२';
  currentTime: string = '१४ : ०४ : ५४';
  showSearch: boolean = false;
  searchQuery: string = '';

  menuItems = [
    { name: 'मुहुण्ड', link: '/muhund' },
    { name: 'मिडिया स्टोरी', link: '/media-story' },
    { name: 'राजनीति', link: '/politics' },
    { name: 'बजार अर्थतन्त्र', link: '/market-economy' },
    { name: 'बिचार', link: '/opinion' },
    { name: 'नेपाली ब्राण्ड', link: '/nepali-brand' },
    { name: 'समाज', link: '/society' },
    { name: 'कला', link: '/arts' },
    { name: 'ब्लग', link: '/blog' },
    { name: 'खेलकुद', link: '/sports' },
    { name: 'ग्लोबल', link: '/global' },
    { name: 'कमर स्टोरी', link: '/kamar-story' },
  ];

  toggleSearch() {
    this.showSearch = !this.showSearch;
    if (!this.showSearch) {
      this.searchQuery = '';
    }
  }

  onSearchSubmit() {
    if (this.searchQuery.trim()) {
      console.log('Searching for:', this.searchQuery);
    }
  }

  onSubscribe() {
    console.log('Subscribe clicked');
  }

  onLogin() {
    console.log('Login clicked');
  }
}
