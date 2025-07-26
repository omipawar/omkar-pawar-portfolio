import { Component, Input, AfterViewInit, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../../../models/project.model';
import { AnimationService } from '../../../../services/animation.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <section id="projects" class="section projects-section">
      <div class="container">
        <div class="section-header text-center">
          <h2 class="fade-in">{{'PROJECTS' | translate}}</h2>
          <div class="divider fade-in"></div>
          <p class="section-description fade-in">
            {{'PROJECTS_TEXT' | translate}}
          </p>
        </div>
        
        <div class="projects-filter fade-in">
          <button 
            class="filter-btn" 
            [class.active]="activeCategory === 'All'" 
            (click)="filterProjects('All')">
            All
          </button>
          <ng-container *ngFor="let category of categories">
            <button 
              class="filter-btn" 
              [class.active]="activeCategory === category" 
              (click)="filterProjects(category)">
              {{ category }}
            </button>
          </ng-container>
        </div>
        
        <div class="projects-grid">
          <ng-container *ngFor="let project of filteredProjects; let i = index">
            <div class="project-item fade-in" [style.animationDelay]="i * 0.1 + 's'">
              <div class="project-image">
                <img [src]="project.image" [alt]="project.title">
                <div class="project-overlay">
                  <div class="project-links">
                    <a [href]="project.link" target="_blank" rel="noopener noreferrer" class="project-link">
                      <i class="fas fa-external-link-alt"></i>
                    </a>
                    <a href="#" (click)="openProjectDetails(project, $event)" class="project-link">
                      <i class="fas fa-info-circle"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div class="project-content">
                <h3 class="project-title">{{ project.title }}</h3>
                <p class="project-category">{{ project.category }}</p>
                <p class="project-description">{{ project.description }}</p>
                <div class="project-tech">
                  <ng-container *ngFor="let tech of project.technologies">
                    <span class="tech-tag">{{ tech }}</span>
                  </ng-container>
                </div>
              </div>
            </div>
          </ng-container>
        </div>
      </div>
      
      <!-- Project Details Modal -->
      <div class="project-modal" *ngIf="selectedProject" [class.open]="isModalOpen">
        <div class="modal-content">
          <div class="modal-close" (click)="closeModal()">
            <i class="fas fa-times"></i>
          </div>
          <div class="modal-image">
            <img [src]="selectedProject.image" [alt]="selectedProject.title">
          </div>
          <div class="modal-body">
            <h2 class="modal-title">{{ selectedProject.title }}</h2>
            <span class="modal-category">{{ selectedProject.category }}</span>
            <div class="modal-description">
              <p>{{ selectedProject.description }}</p>
              <!-- <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Morbi at fringilla nisl, in commodo quam. Nullam non nulla ut quam feugiat gravida non nec dolor.</p> -->
            </div>
            <div class="modal-tech">
              <h4>Technologies Used:</h4>
              <div class="tech-tags">
                <ng-container *ngFor="let tech of selectedProject.technologies">
                  <span class="tech-tag">{{ tech }}</span>
                </ng-container>
              </div>
            </div>
            <div class="modal-cta">
              <a [href]="selectedProject.link" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
                Visit Project
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div class="modal-backdrop" *ngIf="isModalOpen" (click)="closeModal()"></div>
    </section>
  `,
  styles: [`
    .projects-section {
      background-color: var(--bg-tertiary);
    }
    
    .section-description {
      max-width: 600px;
      margin: 0 auto var(--spacing-5);
      color: var(--text-secondary);
    }
    
    .divider {
      height: 4px;
      width: 70px;
      background-color: var(--primary-500);
      margin: 0 auto var(--spacing-3);
    }
    
    .projects-filter {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      margin-bottom: var(--spacing-5);
    }
    
    .filter-btn {
      background: none;
      border: none;
      padding: 8px 16px;
      margin: 0 8px 10px;
      border-radius: 20px;
      cursor: pointer;
      font-weight: 500;
      color: var(--text-secondary);
      transition: all 0.3s ease;
      background-color: var(--bg-secondary);
    }
    
    .filter-btn:hover, .filter-btn.active {
      background-color: var(--primary-500);
      color: white;
    }
    
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      gap: var(--spacing-4);
    }
    
    .project-item {
      background-color: var(--bg-secondary);
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .project-item:hover {
      transform: translateY(-10px);
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    }
    
    .project-image {
      position: relative;
      height: 200px;
      overflow: hidden;
    }
    
    .project-image img {
      width: 100%;
      height: 100%;
      object-fit: scale-down;
      transition: transform 0.5s ease;
    }
    
    .project-item:hover .project-image img {
      transform: scale(1.1);
    }
    
    .project-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    .project-item:hover .project-overlay {
      opacity: 1;
    }
    
    .project-links {
      display: flex;
    }
    
    .project-link {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      background-color: white;
      color: var(--primary-500);
      border-radius: 50%;
      margin: 0 5px;
      transition: all 0.3s ease;
    }
    
    .project-link:hover {
      background-color: var(--neutral-800);
      color: white;
    }
    
    .project-content {
      padding: var(--spacing-3);
    }
    
    .project-title {
      margin-bottom: var(--spacing-1);
      font-size: 1.3rem;
    }
    
    .project-category {
      color: var(--primary-500);
      font-weight: 500;
      margin-bottom: var(--spacing-2);
    }
    
    .project-description {
      color: var(--text-secondary);
      margin-bottom: var(--spacing-2);
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .project-tech {
      display: flex;
      flex-wrap: wrap;
    }
    
    .tech-tag {
      background-color: var(--bg-tertiary);
      color: var(--text-secondary);
      padding: 4px 10px;
      border-radius: 20px;
      font-size: 0.8rem;
      margin-right: 8px;
      margin-bottom: 8px;
    }
    
    /* Modal Styles */
    .project-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1001;
      padding: 20px;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s ease, visibility 0.3s ease;
    }
    
    .project-modal.open {
      opacity: 1;
      visibility: visible;
    }
    
    .modal-content {
      background-color: var(--bg-secondary);
      border-radius: 10px;
      max-width: 900px;
      width: 100%;
      max-height: 90vh;
      overflow-y: auto;
      position: relative;
      z-index: 1002;
      transform: scale(0.9);
      transition: transform 0.3s ease;
    }
    
    .project-modal.open .modal-content {
      transform: scale(1);
    }
    
    .modal-close {
      position: absolute;
      top: 15px;
      right: 15px;
      width: 36px;
      height: 36px;
      background-color: rgba(0, 0, 0, 0.5);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 1003;
      transition: background-color 0.3s ease;
    }
    
    .modal-close:hover {
      background-color: var(--primary-500);
    }
    
    .modal-image {
      width: 100%;
      height: 300px;
      overflow: hidden;
    }
    
    .modal-image img {
      width: 100%;
      height: 100%;
      object-fit: scale-down;
    }
    
    .modal-body {
      padding: var(--spacing-4);
    }
    
    .modal-title {
      margin-bottom: var(--spacing-1);
      font-size: 1.8rem;
    }
    
    .modal-category {
      display: inline-block;
      color: var(--primary-500);
      font-weight: 500;
      margin-bottom: var(--spacing-3);
    }
    
    .modal-description {
      color: var(--text-secondary);
      margin-bottom: var(--spacing-3);
    }
    
    .modal-description p {
      margin-bottom: var(--spacing-2);
    }
    
    .modal-tech {
      margin-bottom: var(--spacing-3);
    }
    
    .modal-tech h4 {
      margin-bottom: var(--spacing-2);
    }
    
    .tech-tags {
      display: flex;
      flex-wrap: wrap;
    }
    
    .modal-cta {
      margin-top: var(--spacing-4);
    }
    
    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(5px);
      z-index: 1000;
    }
    
    @media (min-width: 768px) {
      .projects-grid {
        grid-template-columns: repeat(2, 1fr);
      }
      
      .modal-image {
        height: 400px;
      }
    }
    
    @media (min-width: 992px) {
      .projects-grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }
    
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .fade-in {
      opacity: 0;
      animation-fill-mode: forwards;
    }
    
    .fade-in.visible {
      animation: fadeIn 0.6s ease forwards;
    }
  `]
})
export class ProjectsComponent implements AfterViewInit, OnInit {
  @Input() projects: Project[] = [];
  filteredProjects: Project[] = [];
  categories: string[] = [];
  activeCategory: string = 'All';
  selectedProject: Project | null = null;
  isModalOpen: boolean = false;
  
  constructor(private animationService: AnimationService) {}
  
  ngOnInit() {
    this.filteredProjects = this.projects;
    this.extractCategories();
  }
  
  ngAfterViewInit() {
    this.setupAnimations();
  }
  
  extractCategories() {
    const categorySet = new Set<string>();
    this.projects.forEach(project => categorySet.add(project.category));
    this.categories = Array.from(categorySet);
  }
  
  filterProjects(category: string) {
    this.activeCategory = category;
    
    if (category === 'All') {
      this.filteredProjects = this.projects;
    } else {
      this.filteredProjects = this.projects.filter(project => project.category === category);
    }
    
    // Re-trigger animations after filter
    setTimeout(() => {
      this.setupAnimations();
    }, 100);
  }
  
  openProjectDetails(project: Project, event: Event) {
    event.preventDefault();
    this.selectedProject = project;
    this.isModalOpen = true;
    document.body.style.overflow = 'hidden';
  }
  
  closeModal() {
    this.isModalOpen = false;
    document.body.style.overflow = '';
    setTimeout(() => {
      this.selectedProject = null;
    }, 300);
  }
  
  setupAnimations() {
    const fadeElements = document.querySelectorAll('#projects .fade-in');
    this.animationService.setupAnimations(fadeElements, 'visible');
  }
}