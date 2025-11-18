import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

interface Certification {
  id: number;
  title: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-aws-certifications-section',
  imports: [CommonModule],
  templateUrl: './aws-certifications-section.html',
  styleUrl: './aws-certifications-section.scss',
})
export class AwsCertificationsSection implements OnInit {
  currentIndex: number = 0;
  isDragging: boolean = false;
  startX: number = 0;

  certifications: Certification[] = [
    {
      id: 1,
      title: 'Cloud Practitioner',
      description:
        'Prepare for the AWS Certified Cloud Practitioner exam - foundational AWS knowledge.',
      image: '☁️',
    },
    {
      id: 2,
      title: 'Solution Architect',
      description: 'Prepare for the AWS Certified Solutions Architect - Associate exam.',
      image: '🏗️',
    },
    {
      id: 3,
      title: 'Developer Associate',
      description: 'Prepare for the AWS Certified Developer - Associate exam.',
      image: '👨‍💻',
    },
    {
      id: 4,
      title: 'SysOps Administrator',
      description: 'Prepare for the AWS Certified SysOps Administrator - Associate exam.',
      image: '⚙️',
    },
    {
      id: 5,
      title: 'Solutions Architect Pro',
      description: 'Prepare for the AWS Certified Solutions Architect - Professional exam.',
      image: '🎯',
    },
    {
      id: 6,
      title: 'DevOps Engineer',
      description: 'Prepare for the AWS Certified DevOps Engineer - Professional exam.',
      image: '🚀',
    },
    {
      id: 7,
      title: 'Security Specialty',
      description: 'Prepare for the AWS Certified Security - Specialty exam.',
      image: '🔒',
    },
  ];

  ngOnInit(): void {}

  handlePrev(): void {
    this.currentIndex =
      this.currentIndex > 0 ? this.currentIndex - 1 : this.certifications.length - 1;
  }

  handleNext(): void {
    this.currentIndex =
      this.currentIndex < this.certifications.length - 1 ? this.currentIndex + 1 : 0;
  }

  goToSlide(index: number): void {
    this.currentIndex = index;
  }

  getCardStyle(index: number): any {
    const diff = index - this.currentIndex;
    const totalCards = this.certifications.length;

    let position = diff;
    if (diff > totalCards / 2) position = diff - totalCards;
    if (diff < -totalCards / 2) position = diff + totalCards;

    const isVisible = Math.abs(position) <= 3;

    if (!isVisible) {
      return {
        opacity: '0',
        transform: 'translateX(-50%) translateZ(-1000px) rotateY(0deg)',
        'z-index': '-1',
        'pointer-events': 'none',
      };
    }

    const isMobile = window.innerWidth < 768;
    const translateX = position * (isMobile ? 200 : 280);
    const translateZ = -Math.abs(position) * (isMobile ? 150 : 200);
    const rotateY = position * (isMobile ? 20 : 25);
    const scale = 1 - Math.abs(position) * (isMobile ? 0.2 : 0.15);
    const opacity = 1 - Math.abs(position) * 0.3;

    return {
      transform: `translateX(calc(-50% + ${translateX}px)) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
      opacity: opacity.toString(),
      'z-index': (10 - Math.abs(position)).toString(),
      'pointer-events': position === 0 ? 'auto' : 'none',
    };
  }

  onMouseDown(event: MouseEvent): void {
    this.isDragging = true;
    this.startX = event.pageX;
  }

  onMouseMove(event: MouseEvent): void {
    if (!this.isDragging) return;
    event.preventDefault();
    const walk = event.pageX - this.startX;
    if (Math.abs(walk) > 50) {
      if (walk > 0) {
        this.handlePrev();
      } else {
        this.handleNext();
      }
      this.isDragging = false;
    }
  }

  onMouseUp(): void {
    this.isDragging = false;
  }

  onTouchStart(event: TouchEvent): void {
    this.isDragging = true;
    this.startX = event.touches[0].pageX;
  }

  onTouchMove(event: TouchEvent): void {
    if (!this.isDragging) return;
    const walk = event.touches[0].pageX - this.startX;
    if (Math.abs(walk) > 50) {
      if (walk > 0) {
        this.handlePrev();
      } else {
        this.handleNext();
      }
      this.isDragging = false;
    }
  }

  onTouchEnd(): void {
    this.isDragging = false;
  }
}
