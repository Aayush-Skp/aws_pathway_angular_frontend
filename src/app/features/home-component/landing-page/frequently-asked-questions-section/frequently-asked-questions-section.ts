import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FAQItem {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-frequently-asked-questions-section',
  imports: [CommonModule],
  templateUrl: './frequently-asked-questions-section.html',
  styleUrl: './frequently-asked-questions-section.scss',
})
export class FrequentlyAskedQuestionsSection {
  // Using Signals for reactive state management
  activeIndex = signal<number | null>(0);

  faqItems: FAQItem[] = [
    {
      question: 'What Is AWS, And Why Should I Learn It?',
      answer:
        "AWS (Amazon Web Services) is the world's leading cloud platform used by startups, enterprises, and governments. Learning AWS can open doors to high-demand careers in cloud engineering, DevOps, cybersecurity, and data analytics — with excellent salaries and global opportunities.",
    },
    {
      question: 'Do I Need Any Prior IT Experience To Start?',
      answer:
        'No prior IT experience is strictly required to start learning AWS basics. While familiarity with general computer concepts helps, many foundational courses are designed for absolute beginners.',
    },
    {
      question: 'Which AWS Certifications Can I Prepare For Here?',
      answer:
        'We provide comprehensive preparation materials for the AWS Certified Cloud Practitioner (CLF-C01), AWS Certified Solutions Architect – Associate (SAA-C03), and AWS Certified Developer – Associate (DVA-C02) exams.',
    },
    {
      question: 'How Long Does It Take To Get AWS Certified?',
      answer:
        'The time varies depending on your background. Generally, a beginner might take 1-3 months for the Cloud Practitioner exam, while the Associate level certifications typically require 3-6 months of dedicated study.',
    },
  ];

  isOpen(index: number): boolean {
    return this.activeIndex() === index;
  }

  toggle(index: number): void {
    this.activeIndex.update((current) => (current === index ? null : index));
  }
}
