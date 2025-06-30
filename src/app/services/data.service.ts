import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Experience, Project } from "../models/project.model";
import { Skill } from "../models/skill.model";
import { Testimonial } from "../models/testimonial.model";

@Injectable({
  providedIn: "root",
})
export class DataService {
  // Portfolio data
  private portfolioOwner = {
    name: "Omkar Pawar",
    title: "Software Engineer (Angular + Node.js)",
    email: "omkar.angular@gmail.com",
    phone: "8308609962",
    location: "Kolhapur, Maharashtra, India",
    about: `I'm a passionate MEAN stack developer with over 3.6 years of experience, with a strong emphasis on front-end development using Angular (60–70%) and solid hands-on experience with Node.js, Express, and MongoDB (30–40%) on the backend.

    I specialize in building dynamic, responsive, and user-friendly web applications that solve real-world problems. My focus is on delivering clean, maintainable code and crafting seamless user experiences powered by Angular's robust framework and component-driven architecture.

    On the backend, I design and integrate RESTful APIs, manage databases, and ensure smooth communication between services, contributing to scalable and performant full-stack solutions.

    I’m driven by a love for learning and continuously exploring new technologies to stay ahead in the evolving web development landscape.`,
    social: {
      github: "https://github.com/omipawar",
      linkedin: "https://www.linkedin.com/in/omkarpawar93059b23b/",
      twitter: "",
      dribbble: "",
    },
  };

  // Projects data
  private projectsSubject = new BehaviorSubject<Project[]>([
    {
      id: 1,
      title: "Skill India Digital Hub",
      description:
        "Explore Skill India Digital Hub's (SIDH) free courses & skill development schemes across sectors including IT, digital marketing, coding, AI. Find jobs & apprenticeship opportunities.",
      image: "assets/SIP.webp",
      technologies: [
        "Angular",
        "Bootstrap",
        "Node.js",
        "MongoDB",
        "Express",
        "Golang",
      ],
      category: "Web Development",
      link: "https://www.skillindiadigital.gov.in/home",
      featured: true,
    },
    {
      id: 2,
      title: "IVUniverse",
      description:
        "Powering Meaningful Conversations That Bring Communities Together For Good",
      image: "assets/ivUniverse.png",
      technologies: [
        "Angular",
        "Angular Material",
        "AGM Maps",
        "Node.js",
        "MongoDB",
        "Express",
      ],
      category: "Web Development",
      link: "https://ivuniverse.com/",
      featured: true,
    },
  ]);

  // Skills data
  private skillsSubject = new BehaviorSubject<Skill[]>([
    { name: "JavaScript", level: 95, category: "Frontend" },
    { name: "TypeScript", level: 90, category: "Frontend" },
    { name: "Angular", level: 95, category: "Frontend" },
    // { name: "React", level: 85, category: "Frontend" },
    // { name: "Vue.js", level: 80, category: "Frontend" },
    { name: "HTML/CSS", level: 90, category: "Frontend" },
    { name: "Bootstrap", level: 90, category: "Frontend" },
    { name: "SASS/SCSS", level: 50, category: "Frontend" },
    { name: "Node.js", level: 75, category: "Backend" },
    { name: "Express", level: 75, category: "Backend" },
    { name: "MongoDB", level: 60, category: "Backend" },
    // { name: "PostgreSQL", level: 65, category: "Backend" },
    // { name: "UI/UX Design", level: 85, category: "Design" },
    // { name: "Figma", level: 90, category: "Design" },
    // { name: "Adobe XD", level: 85, category: "Design" },
    // { name: "Sketch", level: 80, category: "Design" },
    { name: "Git/GitHub/GitLab/AWS", level: 90, category: "Tools" },
    { name: "Postman", level: 70, category: "Tools" },
    // { name: "Docker", level: 70, category: "Tools" },
    { name: "CI/CD (GitHub Actions)", level: 55, category: "Tools" },
  ]);

  // Testimonials data
  private testimonialsSubject = new BehaviorSubject<Testimonial[]>([
    {
      id: 1,
      name: "Sarah Johnson",
      position: "CEO at TechStart",
      content:
        "Alex transformed our outdated website into a beautiful, functional platform that perfectly represents our brand. Their technical skills and eye for design are exceptional.",
      avatar:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "Product Manager at InnovateCorp",
      content:
        "Working with Alex on our product dashboard was a fantastic experience. They understood our needs perfectly and delivered a solution that exceeded our expectations.",
      avatar:
        "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      position: "Founder of DesignHub",
      content:
        "Alex has a rare combination of technical excellence and creative vision. They not only built us a highly functional application but ensured it looked stunning too.",
      avatar:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
  ]);

  private experience: Experience[] = [
    {
      role: "Junior Software Developer",
      company: "Transneuron Technology",
      period: "Jul 2022 - Present",
      details: [
        "Developed scalable web applications using MongoDB, Express.js, Angular, and Node.js ensuring performance and reliability",
        "Integrated Angular components with RESTful APIs built with Node.js, Express, and Golang, enabling seamless data flow across microservices and enhancing system efficiency",
        "Integrated third-party APIs and Collaborated with cross-functional teams to analyze requirements, design solutions, and implement new features, driving project success",
        "Provided proactive production support, identifying and resolving issues quickly to ensure system stability and improve customer satisfaction.",
      ],
    },
    {
      role: "Front-End / Angular Developer",
      company: "Creative Web Agency",
      period: "Jan 2022 - Jun 2022",
      details: [
        "Built responsive web applications using HTML, CSS, JavaScript, Bootstrap, and Angular.",
        "Collaborated with designers to implement pixel-perfect UI",
        "Collaborated with clients to understand requirements and deliver timely solutions",
      ],
    },
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
    return this.projectsSubject.value.filter((project) => project.featured);
  }

  getProjectsByCategory(category: string) {
    return this.projectsSubject.value.filter(
      (project) => project.category === category
    );
  }

  getSkills() {
    return this.skillsSubject.asObservable();
  }

  getSkillsByCategory(category: string) {
    return this.skillsSubject.value.filter(
      (skill) => skill.category === category
    );
  }

  getSkillCategories() {
    const categories = new Set<string>();
    this.skillsSubject.value.forEach((skill) => categories.add(skill.category));
    return Array.from(categories);
  }

  getTestimonials() {
    return this.testimonialsSubject.asObservable();
  }

  getExperience() {
    return this.experience;
  }
}
