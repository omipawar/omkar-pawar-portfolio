import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themes = ['light', 'dark', 'blue', 'purple', 'green'];
  private currentThemeSubject = new BehaviorSubject<string>(this.loadThemeFromStorage());
  currentTheme$ = this.currentThemeSubject.asObservable();
  
  constructor() {
    this.applyTheme(this.currentThemeSubject.value);
  }
  
  setTheme(theme: string) {
    if (this.themes.includes(theme)) {
      this.currentThemeSubject.next(theme);
      localStorage.setItem('theme', theme);
      this.applyTheme(theme);
    }
  }
  
  private applyTheme(theme: string) {
    // Remove all theme classes
    document.body.classList.remove(...this.themes.map(t => `${t}-theme`));
    // Add new theme class
    if (theme !== 'light') {
      document.body.classList.add(`${theme}-theme`);
    }
  }
  
  private loadThemeFromStorage(): string {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && this.themes.includes(savedTheme)) {
      return savedTheme;
    }
    
    // If no saved preference, check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    return 'light';
  }
  
  getAvailableThemes(): string[] {
    return this.themes;
  }
}