import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
interface Testimonial {
  id: number;
  title: string;
  content: string;
  author: string;
  position: string;
  company: string;
}

@Component({
  selector: 'app-testimonials-section',
  imports: [CommonModule],
  templateUrl: './testimonials-section.html',
  styleUrl: './testimonials-section.scss',
})
export class TestimonialsSection implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('carouselTrack', { static: false }) carouselTrack!: ElementRef<HTMLDivElement>;
  @ViewChild('carouselContainer', { static: false }) carouselContainer!: ElementRef<HTMLDivElement>;

  testimonials: Testimonial[] = [
    {
      id: 1,
      title: 'AWS Certification!',
      content:
        'Our AWS would be overwhelming—but structured and practical. The structured learning definitely pass my AWS Solutions Architect and manage AWS deployments for our clients!',
      author: 'John Doe',
      position: 'Senior Network Engineer',
      company: 'TechCorp',
    },
    {
      id: 2,
      title: 'Perfect for Beginners',
      content:
        'I came from a non-tech background and was nervous about starting with cloud computing. The AWS Learning Platform broke everything down into easy-to-follow lessons. Within 3 months, I earned my AWS Certified Cloud Practitioner badge and landed a junior cloud engineer role. The hands-on labs made all the difference!',
      author: 'Priya Sharma',
      position: 'Cloud Engineer',
      company: 'TechNova',
    },
    {
      id: 3,
      title: 'That was Amazing!',
      content:
        "We trained our entire IT team using this AWS world-class instruction. Everyone got certified faster and apply what they learned. It's a must-have for any business!",
      author: 'Sarah Lee',
      position: 'IT Manager',
      company: 'GlobalTech',
    },
    {
      id: 4,
      title: 'Best Investment',
      content:
        'The comprehensive curriculum and real-world projects helped me transition from traditional IT to cloud architecture. The instructor support was exceptional throughout my learning journey.',
      author: 'Michael Chen',
      position: 'Cloud Architect',
      company: 'CloudSystems',
    },
    {
      id: 5,
      title: 'Career Game Changer',
      content:
        'After completing the AWS certification program, I received three job offers within a month. The practical labs and exam preparation were exactly what I needed to succeed.',
      author: 'Emily Rodriguez',
      position: 'DevOps Engineer',
      company: 'InnovateTech',
    },
  ];

  loopedTestimonials: Testimonial[] = [];
  currentIndex = 1;
  isDragging = false;
  startPos = 0;
  autoPlayInterval: any;
  cardWidth = 0;
  cardGap = 0;
  centerOffset = 0;
  trackTransform = 'translateX(0px)';
  trackTransition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
  private readonly transitionValue = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
  private resizeHandler = () => this.handleResize();

  ngOnInit(): void {
    this.setupLoopedTestimonials();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.measureDimensions();
      this.startAutoPlay();
      window.addEventListener('resize', this.resizeHandler);
    });
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.resizeHandler);
    this.stopAutoPlay();
  }

  private handleResize(): void {
    this.measureDimensions();
  }

  private setupLoopedTestimonials(): void {
    if (!this.testimonials.length) {
      this.loopedTestimonials = [];
      return;
    }

    const first = this.testimonials[0];
    const last = this.testimonials[this.testimonials.length - 1];
    this.loopedTestimonials = [last, ...this.testimonials, first];
    this.currentIndex = 1;
  }

  private measureDimensions(): void {
    if (!this.carouselTrack || !this.carouselContainer) {
      return;
    }

    const trackEl = this.carouselTrack.nativeElement;
    const containerEl = this.carouselContainer.nativeElement;
    const referenceCard = trackEl.children[1] as HTMLElement | undefined;

    if (!referenceCard) {
      return;
    }

    const refRect = referenceCard.getBoundingClientRect();
    const nextCard = trackEl.children[2] as HTMLElement | undefined;

    this.cardWidth = refRect.width;
    if (nextCard) {
      const nextRect = nextCard.getBoundingClientRect();
      this.cardGap = nextRect.left - refRect.right;
    } else {
      const styles = getComputedStyle(trackEl);
      const gapValue = parseFloat(styles.columnGap || styles.rowGap || '0');
      this.cardGap = isNaN(gapValue) ? 0 : gapValue;
    }

    const containerWidth = containerEl.getBoundingClientRect().width;
    this.centerOffset = (containerWidth - this.cardWidth) / 2;
    this.updateTransform(false);
  }

  private updateTransform(applyTransition = true): void {
    const step = this.cardWidth + this.cardGap;
    const translate =
      step === 0 ? 0 : -this.currentIndex * step + this.centerOffset;
    this.trackTransform = `translateX(${translate}px)`;
    this.trackTransition = applyTransition ? this.transitionValue : 'none';
  }

  goToSlide(index: number): void {
    this.currentIndex = index + 1;
    this.updateTransform(true);
    this.restartAutoPlay();
  }

  nextSlide(resetTimer = false): void {
    if (!this.loopedTestimonials.length) return;
    this.currentIndex += 1;
    this.updateTransform(true);
    if (resetTimer) {
      this.restartAutoPlay();
    }
  }

  prevSlide(resetTimer = false): void {
    if (!this.loopedTestimonials.length) return;
    this.currentIndex -= 1;
    this.updateTransform(true);
    if (resetTimer) {
      this.restartAutoPlay();
    }
  }

  handleTransitionEnd(): void {
    if (!this.loopedTestimonials.length) return;

    if (this.currentIndex === this.loopedTestimonials.length - 1) {
      this.currentIndex = 1;
      this.updateTransform(false);
      requestAnimationFrame(() => {
        this.trackTransition = this.transitionValue;
      });
    } else if (this.currentIndex === 0) {
      this.currentIndex = this.loopedTestimonials.length - 2;
      this.updateTransform(false);
      requestAnimationFrame(() => {
        this.trackTransition = this.transitionValue;
      });
    }
  }

  private restartAutoPlay(): void {
    this.stopAutoPlay();
    this.startAutoPlay();
  }

  startAutoPlay(): void {
    this.stopAutoPlay();
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide(false);
    }, 5000);
  }

  stopAutoPlay(): void {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }

  // Touch/Mouse events for smooth dragging
  onTouchStart(event: TouchEvent): void {
    this.isDragging = true;
    this.startPos = event.touches[0].clientX;
    this.stopAutoPlay();
  }

  onTouchMove(event: TouchEvent): void {
    if (!this.isDragging) return;
    const currentPosition = event.touches[0].clientX;
    const diff = currentPosition - this.startPos;

    if (Math.abs(diff) > 50) {
      diff > 0 ? this.prevSlide(true) : this.nextSlide(true);
      this.isDragging = false;
    }
  }

  onTouchEnd(): void {
    this.isDragging = false;
    this.restartAutoPlay();
  }

  getDots(): number[] {
    return this.testimonials.map((_, i) => i);
  }

  get activeDot(): number {
    if (!this.testimonials.length) {
      return 0;
    }
    return (this.currentIndex - 1 + this.testimonials.length) % this.testimonials.length;
  }
}
