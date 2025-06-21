import { Component, Input, AfterViewInit, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Skill } from '../../../../models/skill.model';
import { AnimationService } from '../../../../services/animation.service';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="skills" class="section skills-section">
      <div class="container">
        <div class="section-header text-center">
          <h2 class="fade-in">My Skills</h2>
          <div class="divider fade-in"></div>
          <p class="section-description fade-in">
            Here are the technical skills and tools I've mastered over the years.
          </p>
        </div>
        
        <div class="skills-filter fade-in">
          <button 
            class="filter-btn" 
            [class.active]="activeCategory === 'All'" 
            (click)="filterSkills('All')">
            All
          </button>
          <ng-container *ngFor="let category of categories">
            <button 
              class="filter-btn" 
              [class.active]="activeCategory === category" 
              (click)="filterSkills(category)">
              {{ category }}
            </button>
          </ng-container>
        </div>
        
        <div class="skills-grid">
          <ng-container *ngFor="let skill of filteredSkills; let i = index">
            <div class="skill-item fade-in" [style.animationDelay]="i * 0.1 + 's'">
              <div class="skill-info">
                <h4 class="skill-name">{{ skill.name }}</h4>
                <span class="skill-level">{{ skill.level }}%</span>
              </div>
              <div class="skill-bar fade-in slide-in-right">
                <div class="skill-progress" [style.width]="skill.level + '%'"></div>
              </div>
            </div>
          </ng-container>
        </div>
      </div>
    </section>
  `,
  styles: [`
  .skill-progress {
      height: 8px;
      background-color: var(--text-secondary);
      border-radius: 4px;
      overflow: hidden;
    }
    
    .skill-progress-bar {
      height: 100%;
      border-radius: 4px;
      background-color: var(--primary-500);
      animation: progress 1s ease-in-out;
    }
    @keyframes progress {
      from { width: 0; }
    }
    .skills-section {
      background-color: var(--bg-primary);
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
    
    .skills-filter {
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
      background-color: var(--bg-tertiary);
    }
    
    .filter-btn:hover, .filter-btn.active {
      background-color: var(--primary-500);
      color: white;
    }
    
    .skills-grid {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      gap: var(--spacing-4);
    }
    
    .skill-item {
      background-color: var(--bg-secondary);
      padding: var(--spacing-3);
      border-radius: 8px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .skill-item:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    }
    
    .skill-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--spacing-2);
    }
    
    .skill-name {
      margin: 0;
      font-size: 1.1rem;
    }
    
    .skill-level {
      font-weight: 600;
      color: var(--primary-500);
    }
    
    .skill-bar {
      height: 8px;
      background-color: var(--bg-tertiary);
      border-radius: 4px;
      overflow: hidden;
    }
    
    .skill-progress {
      height: 100%;
      background: var(--primary-500);
      border-radius: 4px;
      transition: width 1.5s ease-in-out;
    }
    
    @media (min-width: 768px) {
      .skills-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    
    @media (min-width: 992px) {
      .skills-grid {
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
export class SkillsComponent implements AfterViewInit, OnInit {
  @Input() skills: Skill[] = [];
  @Input() categories: string[] = [];
  filteredSkills: Skill[] = [];
  activeCategory: string = 'All';
  
  constructor(private animationService: AnimationService) {}
  
  ngOnInit() {
    this.filteredSkills = this.skills;
  }
  
  ngAfterViewInit() {
    this.setupAnimations();
  }
  
  filterSkills(category: string) {
    this.activeCategory = category;
    
    if (category === 'All') {
      this.filteredSkills = this.skills;
    } else {
      this.filteredSkills = this.skills.filter(skill => skill.category === category);
    }
    
    // Re-trigger animations after filter
    setTimeout(() => {
      this.setupAnimations();
    }, 100);
  }
  
  setupAnimations() {
    const fadeElements = document.querySelectorAll('#skills .fade-in');
    this.animationService.setupAnimations(fadeElements, 'visible');
  }
}