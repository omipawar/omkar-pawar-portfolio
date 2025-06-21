import { Injectable, NgZone } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  private observerMap = new Map<Element, IntersectionObserver>();
  
  constructor(private ngZone: NgZone) {}
  
  createObserver(element: Element, classToAdd: string, threshold = 0.1) {
    this.ngZone.runOutsideAngular(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add(classToAdd);
              // Optional: stop observing after animation is triggered
              // observer.unobserve(entry.target);
            } else {
              // Optional: remove the class when element is not visible
              // entry.target.classList.remove(classToAdd);
            }
          });
        },
        { threshold }
      );
      
      observer.observe(element);
      this.observerMap.set(element, observer);
    });
  }
  
  cleanupObserver(element: Element) {
    const observer = this.observerMap.get(element);
    if (observer) {
      observer.unobserve(element);
      observer.disconnect();
      this.observerMap.delete(element);
    }
  }
  
  // Helper method to setup animation for multiple elements
  setupAnimations(elements: NodeListOf<Element> | Element[], classToAdd: string, threshold = 0.1) {
    elements.forEach(el => this.createObserver(el, classToAdd, threshold));
  }
}