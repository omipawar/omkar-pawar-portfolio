import { Component, Input, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Testimonial } from '../../../../models/testimonial.model';
import { AnimationService } from '../../../../services/animation.service';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="testimonials" class="section testimonials-section">
      <div class="container">
        <div class="section-header text-center">
          <h2 class="fade-in">Testimonials</h2>
          <div class="divider fade-in"></div>
          <p class="section-description fade-in">
            Here's what some of my clients and colleagues have to say about my work.
          </p>
        </div>
        
        <div class="testimonials-grid">
          <ng-container *ngFor="let testimonial of testimonials; let i = index">
            <div class="testimonial-card fade-in" [style.animationDelay]="i * 0.2 + 's'">
              <div class="testimonial-content">
                <div class="quote-icon">
                  <i class="fas fa-quote-left"></i>
                </div>
                <p class="testimonial-text">{{ testimonial.content }}</p>
                <div class="testimonial-author">
                  <div class="author-avatar">
                    <img [src]="testimonial.avatar" [alt]="testimonial.name">
                  </div>
                  <div class="author-info">
                    <h4 class="author-name">{{ testimonial.name }}</h4>
                    <p class="author-position">{{ testimonial.position }}</p>
                  </div>
                </div>
              </div>
            </div>
          </ng-container>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .testimonials-section {
      background-color: var(--bg-primary);
      position: relative;
      overflow: hidden;
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
    
    .testimonials-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--spacing-4);
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .testimonial-card {
      background-color: var(--bg-secondary);
      border-radius: 15px;
      overflow: hidden;
      box-shadow: var(--shadow-lg);
      transition: transform 0.3s ease;
    }
    
    .testimonial-card:hover {
      transform: translateY(-5px);
    }
    
    .testimonial-content {
      padding: var(--spacing-4);
      position: relative;
    }
    
    .quote-icon {
      position: absolute;
      top: -15px;
      left: 20px;
      width: 40px;
      height: 40px;
      background-color: var(--primary-500);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      font-size: 1.2rem;
    }
    
    .testimonial-text {
      font-size: 1.1rem;
      color: var(--text-secondary);
      margin: var(--spacing-4) 0;
      line-height: 1.8;
      min-height: 100px;
    }
    
    .testimonial-author {
      display: flex;
      align-items: center;
      border-top: 1px solid var(--border-color);
      padding-top: var(--spacing-3);
      margin-top: var(--spacing-3);
    }
    
    .author-avatar {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: var(--spacing-2);
      border: 3px solid var(--primary-500);
    }
    
    .author-avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .author-name {
      font-size: 1.1rem;
      margin: 0 0 5px;
      color: var(--text-primary);
    }
    
    .author-position {
      color: var(--text-tertiary);
      font-size: 0.9rem;
      margin: 0;
    }
    
    @media (min-width: 768px) {
      .testimonials-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    
    @media (min-width: 1024px) {
      .testimonials-grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }
  `]
})
export class TestimonialsComponent implements AfterViewInit {
  @Input() testimonials: Testimonial[] = [];
  
  constructor(private animationService: AnimationService) {}
  
  ngAfterViewInit() {
    this.setupAnimations();
  }
  
  setupAnimations() {
    const fadeElements = document.querySelectorAll('#testimonials .fade-in');
    this.animationService.setupAnimations(fadeElements, 'visible');
  }
}