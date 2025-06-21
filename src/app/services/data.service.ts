import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Experience, Project } from '../models/project.model';
import { Skill } from '../models/skill.model';
import { Testimonial } from '../models/testimonial.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // Portfolio data
  private portfolioOwner = {
    name: 'Alex Morgan',
    title: 'Software Engineer & UI/UX Designer',
    email: 'alex@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    about: `I'm a passionate software engineer and UI/UX designer with over 5 years of experience creating beautiful, functional web applications. I specialize in front-end development with a focus on creating intuitive user experiences that solve real problems.
    
    My approach combines technical expertise with design thinking to build products that are not only visually appealing but also highly functional and user-friendly. I'm constantly learning and exploring new technologies to stay at the forefront of web development.`,
    social: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      dribbble: 'https://dribbble.com'
    }
  };

  // Projects data
  private projectsSubject = new BehaviorSubject<Project[]>([
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A modern e-commerce platform with a sleek UI, integrated payment processing, and inventory management.',
      image: 'https://images.pexels.com/photos/6214476/pexels-photo-6214476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      technologies: ['Angular', 'Node.js', 'MongoDB', 'Stripe API'],
      category: 'Web Development',
      link: 'https://example.com/ecommerce',
      featured: true
    },
    {
      id: 2,
      title: 'Financial Dashboard',
      description: 'Interactive dashboard for tracking investments, expenses, and financial goals with data visualization.',
      image: 'https://images.pexels.com/photos/7681094/pexels-photo-7681094.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      technologies: ['React', 'D3.js', 'Firebase', 'Material UI'],
      category: 'Web Application',
      link: 'https://example.com/dashboard',
      featured: true
    },
    {
      id: 3,
      title: 'Travel Companion App',
      description: 'Mobile app for travelers to plan itineraries, discover local attractions, and share experiences.',
      image: 'https://images.pexels.com/photos/7691384/pexels-photo-7691384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      technologies: ['React Native', 'GraphQL', 'AWS Amplify', 'Google Maps API'],
      category: 'Mobile App',
      link: 'https://example.com/travel',
      featured: true
    },
    {
      id: 4,
      title: 'Health & Fitness Tracker',
      description: 'Comprehensive health tracking application with workout plans, nutrition logs, and progress visualization.',
      image: 'https://images.pexels.com/photos/3927392/pexels-photo-3927392.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      technologies: ['Angular', 'TypeScript', 'Firebase', 'Chart.js'],
      category: 'Web Application',
      link: 'https://example.com/fitness',
      featured: false
    },
    {
      id: 5,
      title: 'Task Management System',
      description: 'Intuitive task management tool with team collaboration features, deadlines, and priority settings.',
      image: 'https://images.pexels.com/photos/6956821/pexels-photo-6956821.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      technologies: ['Vue.js', 'Vuex', 'Node.js', 'PostgreSQL'],
      category: 'Web Development',
      link: 'https://example.com/tasks',
      featured: false
    },
    {
      id: 6,
      title: 'Social Media Dashboard',
      description: 'Unified dashboard for managing multiple social media accounts with analytics and scheduling.',
      image: 'https://images.pexels.com/photos/5053740/pexels-photo-5053740.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      technologies: ['Next.js', 'Redux', 'Express', 'Social Media APIs'],
      category: 'Web Application',
      link: 'https://example.com/social',
      featured: false
    }
  ]);

  // Skills data
  private skillsSubject = new BehaviorSubject<Skill[]>([
    { name: 'JavaScript', level: 95, category: 'Frontend' },
    { name: 'TypeScript', level: 90, category: 'Frontend' },
    { name: 'Angular', level: 95, category: 'Frontend' },
    { name: 'React', level: 85, category: 'Frontend' },
    { name: 'Vue.js', level: 80, category: 'Frontend' },
    { name: 'HTML/CSS', level: 90, category: 'Frontend' },
    { name: 'SASS/SCSS', level: 85, category: 'Frontend' },
    { name: 'Node.js', level: 80, category: 'Backend' },
    { name: 'Express', level: 75, category: 'Backend' },
    { name: 'MongoDB', level: 70, category: 'Backend' },
    { name: 'PostgreSQL', level: 65, category: 'Backend' },
    { name: 'UI/UX Design', level: 85, category: 'Design' },
    { name: 'Figma', level: 90, category: 'Design' },
    { name: 'Adobe XD', level: 85, category: 'Design' },
    { name: 'Sketch', level: 80, category: 'Design' },
    { name: 'Git/GitHub', level: 90, category: 'Tools' },
    { name: 'Docker', level: 70, category: 'Tools' },
    { name: 'CI/CD', level: 75, category: 'Tools' }
  ]);

  // Testimonials data
  private testimonialsSubject = new BehaviorSubject<Testimonial[]>([
    {
      id: 1,
      name: 'Sarah Johnson',
      position: 'CEO at TechStart',
      content: 'Alex transformed our outdated website into a beautiful, functional platform that perfectly represents our brand. Their technical skills and eye for design are exceptional.',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      id: 2,
      name: 'Michael Chen',
      position: 'Product Manager at InnovateCorp',
      content: 'Working with Alex on our product dashboard was a fantastic experience. They understood our needs perfectly and delivered a solution that exceeded our expectations.',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      position: 'Founder of DesignHub',
      content: 'Alex has a rare combination of technical excellence and creative vision. They not only built us a highly functional application but ensured it looked stunning too.',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600'
    }
  ]);

  private experience: Experience[] = [
    {
      role: 'Senior Full Stack Developer',
      company: 'Tech Solutions Inc.',
      period: '2021 - Present',
      details: [
        'Led development of enterprise-scale web applications using Angular and Node.js',
        'Mentored junior developers and conducted code reviews',
        'Implemented CI/CD pipelines reducing deployment time by 40%'
      ]
    },
    {
      role: 'Full Stack Developer',
      company: 'Digital Innovations Ltd.',
      period: '2019 - 2021',
      details: [
        'Developed and maintained multiple client projects using React and Express',
        'Optimized database queries improving application performance by 30%',
        'Integrated third-party APIs and payment gateways'
      ]
    },
    {
      role: 'Frontend Developer',
      company: 'Creative Web Agency',
      period: '2017 - 2019',
      details: [
        'Built responsive web applications using Angular and Vue.js',
        'Collaborated with designers to implement pixel-perfect UI',
        'Reduced load time by 50% through optimization techniques'
      ]
    }
  ];

  constructor() {}

  // Getters for observable data
  getPortfolioOwner() {
    return this.portfolioOwner;
  }

  getProjects() {
    return this.projectsSubject.asObservable();
  }

  getFeaturedProjects() {
    return this.projectsSubject.value.filter(project => project.featured);
  }

  getProjectsByCategory(category: string) {
    return this.projectsSubject.value.filter(project => project.category === category);
  }

  getSkills() {
    return this.skillsSubject.asObservable();
  }

  getSkillsByCategory(category: string) {
    return this.skillsSubject.value.filter(skill => skill.category === category);
  }

  getSkillCategories() {
    const categories = new Set<string>();
    this.skillsSubject.value.forEach(skill => categories.add(skill.category));
    return Array.from(categories);
  }

  getTestimonials() {
    return this.testimonialsSubject.asObservable();
  }

  getExperience(){
    return this.experience;
  }
}