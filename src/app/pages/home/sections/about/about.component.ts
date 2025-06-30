import {
  Component,
  Input,
  AfterViewInit,
  ElementRef,
  ViewChild,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { AnimationService } from "../../../../services/animation.service";

@Component({
  selector: "app-about",
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="about" class="section about-section">
      <div class="container">
        <div class="section-header text-center">
          <h2 class="fade-in">About Me</h2>
          <div class="divider fade-in"></div>
        </div>
        <div class="about-content">
          <div class="about-photo fade-in slide-in-left" #photoCol>
            <img
              src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Alex Morgan Portrait"
            />
          </div>
          <div class="about-text fade-in slide-in-right" #textCol>
            <h3>Who I Am</h3>
            <p>{{ portfolioOwner.about }}</p>
            <div class="about-info">
              <div class="info-item">
                <span class="info-label"
                  ><i class="fas fa-map-marker-alt"></i> Location:</span
                >
                <span class="info-value">{{ portfolioOwner.location }}</span>
              </div>
              <div class="info-item">
                <span class="info-label"
                  ><i class="fas fa-envelope"></i> Email:</span
                >
                <span class="info-value">{{ portfolioOwner.email }}</span>
              </div>
              <div class="info-item">
                <span class="info-label"
                  ><i class="fas fa-phone"></i> Phone:</span
                >
                <span class="info-value">{{ portfolioOwner.phone }}</span>
              </div>
            </div>
            <div class="about-cta">
              <a href="#" class="btn btn-primary" (click)="downloadResume()"
                >Download Resume</a
              >
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .about-section {
        background-color: var(--bg-secondary);
        position: relative;
        overflow: hidden;
      }

      .divider {
        height: 4px;
        width: 70px;
        background-color: var(--primary-500);
        margin: 0 auto var(--spacing-5);
      }

      .about-content {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--spacing-4);
        align-items: center;
        max-width: 1000px;
        margin: 0 auto;
      }

      .about-photo {
        position: relative;
        padding: var(--spacing-3);
        background-color: var(--bg-primary);
        border-radius: 10px;
        box-shadow: var(--shadow-lg);
      }

      .about-photo img {
        width: 100%;
        border-radius: 8px;
        transition: transform 0.3s ease;
      }

      .about-photo:hover img {
        transform: scale(1.02);
      }

      .about-text {
        padding: var(--spacing-3);
      }

      .about-text h3 {
        margin-bottom: var(--spacing-3);
        position: relative;
        display: inline-block;
        color: var(--text-primary);
      }

      .about-text h3::after {
        content: "";
        position: absolute;
        bottom: -10px;
        left: 0;
        width: 40px;
        height: 3px;
        background-color: var(--primary-500);
      }

      .about-text p {
        margin-bottom: var(--spacing-3);
        color: var(--text-secondary);
        line-height: 1.8;
        white-space: pre-line;
      }

      .about-info {
        background-color: var(--bg-primary);
        padding: var(--spacing-3);
        border-radius: 10px;
        margin-bottom: var(--spacing-4);
        box-shadow: var(--shadow-sm);
      }

      .info-item {
        margin-bottom: var(--spacing-2);
        display: flex;
        align-items: center;
      }

      .info-label {
        font-weight: 600;
        color: var(--text-primary);
        width: 120px;
        display: flex;
        align-items: center;
      }

      .info-label i {
        color: var(--primary-500);
        margin-right: 8px;
        width: 20px;
      }

      .info-value {
        color: var(--text-secondary);
      }

      .about-cta {
        margin-top: var(--spacing-4);
      }

      @media (min-width: 768px) {
        .about-content {
          grid-template-columns: 1fr 1fr;
          gap: var(--spacing-6);
        }
      }
    `,
  ],
})
export class AboutComponent implements AfterViewInit {
  @Input() portfolioOwner: any;
  @ViewChild("photoCol") photoCol!: ElementRef;
  @ViewChild("textCol") textCol!: ElementRef;

  constructor(private animationService: AnimationService) {}

  ngAfterViewInit() {
    this.setupAnimations();
  }

  setupAnimations() {
    const fadeElements = document.querySelectorAll("#about .fade-in");
    this.animationService.setupAnimations(fadeElements, "visible");
  }

  downloadResume() {
    const link = document.createElement("a");
    link.href = "assets/Omkar_Pawar_MEAN_Developer_Resume.pdf";
    link.download = "Omkar_Pawar_MEAN_Developer_Resume.pdf";
    link.click();
  }
}
