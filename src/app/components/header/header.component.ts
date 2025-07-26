import { Component, HostListener, inject, OnInit, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { TranslateService, TranslateModule } from "@ngx-translate/core";
import { ThemeService } from "../../services/theme.service";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  template: `
    <header [class.scrolled]="scrolled">
      <div class="container">
        <div class="header-content">
          <div class="logo">
            <a class="{{ !scrolled ? 'logo-color' : '' }}" href="#"
              >Omkar Pawar</a
            >
          </div>
          <nav class="desktop-nav">
            <ul>
              <li>
                <a href="#home" class="nav-link">{{ "NAV.HOME" | translate }}</a>
              </li>
              <li><a href="#about" class="nav-link">{{ "NAV.ABOUT" | translate }}</a></li>
              <li><a href="#skills" class="nav-link">{{ "NAV.SKILLS" | translate }}</a></li>
              <li><a href="#projects" class="nav-link">{{ "NAV.PROJECTS" | translate }}</a></li>
              <!-- <li><a href="#testimonials" class="nav-link">Testimonials</a></li> -->
              <li><a href="#contact" class="nav-link">{{ "NAV.CONTACT" | translate }}</a></li>
              <li>
                <div class="nav-actions">
                  <div class="language-selector">
                    <select
                      (change)="changeLanguage($event)"
                      [value]="currentLang()"
                    >
                      <option value="en">EN</option>
                      <option value="hi">HI</option>
                      <option value="mr">MR</option>
                    </select>
                  </div>
                </div>
              </li>
            </ul>
          </nav>
          <div class="mobile-nav-toggle" (click)="toggleMobileNav()">
            <i
              class="fas"
              [ngClass]="mobileNavOpen ? 'fa-times' : 'fa-bars'"
            ></i>
          </div>
        </div>
      </div>
      <div class="mobile-nav" [class.open]="mobileNavOpen">
        <ul>
          <li>
            <a href="#home" class="nav-link" (click)="closeMobileNav()">{{ "NAV.HOME" | translate }}</a>
          </li>
          <li>
            <a href="#about" class="nav-link" (click)="closeMobileNav()"
              >{{ "NAV.ABOUT" | translate }}</a
            >
          </li>
          <li>
            <a href="#skills" class="nav-link" (click)="closeMobileNav()"
              >{{ "NAV.SKILLS" | translate }}</a
            >
          </li>
          <li>
            <a href="#projects" class="nav-link" (click)="closeMobileNav()"
              >{{ "NAV.PROJECTS" | translate }}</a
            >
          </li>
          <!-- <li>
            <a href="#testimonials" class="nav-link" (click)="closeMobileNav()"
              >Testimonials</a
            >
          </li> -->
          <li>
            <a href="#contact" class="nav-link" (click)="closeMobileNav()"
              >{{ "NAV.CONTACT" | translate }}</a
            >
          </li>
          <li>
            <div class="nav-actions">
              <div class="language-selector">
                <select
                  (change)="changeLanguage($event)"
                  [value]="currentLang()"
                >
                  <option value="en">EN</option>
                  <option value="hi">HI</option>
                  <option value="mr">MR</option>
                </select>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </header>
  `,
  styles: [
    `
      header {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 1000;
        padding: 20px 0;
        transition: all 0.3s ease;
        background-color: transparent;
      }

      header.scrolled {
        background-color: var(--bg-secondary);
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        padding: 15px 0;
      }

      .header-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .logo a {
        font-size: 1.8rem;
        font-weight: 600;
        color: var(--primary-500);
        text-decoration: none;
        transition: color 0.3s ease;
      }

      .logo-color {
        color: var(--text-primary) !important;
      }

      .logo-color:hover {
        color: var(--primary-500) !important;
      }

      .desktop-nav ul {
        display: flex;
        list-style: none;
        margin: 0;
        padding: 0;
      }

      .desktop-nav li {
        margin: 0 15px;
      }

      .desktop-nav .nav-link {
        color: var(--text-primary);
        text-decoration: none;
        font-weight: 500;
        font-size: 1rem;
        transition: color 0.3s ease;
        padding: 8px 0;
        position: relative;
      }

      .desktop-nav .nav-link:hover {
        color: var(--primary-500);
      }

      .desktop-nav .nav-link::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 2px;
        background-color: var(--primary-500);
        transition: width 0.3s ease;
      }

      .desktop-nav .nav-link:hover::after {
        width: 100%;
      }

      .mobile-nav-toggle {
        display: none;
        cursor: pointer;
        font-size: 1.5rem;
        color: var(--text-primary);
      }

      .mobile-nav {
        position: fixed;
        top: 70px;
        right: -100%;
        width: 80%;
        max-width: 300px;
        height: calc(100vh - 70px);
        background-color: var(--bg-secondary);
        box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
        transition: right 0.3s ease;
        z-index: 999;
        display: none;
      }

      .mobile-nav.open {
        right: 0;
      }

      .mobile-nav ul {
        list-style: none;
        padding: 20px;
        margin: 0;
      }

      .mobile-nav li {
        margin: 15px 0;
      }

      .mobile-nav .nav-link {
        color: var(--text-primary);
        text-decoration: none;
        font-weight: 500;
        font-size: 1.1rem;
        transition: color 0.3s ease;
        display: block;
        padding: 10px 0;
      }

      .mobile-nav .nav-link:hover {
        color: var(--primary-500);
      }

      .language-selector {
        margin-right: var(--space-3);
      }

      .language-selector select {
        background-color: transparent;
        border: 1px solid var(--gray-300);
        border-radius: 4px;
        padding: 0.25rem 0.5rem;
        color: var(--text-color);
        cursor: pointer;
      }

      .language-selector option {
        background-color: var(--bg-secondary);
      }

      select {
        border: none; /* removes default border */
        outline: none; /* removes white outline on focus */
        background-color: #333; /* example background */
        color: white; /* text color */
        padding: 8px;
        border-radius: 6px;
      }

      select:focus {
        outline: none;
        border: 2px solid #00bcd4; /* add your custom focus border */
      }

      @media (max-width: 768px) {
        .desktop-nav {
          display: none;
        }

        .mobile-nav-toggle {
          display: block;
        }

        .mobile-nav {
          display: block;
        }
      }
    `,
  ],
})
export class HeaderComponent implements OnInit {
  scrolled = false;
  mobileNavOpen = false;
  currentLang = signal<string>("en");

  private translateService = inject(TranslateService);

  @HostListener("window:scroll", [])
  onWindowScroll() {
    this.scrolled = window.scrollY > 50;
  }

  ngOnInit(): void {
    // Initialize language
    const savedLang = localStorage.getItem("language") || "en";
    this.currentLang.set(savedLang);
    this.translateService.use(savedLang);
  }

  toggleMobileNav() {
    this.mobileNavOpen = !this.mobileNavOpen;

    if (this.mobileNavOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }

  closeMobileNav() {
    this.mobileNavOpen = false;
    document.body.style.overflow = "";
  }

  changeLanguage(event: Event) {
    const select = event.target as HTMLSelectElement;
    const lang = select.value;
    this.translateService.use(lang);
    this.currentLang.set(lang);
    localStorage.setItem("language", lang);
  }
}
