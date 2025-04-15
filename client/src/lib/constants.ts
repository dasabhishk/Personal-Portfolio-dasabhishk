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
    title: 'Software Engineer',
    company: 'Philips',
    period: '2021 - Present',
    description: 'Leading backend development for healthcare imaging systems using .NET Core, AWS services, and SQL databases.',
    bullets: [
      'Designed and implemented microservices architecture for medical data processing',
      'Optimized database queries improving response time by 40%',
      'Implemented CI/CD pipelines using AWS CodePipeline',
      'Set up monitoring using Prometheus and Grafana dashboards'
    ],
    tags: ['.NET Core', 'AWS', 'SQL', 'Docker', 'Kubernetes']
  },
  {
    title: 'Backend Developer',
    company: 'Healthcare Tech Inc.',
    period: '2018 - 2021',
    description: 'Developed and maintained backend services for patient management systems using C# and SQL Server.',
    bullets: [
      'Built RESTful APIs serving over 10,000 daily active users',
      'Migrated legacy systems to cloud infrastructure',
      'Implemented data encryption standards for HIPAA compliance',
      'Created automated test suites achieving 90% code coverage'
    ],
    tags: ['C#', 'SQL Server', 'Azure', 'Redis']
  },
  {
    title: 'Software Developer',
    company: 'Tech Solutions Group',
    period: '2016 - 2018',
    description: 'Full-stack development with focus on backend technologies and database optimization.',
    bullets: [
      'Developed web applications using ASP.NET MVC framework',
      'Designed and implemented database schemas for various clients',
      'Created internal development tools to improve team efficiency',
      'Mentored junior developers in best practices and coding standards'
    ],
    tags: ['ASP.NET', 'JavaScript', 'PostgreSQL', 'Git']
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
    title: 'Email',
    icon: 'ri-mail-line',
    value: 'john.doe@example.com',
    link: 'mailto:john.doe@example.com'
  },
  {
    title: 'LinkedIn',
    icon: 'ri-linkedin-box-line',
    value: 'linkedin.com/in/johndoe',
    link: 'https://linkedin.com/in/johndoe'
  },
  {
    title: 'GitHub',
    icon: 'ri-github-line',
    value: 'github.com/johndoe',
    link: 'https://github.com/johndoe'
  },
  {
    title: 'Location',
    icon: 'ri-map-pin-line',
    value: 'Amsterdam, Netherlands',
    link: null
  }
];
