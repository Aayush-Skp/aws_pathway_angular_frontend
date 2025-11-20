import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LearningPlatformSection } from './learning-platform-section/learning-platform-section';
import { AwsCertificationsSection } from './aws-certifications-section/aws-certifications-section';
import { SpecializationSectionOne } from './specialization-section-one/specialization-section-one';
import { SpecializationSectionTwo } from './specialization-section-two/specialization-section-two';
import { MockExamsSection } from './mock-exams-section/mock-exams-section';
import { TestimonialsSection } from './testimonials-section/testimonials-section';
import { FrequentlyAskedQuestionsSection } from './frequently-asked-questions-section/frequently-asked-questions-section';
import { ContactUsSection } from './contact-us-section/contact-us-section';
import { Footer } from '../../common-components/footer/footer';

@Component({
  selector: 'app-landing-page',
  imports: [
    CommonModule,
    LearningPlatformSection,
    AwsCertificationsSection,
    SpecializationSectionOne,
    SpecializationSectionTwo,
    MockExamsSection,
    TestimonialsSection,
    ContactUsSection,
    FrequentlyAskedQuestionsSection,
    Footer,
  ],
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
