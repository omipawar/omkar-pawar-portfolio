import { Component, HostBinding, OnInit, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { ThemeService } from "./services/theme.service";
import * as AOS from "aos";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    <main>
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
    <!-- <div class="theme-selector">
      <button
        *ngFor="let theme of availableThemes"
        class="theme-button"
        [class.active]="currentTheme === theme"
        (click)="setTheme(theme)"
      >
        <i class="fas" [ngClass]="getThemeIcon(theme)"></i>
        <span class="theme-name">{{ theme | titlecase }}</span>
      </button>
    </div> -->
    <div class="theme-selector" [class.gap10]="isThemeOptionsOpen">
      <button class="toggle-button" (click)="toggleThemeOptions()">☼</button>
      <div
        class="theme-options"
        id="themeOptions"
        [class.open]="isThemeOptionsOpen"
      >
        <button
          *ngFor="let theme of availableThemes"
          class="theme-button"
          [class.active]="currentTheme === theme"
          (click)="setTheme(theme)"
        >
          <i class="fas" [ngClass]="getThemeIcon(theme)"></i>
          <span class="theme-name"></span>
          <!--{{ theme | titlecase }} -->
        </button>
        <!-- <button class="theme-button">
          <span class="theme-icon" style="background-color: #ffffff;"></span>
          <span class="theme-name">Light</span>
        </button>
        <button class="theme-button active">
          <span class="theme-icon" style="background-color: #333333;"></span>
          <span class="theme-name">Dark</span>
        </button>
        <button class="theme-button">
          <span class="theme-icon" style="background-color: #002b36;"></span>
          <span class="theme-name">Solarized</span>
        </button> -->
      </div>
    </div>
  `,
  styles: [
    `
      main {
        min-height: calc(100vh - 160px);
      }

      .theme-selector {
        position: fixed;
        bottom: 20px;
        right: 20px;
        display: flex;
        flex-direction: column;
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

      // theme dropdown
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        height: 100vh;
        background: #fff;
      }

      .theme-selector {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: var(--bg-secondary);
        padding: 10px;
        border-radius: 10px;
        box-shadow: var(--shadow-lg);
        z-index: 1000;
        width: 60px;
      }

      .toggle-button {
        width: 40px;
        height: 40px;
        background-color: var(--primary-500);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.3s ease;
        font-size: 18px;
      }

      .toggle-button:hover {
        background-color: var(--primary-500);
      }

      .theme-options {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .theme-options.open {
        max-height: 500px;
      }

      .theme-button {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px 14px;
        border: none;
        border-radius: 5px;
        background-color: var(--bg-tertiary);
        color: var(--text-primary);
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .theme-button:hover,
      .theme-button.active {
        background-color: var(--primary-500);
        color: white;
      }

      .theme-name {
        font-size: 0.9rem;
        font-weight: 500;
      }

      .theme-icon {
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background-color: white;
        border: 2px solid currentColor;
        display: inline-block;
      }
      .theme-options .open {
        width: 100px !important;
      }

      .gap10 {
        gap: 10px !important;
      }
    `,
  ],
})
export class AppComponent implements OnInit {
  currentTheme: string = "light";
  availableThemes: string[] = [];
  isThemeOptionsOpen: boolean = false;

  private translateService = inject(TranslateService);

  constructor(private themeService: ThemeService) {
    this.availableThemes = this.themeService.getAvailableThemes();
  }

  ngOnInit() {
    // Initialize translations
    this.translateService.addLangs(["en", "hi", "mr"]);
    this.translateService.setDefaultLang("en");

    this.themeService.currentTheme$.subscribe((theme) => {
      this.currentTheme = theme;
    });

    // Initialize AOS animations
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      offset: 100,
    });
  }

  setTheme(theme: string) {
    this.themeService.setTheme(theme);
  }

  getThemeIcon(theme: string): string {
    const icons: { [key: string]: string } = {
      light: "fa-sun",
      dark: "fa-moon",
      blue: "fa-water",
      purple: "fa-gem",
      green: "fa-leaf",
    };
    return icons[theme] || "fa-circle";
  }

  toggleThemeOptions(): void {
    this.isThemeOptionsOpen = !this.isThemeOptionsOpen;
  }
}
