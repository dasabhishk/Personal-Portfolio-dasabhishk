export const skills = [
  { name: 'Backend Development', percentage: 95 },
  { name: 'Cloud Architecture', percentage: 90 },
  { name: 'Database Design', percentage: 85 },
  { name: 'API Development', percentage: 92 },
  { name: 'System Architecture', percentage: 88 }
];

export const techStack = [
  { name: 'AWS', icon: 'ri-aws-fill', color: '#FF9900' },
  { name: '.NET', icon: 'ri-code-box-line', color: '#512BD4' },
  { name: 'C#', icon: 'ri-code-s-slash-line', color: '#239120' },
  { name: 'SQL', icon: 'ri-database-2-line', color: '#336791' },
  { name: 'Prometheus', icon: 'ri-bar-chart-box-line', color: '#E6522C' },
  { name: 'Grafana', icon: 'ri-dashboard-line', color: '#F46800' }
];

export const experienceItems = [
  {
    title: 'Software Engineer II',
    company: 'Philips',
    period: 'Nov 2023 – Present',
    location: 'Bengaluru, India',
    description: 'Working in the Cardiovascular Imaging team, focusing on product-related serviceability tools and backend development.',
    bullets: [
      'Owned application design, feature definition, and created tools from scratch',
      'Led backend service development for core product features',
      'Integrated Prometheus-Grafana Alloy workflow for metrics collection',
      'Packaged and deployed the application to client systems',
      'Mentored junior developers, conducted code reviews, and hosted knowledge sharing sessions'
    ],
    tags: ['C#', '.NET Core', 'AWS', 'PL/SQL', 'Docker', 'Containerization', 'Prometheus', 'Grafana', 'GitHub Actions', 'CI/CD', 'PowerShell', 'WiX', 'Unit Testing', 'Agile']
  },
  {
    title: 'Software Engineer',
    company: 'Philips',
    period: 'Aug 2022 – Dec 2023',
    location: 'Bengaluru, India',
    description: 'Worked in the Electronic Medical Records team, primarily focusing on backend Java development and PL/SQL-driven report generation.',
    bullets: [
      'Designed and developed Java Interfaces and REST APIs',
      'Improved SQL query performance by 40% through tuning and indexing',
      'Designed and generated clinical workflow reports',
      'Maintained internal automation tools and schema search utilities'
    ],
    tags: ['Java', 'Spring Boot', 'Spring', 'AWS', 'PL/SQL', 'REST', 'API Design', 'Postman', 'Agile', 'MVC']
  },
  {
    title: 'Intern',
    company: 'Philips',
    period: 'Mar 2022 – Aug 2022',
    location: 'Bengaluru, India',
    description: 'Interned with the EMR & CM team, contributing to service order dashboards and automation tools.',
    bullets: [
      'Built Power BI dashboards to track service orders and operational metrics',
      'Wrote validation scripts for algorithm optimization in healthcare workflows',
      'Delivered knowledge sessions on Gen AI and AWS basics for the team',
      'Participated in Agile ceremonies and contributed to backlog grooming'
    ],
    tags: ['Python', 'Power BI', 'Analytics', 'Visualization', 'Agile', 'PL/SQL', 'Reporting Automation']
  }
];

export const projects = [
  {
    title: 'Healthcare Data Pipeline',
    description: 'A scalable ETL pipeline for processing and analyzing healthcare data from multiple sources. Built with AWS Lambda, S3, and DynamoDB with a focus on HIPAA compliance and data security.',
    tags: ['AWS', 'Lambda', 'DynamoDB', 'Python'],
    imageUrl: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    githubUrl: 'https://github.com',
    projectUrl: '#'
  },
  {
    title: 'Microservices Framework',
    description: 'A lightweight framework for building microservices in .NET Core with integrated service discovery, circuit breakers, and distributed tracing capabilities.',
    tags: ['.NET Core', 'Docker', 'Kubernetes', 'gRPC'],
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    githubUrl: 'https://github.com',
    projectUrl: '#'
  },
  {
    title: 'SQL Query Optimizer',
    description: 'A tool for analyzing and optimizing SQL queries for performance. Features query analysis, index recommendations, and visualization of query execution plans.',
    tags: ['C#', 'SQL', 'WPF', 'LINQ'],
    imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    githubUrl: 'https://github.com',
    projectUrl: '#'
  },
  {
    title: 'Serverless Analytics',
    description: 'A serverless application for real-time analytics processing. Uses AWS Lambda, API Gateway, and DynamoDB with WebSocket connections for live dashboard updates.',
    tags: ['AWS', 'Serverless', 'WebSockets', 'Node.js'],
    imageUrl: 'https://images.unsplash.com/photo-1633412802994-5c058f151b66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    githubUrl: 'https://github.com',
    projectUrl: '#'
  },
  {
    title: 'API Gateway Framework',
    description: 'A lightweight API gateway solution with rate limiting, JWT authentication, and request/response transformation capabilities for microservice architectures.',
    tags: ['.NET Core', 'Redis', 'JWT', 'OWIN'],
    imageUrl: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    githubUrl: 'https://github.com',
    projectUrl: '#'
  },
  {
    title: 'Monitoring Dashboard',
    description: 'A custom monitoring dashboard built with Grafana and Prometheus for visualizing application metrics, logs, and system health information with alerting capabilities.',
    tags: ['Grafana', 'Prometheus', 'Docker', 'InfluxDB'],
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    githubUrl: 'https://github.com',
    projectUrl: '#'
  }
];

export const socialLinks = [
  {
    title: 'X',
    icon: 'ri-twitter-x-line',
    value: 'twitter.com/johndoe',
    link: 'https://twitter.com/johndoe'
  },
  {
    title: 'YouTube',
    icon: 'ri-youtube-line',
    value: 'youtube.com/@190HITMAN',
    link: 'https://www.youtube.com/@190HITMAN'
  },
  {
    title: 'GitHub',
    icon: 'ri-github-line',
    value: 'github.com/johndoe',
    link: 'https://github.com/johndoe'
  },
  {
    title: 'Discord',
    icon: 'ri-discord-line',
    value: 'discordapp.com/users/johndoe',
    link: 'https://discordapp.com/users/johndoe'
  }
];
