import { CommonModule } from '@angular/common';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-mock-exams-section',
  imports: [CommonModule],
  templateUrl: './mock-exams-section.html',
  styleUrl: './mock-exams-section.scss',
})
export class MockExamsSection implements OnInit {
  @ViewChild('heroSection', { static: false }) heroSection!: ElementRef;
  isVisible = false;

  stats = [
    {
      icon: '📚',
      value: '45',
      label: 'Field Programs and Increasing',
      delay: 'delay-100',
    },
    {
      icon: '👥',
      value: '6.3K+',
      label: 'Total Active Students',
      delay: 'delay-300',
    },
    {
      icon: '🏆',
      value: '1.5K+',
      label: 'Tutors and Instructors from around the world',
      delay: 'delay-500',
    },
  ];

  features = [
    {
      icon: '⚛️',
      title: 'Covers all Topics',
      description: 'Learn more',
    },
    {
      icon: '🧠',
      title: 'Unique',
      description: 'Learn more',
    },
    {
      icon: '💡',
      title: 'Creative',
      description: 'Learn more',
    },
  ];

  ngOnInit(): void {
    this.setupIntersectionObserver();
  }

  setupIntersectionObserver(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.isVisible = true;
          }
        });
      },
      { threshold: 0.2 }
    );

    setTimeout(() => {
      if (this.heroSection) {
        observer.observe(this.heroSection.nativeElement);
      }
    }, 100);
  }

  getStarted(): void {
    console.log('Get Started clicked');
  }
}
