import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Specialization {
  id: number;
  icon: string;
  title: string;
  description: string;
  color: string;
}

@Component({
  selector: 'app-specialization-section-one',
  imports: [CommonModule],
  templateUrl: './specialization-section-one.html',
  styleUrl: './specialization-section-one.scss',
})
export class SpecializationSectionOne {
  specializations: Specialization[] = [
    {
      id: 1,
      icon: 'security',
      title: 'Security',
      description: 'Master AWS security best practices and compliance',
      color: '#8b5cf6',
    },
    {
      id: 2,
      icon: 'network',
      title: 'Networking',
      description: 'Deep dive into AWS networking services and architecture',
      color: '#ec4899',
    },
    {
      id: 3,
      icon: 'database',
      title: 'Database',
      description: 'Expertise in AWS database solutions and optimization',
      color: '#06b6d4',
    },
    {
      id: 4,
      icon: 'analytics',
      title: 'Data Analytics',
      description: 'Advanced data processing and analytics on AWS',
      color: '#f59e0b',
    },
    {
      id: 5,
      icon: 'ml',
      title: 'Machine Learning',
      description: 'Build and deploy ML models using AWS services',
      color: '#10b981',
    },
    {
      id: 6,
      icon: 'advanced',
      title: 'Advanced Networking',
      description: 'Enterprise-level networking solutions and architecture',
      color: '#6366f1',
    },
  ];
}
