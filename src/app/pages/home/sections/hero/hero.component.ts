import { Component, Input, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimationService } from '../../../../services/animation.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <section id="home" class="hero-section">
      <div class="hero-overlay"></div>
      <div class="container">
        <div class="hero-content" #heroContent>
          <h1 class="fade-in">
            <span class="greeting">{{ 'PORTFOLIO.GREET' | translate }}</span>
            <span class="name">{{ 'PORTFOLIO.NAME' | translate }}</span>
          </h1>
          <h2 class="profession fade-in">{{ 'PORTFOLIO.ROLE' | translate }}</h2>
          <p class="intro fade-in">{{ 'PORTFOLIO.TAGLINE' | translate }}</p>
          <div class="hero-cta fade-in">
            <a href="#projects" class="btn btn-primary">{{ 'PORTFOLIO.MY_WORK' | translate }}</a>
            <a href="#contact" class="btn btn-outline">{{ 'PORTFOLIO.CONATCT_ME' | translate }}</a>
          </div>
          <div class="hero-social fade-in">
            <a href="{{ portfolioOwner.social.github }}" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <i class="fab fa-github"></i>
            </a>
            <a href="{{ portfolioOwner.social.linkedin }}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <i class="fab fa-linkedin"></i>
            </a>
            <!-- <a href="{{ portfolioOwner.social.twitter }}" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <i class="fab fa-twitter"></i>
            </a> -->
            <!-- <a href="{{ portfolioOwner.social.dribbble }}" target="_blank" rel="noopener noreferrer" aria-label="Dribbble">
              <i class="fab fa-dribbble"></i>
            </a> -->
          </div>
        </div>
      </div>
      <div class="scroll-indicator">
        <div class="mouse">
          <div class="wheel"></div>
        </div>
        <div>
          <span class="scroll-arrows">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero-section {
      height: 100vh;
      min-height: 600px;
      background-image: url('https://images.pexels.com/photos/1334093/pexels-photo-1334093.jpeg');
      background-size: cover;
      background-position: center;
      position: relative;
      display: flex;
      align-items: center;
      color: white;
    }
    
    .hero-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, var(--primary-500) 0%, rgba(0, 0, 0, 0.8) 100%);
      z-index: 1;
    }
    
    .container {
      position: relative;
      z-index: 2;
    }
    
    .hero-content {
      max-width: 800px;
      margin: 0 auto;
      text-align: center;
    }
    
    .hero-content h1 {
      margin-bottom: var(--spacing-1);
      display: flex;
      flex-direction: column;
    }
    
    .greeting {
      font-size: 1.5rem;
      font-weight: 300;
      margin-bottom: var(--spacing-1);
    }
    
    .name {
      font-size: 3.5rem;
      font-weight: 600;
      background: linear-gradient(to right, #ffffff, #c0c0c0);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      text-fill-color: transparent;
    }
    
    .profession {
      font-size: 1.8rem;
      font-weight: 400;
      color: rgba(255, 255, 255, 0.9);
      margin-bottom: var(--spacing-2);
    }
    
    .intro {
      font-size: 1.2rem;
      margin-bottom: var(--spacing-4);
      color: rgba(255, 255, 255, 0.8);
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }
    
    .hero-cta {
      margin-bottom: var(--spacing-4);
    }
    
    .hero-cta .btn {
      margin: 0 var(--spacing-1);
    }
    
    .hero-social a {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.1);
      color: white;
      margin: 0 var(--spacing-1);
      transition: all 0.3s ease;
    }
    
    .hero-social a:hover {
      background-color: var(--primary-500);
      transform: translateY(-3px);
    }
    
    .hero-social i {
      font-size: 1.2rem;
    }
    
    /* Scroll Indicator */
    .scroll-indicator {
      position: absolute;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 2;
      text-align: center;
      color: white;
    }
    
    .mouse {
      width: 26px;
      height: 40px;
      border: 2px solid white;
      border-radius: 20px;
      position: relative;
      margin: 0 auto 10px;
    }
    
    .wheel {
      width: 6px;
      height: 6px;
      background-color: white;
      border-radius: 50%;
      position: absolute;
      top: 8px;
      left: 50%;
      transform: translateX(-50%);
      animation: scroll 2s infinite;
    }
    
    @keyframes scroll {
      0% {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }
      50% {
        opacity: 0.5;
        transform: translateX(-50%) translateY(10px);
      }
      100% {
        opacity: 0;
        transform: translateX(-50%) translateY(20px);
      }
    }
    
    .scroll-arrows {
      display: block;
      margin-top: 10px;
    }
    
    .scroll-arrows span {
      display: block;
      width: 10px;
      height: 10px;
      border-bottom: 2px solid white;
      border-right: 2px solid white;
      transform: rotate(45deg);
      margin: -5px auto;
      animation: scrollArrows 2s infinite;
    }
    
    .scroll-arrows span:nth-child(2) {
      animation-delay: 0.2s;
    }
    
    .scroll-arrows span:nth-child(3) {
      animation-delay: 0.4s;
    }
    
    @keyframes scrollArrows {
      0% {
        opacity: 0;
      }
      50% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }
    
    @media (max-width: 768px) {
      .name {
        font-size: 2.5rem;
      }
      
      .profession {
        font-size: 1.5rem;
      }
      
      .intro {
        font-size: 1rem;
      }
    }
  `]
})
export class HeroComponent implements AfterViewInit {
  @Input() portfolioOwner: any;
  @ViewChild('heroContent') heroContent!: ElementRef;
  
  constructor(private animationService: AnimationService) {}
  
  ngAfterViewInit() {
    // Automatically add visible class for initial animations
    const fadeElements = this.heroContent.nativeElement.querySelectorAll('.fade-in');
    setTimeout(() => {
      fadeElements.forEach((el: Element) => {
        el.classList.add('visible');
      });
    }, 300);
  }
}