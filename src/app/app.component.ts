import { Component, HostBinding, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ThemeService } from './services/theme.service';
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent
  ],
  template: `
    <app-header></app-header>
    <main>
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
    <div class="theme-selector">
      <button 
        *ngFor="let theme of availableThemes" 
        class="theme-button" 
        [class.active]="currentTheme === theme"
        (click)="setTheme(theme)">
        <i class="fas" [ngClass]="getThemeIcon(theme)"></i>
        <span class="theme-name">{{ theme | titlecase }}</span>
      </button>
    </div>
  `,
  styles: [`
    main {
      min-height: calc(100vh - 160px);
    }
    
    .theme-selector {
      position: fixed;
      bottom: 20px;
      right: 20px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      background-color: var(--bg-secondary);
      padding: 10px;
      border-radius: 10px;
      box-shadow: var(--shadow-lg);
      z-index: 1000;
    }
    
    .theme-button {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 16px;
      border: none;
      border-radius: 5px;
      background-color: var(--bg-tertiary);
      color: var(--text-primary);
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .theme-button:hover {
      background-color: var(--primary-500);
      color: white;
    }
    
    .theme-button.active {
      background-color: var(--primary-500);
      color: white;
    }
    
    .theme-name {
      font-size: 0.9rem;
      font-weight: 500;
    }
  `]
})
export class AppComponent implements OnInit {
  currentTheme: string = 'light';
  availableThemes: string[] = [];
  
  constructor(private themeService: ThemeService) {
    this.availableThemes = this.themeService.getAvailableThemes();
  }
  
  ngOnInit() {
    this.themeService.currentTheme$.subscribe(theme => {
      this.currentTheme = theme;
    });

    // Initialize AOS animations
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      offset: 100
    });
  }
  
  setTheme(theme: string) {
    this.themeService.setTheme(theme);
  }
  
  getThemeIcon(theme: string): string {
    const icons: { [key: string]: string } = {
      light: 'fa-sun',
      dark: 'fa-moon',
      blue: 'fa-water',
      purple: 'fa-gem',
      green: 'fa-leaf'
    };
    return icons[theme] || 'fa-circle';
  }

}