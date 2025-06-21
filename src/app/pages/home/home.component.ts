import { Component, OnInit, OnDestroy, ElementRef, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { AnimationService } from '../../services/animation.service';
import { Project } from '../../models/project.model';
import { Skill } from '../../models/skill.model';
import { Testimonial } from '../../models/testimonial.model';
import { HeroComponent } from './sections/hero/hero.component';
import { AboutComponent } from './sections/about/about.component';
import { SkillsComponent } from './sections/skills/skills.component';
import { ProjectsComponent } from './sections/projects/projects.component';
import { TestimonialsComponent } from './sections/testimonials/testimonials.component';
import { ContactComponent } from './sections/contact/contact.component';
import { ExperienceComponent } from './sections/experience/experience.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ProjectsComponent,
    // TestimonialsComponent,
    ContactComponent,
    ExperienceComponent
  ],
  template: `
    <div class="home-container">
      <app-hero [portfolioOwner]="portfolioOwner"></app-hero>
      <app-about [portfolioOwner]="portfolioOwner"></app-about>
      <app-experience></app-experience>
      <app-skills [skills]="skills" [categories]="skillCategories"></app-skills>
      <app-projects [projects]="projects"></app-projects>
      <!-- <app-testimonials [testimonials]="testimonials"></app-testimonials> -->
      <app-contact [portfolioOwner]="portfolioOwner"></app-contact>
    </div>
  `,
  styles: [`
    .home-container {
      overflow-x: hidden;
    }
  `]
})
export class HomeComponent implements OnInit, OnDestroy {
  portfolioOwner: any;
  projects: Project[] = [];
  skills: Skill[] = [];
  skillCategories: string[] = [];
  testimonials: Testimonial[] = [];
  
  constructor(private dataService: DataService) {}
  
  ngOnInit() {
    this.portfolioOwner = this.dataService.getPortfolioOwner();
    
    this.dataService.getProjects().subscribe(projects => {
      this.projects = projects;
    });
    
    this.dataService.getSkills().subscribe(skills => {
      this.skills = skills;
    });
    
    this.skillCategories = this.dataService.getSkillCategories();
    
    this.dataService.getTestimonials().subscribe(testimonials => {
      this.testimonials = testimonials;
    });
  }
  
  ngOnDestroy() {}
}