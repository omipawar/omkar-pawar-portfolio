import { CommonModule } from "@angular/common";
import {
  AfterViewInit,
  Component,
  Inject,
  inject,
  OnDestroy,
  OnInit,
} from "@angular/core";
import {
  LangChangeEvent,
  TranslateModule,
  TranslateService,
} from "@ngx-translate/core";
import { DataService } from "../../../../services/data.service";
import { AnimationService } from "../../../../services/animation.service";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: "app-experience",
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <section id="experience" class="section about-section">
      <div class="container">
        <div class="section-header text-center">
          <h2 class="fade-in">{{"EXPERIENCE_TEXT" | translate}}</h2>
          <div class="divider fade-in"></div>
        </div>
        <div class="experience-section" data-aos="fade-up">
          <div class="experience-timeline">
            <div
              *ngFor="let exp of experience; let isOdd = odd"
              class="timeline-item"
              data-aos="fade-up"
            >
              <div
                class="timeline-content {{
                  isOdd ? 'fade-in slide-in-right' : 'fade-in slide-in-left'
                }}"
              >
                <h3>{{ exp.ROLE }}</h3>
                <h4>{{ exp.COMPANY }}</h4>
                <p class="timeline-date">{{ exp.PERIOD }}</p>
                <ul class="timeline-details">
                  <li *ngFor="let detail of exp.DETAILS">{{ detail }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: `

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
   .about-section {
      padding-bottom: var(--spacing-8);
    }
  .experience-section {
      margin: var(--spacing-8) 0;
    }

    .experience-timeline {
      position: relative;
      padding: var(--spacing-4) 0;
    }

    .experience-timeline::before {
      content: '';
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      width: 2px;
      height: 100%;
      background-color: var(--primary-500);
    }

    .timeline-item {
      margin-bottom: var(--spacing-6);
      position: relative;
      width: 50%;
      padding-right: var(--spacing-6);
    }

    .timeline-item:nth-child(even) {
      margin-left: 50%;
      padding-right: 0;
      padding-left: var(--spacing-6);
    }

    .timeline-content {
      background-color: var(--bg-primary);
      padding: var(--spacing-4);
      border-radius: 8px;
      box-shadow: var(--shadow-lg);
      position: relative;
    }

    .timeline-content::before {
      content: '';
      position: absolute;
      right: -10px;
      top: 20px;
      width: 20px;
      height: 20px;
      background-color: var(--primary-500);
      border-radius: 50%;
    }

    .timeline-item:nth-child(even) .timeline-content::before {
      left: -10px;
      right: auto;
    }

    .timeline-date {
      color: var(--text-primary);
      font-weight: 500;
      margin: var(--spacing-2) 0;
    }

    .timeline-details {
      list-style-type: none;
      padding: 0;
    }

    .timeline-details li {
      margin-bottom: var(--spacing-2);
      position: relative;
      padding-left: var(--spacing-4);
    }

    .timeline-details li::before {
      content: '•';
      color: var(--text-primary);
      position: absolute;
      left: 0;
    }

    .timeline-content:hover{
      transform: scale(1.02);
    }

    @media (max-width: 768px) {
      .experience-timeline::before {
        left: 0;
      }

      .timeline-item {
        width: 100%;
        padding-left: var(--spacing-6);
        padding-right: 0;
      }

      .timeline-item:nth-child(even) {
        margin-left: 0;
      }

      .timeline-content::before {
        left: -10px;
        right: auto;
      }
    }
  `,
})
export class ExperienceComponent implements OnInit, AfterViewInit, OnDestroy {
  private dataService = inject(DataService);
  private animationService = inject(AnimationService);
  // experience = this.dataService.getExperience();
  experience: any = [];
  destroy$: Subject<boolean> = new Subject();

  constructor(private translate: TranslateService) {}
  ngOnInit(): void {
    this.translate.onLangChange
      .pipe(takeUntil(this.destroy$))
      .subscribe((event: LangChangeEvent) => {
        this.loadExperience(); // Reload experience from the new language file
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngAfterViewInit() {
    this.setupAnimations();
  }

  setupAnimations() {
    const fadeElements = document.querySelectorAll("#experience .fade-in");
    this.animationService.setupAnimations(fadeElements, "visible");
  }

  loadExperience() {
    this.translate.get("EXPERIENCE").subscribe((data: any[]) => {
      this.experience = data;
      setTimeout(() => {
        this.setupAnimations();
      }, 50);
    });
  }
}
