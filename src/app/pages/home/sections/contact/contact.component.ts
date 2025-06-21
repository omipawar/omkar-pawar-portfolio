import { Component, Input, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AnimationService } from '../../../../services/animation.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section id="contact" class="section contact-section">
      <div class="container">
        <div class="section-header text-center">
          <h2 class="fade-in">Get In Touch</h2>
          <div class="divider fade-in"></div>
          <p class="section-description fade-in">
            Have a project in mind or want to discuss a potential collaboration? Feel free to reach out!
          </p>
        </div>
        
        <div class="row contact-content">
          <div class="col col-md-5 fade-in slide-in-left">
            <div class="contact-info">
              <h3>Contact Information</h3>
              <p>Feel free to contact me for any project or collaboration.</p>
              
              <div class="info-item">
                <div class="info-icon">
                  <i class="fas fa-map-marker-alt"></i>
                </div>
                <div class="info-text">
                  <h4>Location</h4>
                  <p>{{ portfolioOwner.location }}</p>
                </div>
              </div>
              
              <div class="info-item">
                <div class="info-icon">
                  <i class="fas fa-envelope"></i>
                </div>
                <div class="info-text">
                  <h4>Email</h4>
                  <p>{{ portfolioOwner.email }}</p>
                </div>
              </div>
              
              <div class="info-item">
                <div class="info-icon">
                  <i class="fas fa-phone"></i>
                </div>
                <div class="info-text">
                  <h4>Phone</h4>
                  <p>{{ portfolioOwner.phone }}</p>
                </div>
              </div>
              
              <div class="contact-social">
                <a href="{{ portfolioOwner.social.github }}" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <i class="fab fa-github"></i>
                </a>
                <a href="{{ portfolioOwner.social.linkedin }}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <i class="fab fa-linkedin"></i>
                </a>
                <a href="{{ portfolioOwner.social.twitter }}" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <i class="fab fa-twitter"></i>
                </a>
                <!-- <a href="{{ portfolioOwner.social.dribbble }}" target="_blank" rel="noopener noreferrer" aria-label="Dribbble">
                  <i class="fab fa-dribbble"></i>
                </a> -->
              </div>
            </div>
          </div>
          
          <!-- <div class="col col-md-7 fade-in slide-in-right">
            <div class="contact-form">
              <h3>Send a Message</h3>
              <form [formGroup]="contactForm" (ngSubmit)="onSubmit()">
                <div class="form-row">
                  <div class="form-group">
                    <label for="name">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      class="form-control" 
                      formControlName="name" 
                      [class.is-invalid]="formSubmitted && f['name'].errors">
                    <div *ngIf="formSubmitted && f['name'].errors" class="invalid-feedback">
                      <div *ngIf="f['name'].errors['required']">Name is required</div>
                    </div>
                  </div>
                  
                  <div class="form-group">
                    <label for="email">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      class="form-control" 
                      formControlName="email"
                      [class.is-invalid]="formSubmitted && f['email'].errors">
                    <div *ngIf="formSubmitted && f['email'].errors" class="invalid-feedback">
                      <div *ngIf="f['email'].errors['required']">Email is required</div>
                      <div *ngIf="f['email'].errors['email']">Please enter a valid email</div>
                    </div>
                  </div>
                </div>
                
                <div class="form-group">
                  <label for="subject">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    class="form-control" 
                    formControlName="subject"
                    [class.is-invalid]="formSubmitted && f['subject'].errors">
                  <div *ngIf="formSubmitted && f['subject'].errors" class="invalid-feedback">
                    <div *ngIf="f['subject'].errors['required']">Subject is required</div>
                  </div>
                </div>
                
                <div class="form-group">
                  <label for="message">Message</label>
                  <textarea 
                    id="message" 
                    rows="5" 
                    class="form-control" 
                    formControlName="message"
                    [class.is-invalid]="formSubmitted && f['message'].errors"></textarea>
                  <div *ngIf="formSubmitted && f['message'].errors" class="invalid-feedback">
                    <div *ngIf="f['message'].errors['required']">Message is required</div>
                  </div>
                </div>
                
                <button type="submit" class="btn btn-primary">
                  <i class="fas fa-paper-plane"></i> Send Message
                </button>
                
                <div *ngIf="submitSuccess" class="form-success">
                  Your message has been sent successfully!
                </div>
              </form>
            </div>
          </div> -->
        </div>
      </div>
    </section>
  `,
  styles: [`
    .contact-section {
      background-color: var(--bg-secondary);
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
    
    .contact-content {
      align-items: stretch;
    }
    
    .contact-info {
      height: 100%;
      background-color: var(--primary-500);
      color: white;
      padding: var(--spacing-4);
      border-radius: 8px;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
    }
    
    .contact-info h3 {
      color: white;
      margin-bottom: var(--spacing-3);
      position: relative;
    }
    
    .contact-info h3::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 0;
      width: 40px;
      height: 3px;
      background-color: white;
    }
    
    .contact-info > p {
      margin-bottom: var(--spacing-4);
      color: rgba(255, 255, 255, 0.8);
    }
    
    .info-item {
      display: flex;
      margin-bottom: var(--spacing-3);
    }
    
    .info-icon {
      width: 50px;
      height: 50px;
      background-color: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: var(--spacing-2);
      flex-shrink: 0;
    }
    
    .info-icon i {
      font-size: 1.2rem;
      color: white;
    }
    
    .info-text h4 {
      margin: 0 0 5px;
      color: white;
      font-size: 1.1rem;
    }
    
    .info-text p {
      margin: 0;
      color: rgba(255, 255, 255, 0.8);
    }
    
    .contact-social {
      margin-top: var(--spacing-4);
      display: flex;
    }
    
    .contact-social a {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      background-color: rgba(255, 255, 255, 0.2);
      color: white;
      border-radius: 50%;
      margin-right: var(--spacing-2);
      transition: all 0.3s ease;
    }
    
    .contact-social a:hover {
      background-color: white;
      color: var(--primary-500);
      transform: translateY(-3px);
    }
    
    .contact-form {
      background-color: var(--bg-primary);
      padding: var(--spacing-4);
      border-radius: 8px;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
      height: 100%;
    }
    
    .contact-form h3 {
      margin-bottom: var(--spacing-3);
      position: relative;
    }
    
    .contact-form h3::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 0;
      width: 40px;
      height: 3px;
      background-color: var(--primary-500);
    }
    
    .form-row {
      display: flex;
      margin-left: -15px;
      margin-right: -15px;
    }
    
    .form-row > .form-group {
      flex: 0 0 50%;
      padding: 0 15px;
    }
    
    .form-group {
      margin-bottom: var(--spacing-3);
    }
    
    label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
      color: var(--text-primary);
    }
    
    .form-control {
      display: block;
      width: 100%;
      padding: 12px 15px;
      font-size: 1rem;
      line-height: 1.5;
      color: var(--text-primary);
      background-color: var(--bg-tertiary);
      border: 1px solid var(--neutral-300);
      border-radius: 5px;
      transition: border-color 0.3s ease, box-shadow 0.3s ease;
    }
    
    .form-control:focus {
      outline: none;
      border-color: var(--primary-500);
      box-shadow: 0 0 0 3px rgba(10, 132, 255, 0.1);
    }
    
    .form-control.is-invalid {
      border-color: var(--error);
    }
    
    .invalid-feedback {
      color: var(--error);
      font-size: 0.875rem;
      margin-top: 5px;
    }
    
    .form-success {
      margin-top: var(--spacing-3);
      padding: 10px 15px;
      background-color: rgba(46, 125, 50, 0.1);
      color: var(--success);
      border-radius: 5px;
      font-weight: 500;
    }
    
    button[type="submit"] {
      padding: 12px 24px;
    }
    
    button[type="submit"] i {
      margin-right: 8px;
    }
    
    @media (max-width: 768px) {
      .form-row {
        flex-direction: column;
      }
      
      .form-row > .form-group {
        flex: 0 0 100%;
      }
      
      .contact-info {
        margin-bottom: var(--spacing-4);
      }
    }
  `]
})
export class ContactComponent implements AfterViewInit {
  @Input() portfolioOwner: any;
  contactForm: FormGroup;
  formSubmitted = false;
  submitSuccess = false;
  
  constructor(
    private fb: FormBuilder,
    private animationService: AnimationService
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }
  
  ngAfterViewInit() {
    this.setupAnimations();
  }
  
  get f() {
    return this.contactForm.controls;
  }
  
  onSubmit() {
    this.formSubmitted = true;
    
    if (this.contactForm.invalid) {
      return;
    }
    
    // Simulate form submission
    setTimeout(() => {
      this.submitSuccess = true;
      this.contactForm.reset();
      this.formSubmitted = false;
      
      setTimeout(() => {
        this.submitSuccess = false;
      }, 5000);
    }, 1000);
  }
  
  setupAnimations() {
    const fadeElements = document.querySelectorAll('#contact .fade-in');
    this.animationService.setupAnimations(fadeElements, 'visible');
  }
}