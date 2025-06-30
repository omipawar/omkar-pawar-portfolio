import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer>
      <div class="container">
        <div class="footer-content">
          <div class="footer-logo">
            <h3>Omkar Pawar</h3>
            <p>Software Engineer & UI/UX Designer</p>
          </div>
          <div class="footer-links">
            <div class="footer-nav">
              <h4>Navigation</h4>
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#skills">Skills</a></li>
                <li><a href="#projects">Projects</a></li>
                <!-- <li><a href="#testimonials">Testimonials</a></li> -->
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            <div class="footer-social">
              <h4>Connect</h4>
              <div class="social-icons">
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
        </div>
        <div class="footer-bottom">
          <p>&copy; {{ currentYear }} Omkar Pawar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    footer {
      background-color: var(--bg-secondary);
      padding: var(--spacing-6) 0 var(--spacing-3);
      margin-top: var(--spacing-6);
      border-top: 1px solid var(--neutral-200);
    }
    
    .footer-content {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-bottom: var(--spacing-4);
    }
    
    .footer-logo {
      flex: 0 0 100%;
      margin-bottom: var(--spacing-4);
    }
    
    .footer-logo h3 {
      font-size: 1.5rem;
      margin-bottom: var(--spacing-1);
      color: var(--primary-500);
    }
    
    .footer-logo p {
      color: var(--text-secondary);
      margin-bottom: 0;
    }
    
    .footer-links {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      width: 100%;
    }
    
    .footer-nav,
    .footer-social {
      flex: 0 0 100%;
      margin-bottom: var(--spacing-4);
    }
    
    .footer-nav h4,
    .footer-social h4 {
      font-size: 1.1rem;
      margin-bottom: var(--spacing-2);
      color: var(--text-primary);
    }
    
    .footer-nav ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    
    .footer-nav li {
      margin-bottom: var(--spacing-1);
    }
    
    .footer-nav a {
      color: var(--text-secondary);
      text-decoration: none;
      transition: color 0.3s ease;
    }
    
    .footer-nav a:hover {
      color: var(--primary-500);
    }
    
    .social-icons {
      display: flex;
    }
    
    .social-icons a {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      background-color: var(--bg-tertiary);
      color: var(--text-primary);
      border-radius: 50%;
      margin-right: var(--spacing-2);
      transition: all 0.3s ease;
    }
    
    .social-icons a:hover {
      background-color: var(--primary-500);
      color: white;
      transform: translateY(-3px);
    }
    
    .footer-bottom {
      padding-top: var(--spacing-3);
      border-top: 1px solid var(--neutral-200);
      text-align: center;
    }
    
    .footer-bottom p {
      color: var(--text-tertiary);
      margin: 0;
      font-size: 0.9rem;
    }
    
    @media (min-width: 768px) {
      .footer-logo {
        flex: 0 0 30%;
        margin-bottom: 0;
      }
      
      .footer-links {
        flex: 0 0 65%;
        width: auto;
      }
      
      .footer-nav,
      .footer-social {
        flex: 0 0 48%;
        margin-bottom: 0;
      }
    }
  `]
})
export class FooterComponent {
  portfolioOwner: any;
  currentYear: number = new Date().getFullYear();
  
  constructor(private dataService: DataService) {
    this.portfolioOwner = this.dataService.getPortfolioOwner();
  }
}