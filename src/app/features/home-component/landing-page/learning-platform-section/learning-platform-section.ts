import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-learning-platform-section',
  imports: [CommonModule],
  templateUrl: './learning-platform-section.html',
  styleUrl: './learning-platform-section.scss',
})
export class LearningPlatformSection {
  stats = [
    { value: '100+', label: 'AWS SERVICES' },
    { value: '100+', label: 'FREE CONTENT' },
    { value: 'EXPERT', label: 'INSTRUCTORS' },
    { value: 'CAREER', label: 'READY' },
  ];

  learningPaths = [
    {
      id: 'beginner',
      title: 'Absolute Beginner',
      icon: 'lightbulb',
      description:
        'Start your cloud journey from the very beginning. This track is tailored to put your foundations in place through a well-defined and step-by-step foundational understanding.',
      position: 'top-left',
    },
    {
      id: 'foundational',
      title: 'Foundational',
      icon: 'rocket',
      description:
        'Build essential technical skills for cloud computing. This track covers core concepts and services that form the backbone throughout your cloud journey.',
      position: 'top-right',
    },
    {
      id: 'intermediate',
      title: 'Intermediate',
      icon: 'trending',
      description:
        'Take your AWS skills to the next level with advanced services and DevOps practices. Prerequisites Required.',
      position: 'bottom-left',
    },
    {
      id: 'advanced',
      title: 'Advanced',
      icon: 'zap',
      description: 'Master enterprise-level AWS architecture, security, and best practices.',
      position: 'bottom-right',
    },
  ];
}
