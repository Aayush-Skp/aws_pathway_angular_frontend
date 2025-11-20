import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

interface Topic {
  id: string;
  name: string;
  content: string;
}

interface Chapter {
  id: string;
  name: string;
  topics: Topic[];
  isExpanded?: boolean;
}

interface Category {
  id: string;
  name: string;
  chapters: Chapter[];
  isExpanded?: boolean;
}

@Component({
  selector: 'app-learning-track',
  imports: [CommonModule],
  templateUrl: './learning-track.html',
  styleUrl: './learning-track.scss',
})
export class LearningTrack implements OnInit {
  categories: Category[] = [];
  selectedTopic: Topic | null = null;

  ngOnInit(): void {
    // Static data - will be replaced with API call later
    this.categories = [
      {
        id: 'cat-1',
        name: 'Absolute Beginner',
        isExpanded: false,
        chapters: [
          {
            id: 'chap-1',
            name: 'Computer Basics',
            isExpanded: false,
            topics: [
              {
                id: 'topic-1',
                name: 'CLI (Command Line Interface)',
                content: `
                  <h2>Command Line Interface (CLI)</h2>
                  <p>The Command Line Interface is a text-based interface used to interact with your computer's operating system.</p>
                  
                  <h3>Why Learn CLI?</h3>
                  <ul>
                    <li>More efficient for certain tasks</li>
                    <li>Essential for cloud computing and DevOps</li>
                    <li>Enables automation through scripts</li>
                    <li>Required for managing remote servers</li>
                  </ul>

                  <h3>Basic Commands</h3>
                  <pre><code>ls    - List files and directories
cd    - Change directory
pwd   - Print working directory
mkdir - Make directory
rm    - Remove files</code></pre>

                  <h3>Practice Exercise</h3>
                  <p>Open your terminal and try navigating to your Desktop using the cd command.</p>
                `,
              },
              {
                id: 'topic-2',
                name: 'Keyboard Shortcuts',
                content: `
                  <h2>Essential Keyboard Shortcuts</h2>
                  <p>Mastering keyboard shortcuts increases your productivity significantly.</p>
                  
                  <h3>Universal Shortcuts</h3>
                  <ul>
                    <li><strong>Ctrl+C</strong> - Copy</li>
                    <li><strong>Ctrl+V</strong> - Paste</li>
                    <li><strong>Ctrl+Z</strong> - Undo</li>
                    <li><strong>Ctrl+S</strong> - Save</li>
                    <li><strong>Alt+Tab</strong> - Switch between applications</li>
                  </ul>

                  <h3>Terminal Shortcuts</h3>
                  <ul>
                    <li><strong>Ctrl+C</strong> - Cancel current command</li>
                    <li><strong>Ctrl+L</strong> - Clear screen</li>
                    <li><strong>Tab</strong> - Auto-complete</li>
                  </ul>
                `,
              },
              {
                id: 'topic-3',
                name: 'Pipeline Concepts',
                content: `
                  <h2>Understanding Pipelines</h2>
                  <p>Pipelines allow you to chain commands together, passing output from one command as input to another.</p>
                  
                  <h3>The Pipe Operator (|)</h3>
                  <pre><code>command1 | command2 | command3</code></pre>

                  <h3>Examples</h3>
                  <pre><code>ls -la | grep ".txt"    # List all .txt files
cat file.txt | wc -l    # Count lines in a file
ps aux | grep python    # Find Python processes</code></pre>

                  <h3>Why Pipelines Matter</h3>
                  <p>Pipelines are fundamental in DevOps and cloud automation, forming the basis of CI/CD workflows.</p>
                `,
              },
            ],
          },
          {
            id: 'chap-2',
            name: 'Cloud Concepts',
            isExpanded: false,
            topics: [
              {
                id: 'topic-4',
                name: 'What is Cloud Computing?',
                content: `
                  <h2>Introduction to Cloud Computing</h2>
                  <p>Cloud computing is the delivery of computing services over the internet ("the cloud").</p>
                  
                  <h3>Key Characteristics</h3>
                  <ul>
                    <li><strong>On-demand self-service</strong> - Resources available when needed</li>
                    <li><strong>Broad network access</strong> - Access from anywhere</li>
                    <li><strong>Resource pooling</strong> - Shared infrastructure</li>
                    <li><strong>Rapid elasticity</strong> - Scale up or down quickly</li>
                    <li><strong>Measured service</strong> - Pay only for what you use</li>
                  </ul>

                  <h3>Cloud Service Models</h3>
                  <ul>
                    <li><strong>IaaS</strong> - Infrastructure as a Service (EC2, VMs)</li>
                    <li><strong>PaaS</strong> - Platform as a Service (Elastic Beanstalk)</li>
                    <li><strong>SaaS</strong> - Software as a Service (Gmail, Office 365)</li>
                  </ul>
                `,
              },
              {
                id: 'topic-5',
                name: 'Cloud Deployment Models',
                content: `
                  <h2>Cloud Deployment Models</h2>
                  
                  <h3>Public Cloud</h3>
                  <p>Services offered over the public internet and available to anyone (AWS, Azure, GCP).</p>
                  <ul>
                    <li>Cost-effective</li>
                    <li>No maintenance</li>
                    <li>High scalability</li>
                  </ul>

                  <h3>Private Cloud</h3>
                  <p>Cloud infrastructure used exclusively by one organization.</p>
                  <ul>
                    <li>Greater control</li>
                    <li>Enhanced security</li>
                    <li>Customization</li>
                  </ul>

                  <h3>Hybrid Cloud</h3>
                  <p>Combination of public and private clouds.</p>
                  <ul>
                    <li>Flexibility</li>
                    <li>Cost optimization</li>
                    <li>Regulatory compliance</li>
                  </ul>
                `,
              },
            ],
          },
        ],
      },
      {
        id: 'cat-2',
        name: 'Foundational',
        isExpanded: false,
        chapters: [
          {
            id: 'chap-3',
            name: 'AWS Core Services',
            isExpanded: false,
            topics: [
              {
                id: 'topic-6',
                name: 'EC2 Basics',
                content: `
                  <h2>Amazon EC2 (Elastic Compute Cloud)</h2>
                  <p>EC2 provides scalable computing capacity in the AWS cloud.</p>
                  
                  <h3>What is EC2?</h3>
                  <p>Virtual servers in the cloud that you can configure and manage.</p>

                  <h3>Instance Types</h3>
                  <ul>
                    <li><strong>General Purpose</strong> - Balanced compute, memory, and networking</li>
                    <li><strong>Compute Optimized</strong> - High-performance processors</li>
                    <li><strong>Memory Optimized</strong> - Fast performance for memory-intensive workloads</li>
                    <li><strong>Storage Optimized</strong> - High sequential read/write access</li>
                  </ul>

                  <h3>Pricing Models</h3>
                  <ul>
                    <li>On-Demand - Pay by the hour or second</li>
                    <li>Reserved - Commit for 1 or 3 years (cheaper)</li>
                    <li>Spot - Bid for unused capacity (cheapest)</li>
                  </ul>
                `,
              },
              {
                id: 'topic-7',
                name: 'S3 Storage',
                content: `
                  <h2>Amazon S3 (Simple Storage Service)</h2>
                  <p>Object storage service offering scalability, data availability, security, and performance.</p>
                  
                  <h3>Key Features</h3>
                  <ul>
                    <li>Store unlimited data</li>
                    <li>11 9's of durability (99.999999999%)</li>
                    <li>Multiple storage classes</li>
                    <li>Built-in security and compliance</li>
                  </ul>

                  <h3>Storage Classes</h3>
                  <ul>
                    <li><strong>S3 Standard</strong> - Frequently accessed data</li>
                    <li><strong>S3 Intelligent-Tiering</strong> - Automatic cost optimization</li>
                    <li><strong>S3 Glacier</strong> - Long-term archive</li>
                  </ul>

                  <h3>Common Use Cases</h3>
                  <ul>
                    <li>Backup and restore</li>
                    <li>Static website hosting</li>
                    <li>Data lakes and big data analytics</li>
                    <li>Content distribution</li>
                  </ul>
                `,
              },
            ],
          },
          {
            id: 'chap-4',
            name: 'Networking Fundamentals',
            isExpanded: false,
            topics: [
              {
                id: 'topic-8',
                name: 'VPC Overview',
                content: `
                  <h2>Amazon VPC (Virtual Private Cloud)</h2>
                  <p>Launch AWS resources in a logically isolated virtual network.</p>
                  
                  <h3>Core Components</h3>
                  <ul>
                    <li><strong>Subnets</strong> - Segments of VPC IP address range</li>
                    <li><strong>Route Tables</strong> - Determine network traffic routing</li>
                    <li><strong>Internet Gateway</strong> - Connect VPC to the internet</li>
                    <li><strong>NAT Gateway</strong> - Enable private subnet internet access</li>
                  </ul>

                  <h3>Security</h3>
                  <ul>
                    <li><strong>Security Groups</strong> - Virtual firewalls for instances</li>
                    <li><strong>Network ACLs</strong> - Subnet-level security</li>
                  </ul>
                `,
              },
            ],
          },
        ],
      },
      {
        id: 'cat-3',
        name: 'Intermediate',
        isExpanded: false,
        chapters: [
          {
            id: 'chap-5',
            name: 'Advanced Compute',
            isExpanded: false,
            topics: [
              {
                id: 'topic-9',
                name: 'Lambda Functions',
                content: `
                  <h2>AWS Lambda</h2>
                  <p>Serverless compute service that runs code in response to events.</p>
                  
                  <h3>Benefits</h3>
                  <ul>
                    <li>No server management</li>
                    <li>Automatic scaling</li>
                    <li>Pay only for compute time</li>
                    <li>Built-in high availability</li>
                  </ul>

                  <h3>Use Cases</h3>
                  <ul>
                    <li>Data processing</li>
                    <li>Real-time file processing</li>
                    <li>API backends</li>
                    <li>Event-driven architectures</li>
                  </ul>

                  <h3>Pricing</h3>
                  <p>Charged based on number of requests and duration of code execution.</p>
                `,
              },
              {
                id: 'topic-10',
                name: 'ECS and Containers',
                content: `
                  <h2>Amazon ECS (Elastic Container Service)</h2>
                  <p>Fully managed container orchestration service.</p>
                  
                  <h3>Container Basics</h3>
                  <p>Containers package code and dependencies together for consistent deployment.</p>

                  <h3>ECS vs EKS</h3>
                  <ul>
                    <li><strong>ECS</strong> - AWS proprietary, simpler to use</li>
                    <li><strong>EKS</strong> - Managed Kubernetes, industry standard</li>
                  </ul>

                  <h3>Launch Types</h3>
                  <ul>
                    <li><strong>EC2</strong> - Run containers on EC2 instances</li>
                    <li><strong>Fargate</strong> - Serverless containers</li>
                  </ul>
                `,
              },
            ],
          },
        ],
      },
      {
        id: 'cat-4',
        name: 'Advanced',
        isExpanded: false,
        chapters: [
          {
            id: 'chap-6',
            name: 'Architecture Patterns',
            isExpanded: false,
            topics: [
              {
                id: 'topic-11',
                name: 'Microservices Architecture',
                content: `
                  <h2>Microservices on AWS</h2>
                  <p>Architectural approach where applications are built as collections of small, independent services.</p>
                  
                  <h3>Key Principles</h3>
                  <ul>
                    <li>Single responsibility</li>
                    <li>Independent deployment</li>
                    <li>Decentralized data management</li>
                    <li>Failure isolation</li>
                  </ul>

                  <h3>AWS Services for Microservices</h3>
                  <ul>
                    <li><strong>API Gateway</strong> - Entry point for services</li>
                    <li><strong>Lambda</strong> - Serverless functions</li>
                    <li><strong>ECS/EKS</strong> - Container orchestration</li>
                    <li><strong>SQS/SNS</strong> - Message queuing and notifications</li>
                  </ul>

                  <h3>Best Practices</h3>
                  <ul>
                    <li>Use API Gateway for unified entry</li>
                    <li>Implement circuit breakers</li>
                    <li>Monitor with CloudWatch and X-Ray</li>
                    <li>Automate deployment with CI/CD</li>
                  </ul>
                `,
              },
              {
                id: 'topic-12',
                name: 'Event-Driven Architecture',
                content: `
                  <h2>Event-Driven Architecture on AWS</h2>
                  <p>Design pattern where components communicate through events.</p>
                  
                  <h3>Core Concepts</h3>
                  <ul>
                    <li><strong>Event Producers</strong> - Generate events</li>
                    <li><strong>Event Routers</strong> - Route events to consumers</li>
                    <li><strong>Event Consumers</strong> - Process events</li>
                  </ul>

                  <h3>AWS Services</h3>
                  <ul>
                    <li><strong>EventBridge</strong> - Serverless event bus</li>
                    <li><strong>SNS</strong> - Pub/Sub messaging</li>
                    <li><strong>SQS</strong> - Message queuing</li>
                    <li><strong>Kinesis</strong> - Real-time data streaming</li>
                  </ul>

                  <h3>Benefits</h3>
                  <ul>
                    <li>Loose coupling</li>
                    <li>Scalability</li>
                    <li>Resilience</li>
                    <li>Flexibility</li>
                  </ul>
                `,
              },
            ],
          },
          {
            id: 'chap-7',
            name: 'Security & Compliance',
            isExpanded: false,
            topics: [
              {
                id: 'topic-13',
                name: 'IAM Best Practices',
                content: `
                  <h2>AWS IAM Best Practices</h2>
                  <p>Identity and Access Management security recommendations.</p>
                  
                  <h3>Principle of Least Privilege</h3>
                  <p>Grant only the permissions required to perform a task.</p>

                  <h3>Best Practices</h3>
                  <ul>
                    <li>Enable MFA for all users</li>
                    <li>Use roles instead of access keys</li>
                    <li>Rotate credentials regularly</li>
                    <li>Use policy conditions for extra security</li>
                    <li>Monitor with CloudTrail</li>
                  </ul>

                  <h3>IAM Policies Structure</h3>
                  <pre><code>{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::bucket/*"
  }]
}</code></pre>
                `,
              },
            ],
          },
        ],
      },
    ];
  }

  toggleCategory(category: Category): void {
    category.isExpanded = !category.isExpanded;
  }

  toggleChapter(chapter: Chapter): void {
    chapter.isExpanded = !chapter.isExpanded;
  }

  selectTopic(topic: Topic): void {
    this.selectedTopic = topic;
  }

  isTopicSelected(topic: Topic): boolean {
    return this.selectedTopic?.id === topic.id;
  }
}
