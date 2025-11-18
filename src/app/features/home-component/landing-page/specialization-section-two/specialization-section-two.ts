import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
interface Service {
  id: number;
  name: string;
  orbit: number;
  angle: number;
  speed: number;
  size: 'small' | 'medium' | 'large';
}

@Component({
  selector: 'app-specialization-section-two',
  imports: [CommonModule],
  templateUrl: './specialization-section-two.html',
  styleUrl: './specialization-section-two.scss',
})
export class SpecializationSectionTwo implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('orbitContainer', { static: false }) orbitContainer!: ElementRef;
  isVisible = false;
  animationFrame: any;
  observer!: IntersectionObserver;

  services: Service[] = [
    { id: 1, name: 'S3', orbit: 1, angle: 0, speed: 0.3, size: 'medium' },
    { id: 2, name: 'EKS', orbit: 1, angle: 90, speed: 0.3, size: 'medium' },
    { id: 3, name: 'Lambda', orbit: 1, angle: 180, speed: 0.3, size: 'medium' },
    { id: 4, name: 'Kinesis', orbit: 1, angle: 270, speed: 0.3, size: 'medium' },

    { id: 5, name: 'EC2', orbit: 2, angle: 45, speed: 0.2, size: 'medium' },
    { id: 6, name: 'VPC', orbit: 2, angle: 135, speed: 0.2, size: 'large' },
    { id: 7, name: 'RDS', orbit: 2, angle: 225, speed: 0.2, size: 'medium' },
    { id: 8, name: 'IAM', orbit: 2, angle: 315, speed: 0.2, size: 'large' },

    { id: 9, name: 'Cognito', orbit: 3, angle: 0, speed: 0.15, size: 'medium' },
    { id: 10, name: 'Sagemaker', orbit: 3, angle: 120, speed: 0.15, size: 'medium' },
    { id: 11, name: '', orbit: 3, angle: 240, speed: 0.15, size: 'small' },
  ];

  connectors = [
    { from: 1, to: 5 },
    { from: 2, to: 3 },
    { from: 6, to: 10 },
    { from: 7, to: 8 },
  ];

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.setupIntersectionObserver();
  }

  ngOnDestroy(): void {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  setupIntersectionObserver(): void {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3,
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !this.isVisible) {
          this.isVisible = true;
          setTimeout(() => {
            this.startAnimation();
          }, 500);
        }
      });
    }, options);

    if (this.orbitContainer) {
      this.observer.observe(this.orbitContainer.nativeElement);
    }
  }

  startAnimation(): void {
    const animate = () => {
      this.services = this.services.map((service) => ({
        ...service,
        angle: (service.angle + service.speed) % 360,
      }));
      this.animationFrame = requestAnimationFrame(animate);
    };
    animate();
  }

  getOrbitRadius(orbit: number): number {
    const baseRadius = 155;
    return baseRadius * orbit;
  }

  getServicePosition(service: Service): { x: number; y: number } {
    const radius = this.getOrbitRadius(service.orbit);
    const angleInRadians = (service.angle * Math.PI) / 180;
    return {
      x: radius * Math.cos(angleInRadians),
      y: radius * Math.sin(angleInRadians),
    };
  }

  getServiceStyle(service: Service): any {
    if (!this.isVisible) {
      return {
        transform: 'translate(-50%, -50%) scale(0)',
        opacity: 0,
      };
    }

    const pos = this.getServicePosition(service);
    return {
      transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px)) scale(1)`,
      opacity: 1,
      transition: 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.8s ease',
    };
  }

  getSizeClass(size: string): string {
    return `bubble-${size}`;
  }
}
