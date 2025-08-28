/**
 * Landing Page JavaScript with GSAP Animations
 * Implements scroll-triggered animations, interactive effects, and smooth transitions
 */

class LandingPageAnimations {
    constructor() {
        // Register GSAP plugins
        gsap.registerPlugin(ScrollTrigger, TextPlugin);
        
        // Initialize animations when DOM is loaded
        this.init();
    }
    
    init() {
        // Wait for DOM and all resources to load
        window.addEventListener('load', () => {
            this.initializeAnimations();
            this.setupScrollTriggers();
            this.setupInteractiveElements();
            this.startCounterAnimations();
        });
    }
    
    /**
     * Initialize initial page load animations
     */
    initializeAnimations() {
        // Navbar slide down
        gsap.from('.navbar', {
            duration: 1,
            y: -100,
            opacity: 0,
            ease: "power3.out",
            delay: 0.2
        });
        
        // Hero title animation
        const titleLines = document.querySelectorAll('.title-line');
        gsap.set(titleLines, { opacity: 0, y: 50 });
        
        gsap.to(titleLines, {
            duration: 1,
            opacity: 1,
            y: 0,
            stagger: 0.2,
            ease: "power3.out",
            delay: 0.5
        });
        
        // Hero subtitle animation
        gsap.to('.hero-subtitle', {
            duration: 1,
            opacity: 1,
            y: 0,
            ease: "power3.out",
            delay: 1.2
        });
        
        // Hero actions animation
        gsap.to('.hero-actions', {
            duration: 1,
            opacity: 1,
            y: 0,
            ease: "power3.out",
            delay: 1.5
        });
        
        // Hero stats animation
        gsap.to('.hero-stats', {
            duration: 1,
            opacity: 1,
            y: 0,
            ease: "power3.out",
            delay: 1.8
        });
        
        // Floating cards animation
        const cards = document.querySelectorAll('.card');
        gsap.to(cards, {
            duration: 1,
            opacity: 1,
            scale: 1,
            stagger: 0.15,
            ease: "back.out(1.7)",
            delay: 2
        });
        
        // Hero image container animation
        gsap.to('.hero-image-container', {
            duration: 1.5,
            opacity: 1,
            scale: 1,
            ease: "power3.out",
            delay: 2.2
        });
        
        // Continuous floating animation for cards
        this.setupFloatingCards();
    }
    
    /**
     * Setup floating animation for hero cards
     */
    setupFloatingCards() {
        const cards = document.querySelectorAll('.card');
        
        cards.forEach((card, index) => {
            gsap.to(card, {
                y: "random(-20, 20)",
                x: "random(-10, 10)",
                rotation: "random(-5, 5)",
                duration: "random(3, 5)",
                ease: "power1.inOut",
                repeat: -1,
                yoyo: true,
                delay: index * 0.2
            });
        });
    }
    
    /**
     * Setup scroll-triggered animations
     */
    setupScrollTriggers() {
        // Section headers animation
        const sectionHeaders = document.querySelectorAll('.section-header');
        sectionHeaders.forEach(header => {
            gsap.set(header, { opacity: 0, y: 30 }); // Set initial state for animation
            gsap.to(header, {
                duration: 1,
                opacity: 1,
                y: 0,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: header,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        });
        
        // Feature cards animation
        const featureCards = document.querySelectorAll('.feature-card');
        featureCards.forEach((card, index) => {
            gsap.set(card, { opacity: 0, y: 30 }); // Set initial state for animation
            gsap.to(card, {
                duration: 0.8,
                opacity: 1,
                y: 0,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    end: "bottom 15%",
                    toggleActions: "play none none reverse"
                },
                delay: index * 0.1
            });
        });
        
        // Steps animation
        const steps = document.querySelectorAll('.step');
        steps.forEach((step, index) => {
            const isEven = index % 2 === 1;
            
            gsap.set(step, { opacity: 0, x: isEven ? 30 : -30 }); // Set initial state for animation
            gsap.to(step, {
                duration: 1,
                opacity: 1,
                x: 0,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: step,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
            
            // Animate step number with bounce effect
            gsap.from(step.querySelector('.step-number'), {
                duration: 0.8,
                scale: 0,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: step,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                },
                delay: 0.3
            });
        });
        
        // Example cards animation
        const exampleCards = document.querySelectorAll('.example-card');
        exampleCards.forEach((card, index) => {
            gsap.set(card, { opacity: 0, y: 30, scale: 0.95 }); // Set initial state for animation
            gsap.to(card, {
                duration: 0.8,
                opacity: 1,
                y: 0,
                scale: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    end: "bottom 15%",
                    toggleActions: "play none none reverse"
                },
                delay: index * 0.2
            });
        });
        
        // CTA section animation
        gsap.set('.cta-content', { opacity: 0, y: 30 }); // Set initial state for animation
        gsap.to('.cta-content', {
            duration: 1,
            opacity: 1,
            y: 0,
            ease: "power3.out",
            scrollTrigger: {
                trigger: '.cta',
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });
        
        // Parallax effect for hero background circles
        const bgCircles = document.querySelectorAll('.bg-circle');
        bgCircles.forEach((circle, index) => {
            gsap.to(circle, {
                y: -100,
                ease: "none",
                scrollTrigger: {
                    trigger: ".hero",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
        });
    }
    
    /**
     * Setup interactive elements and event handlers
     */
    setupInteractiveElements() {
        // Button hover animations
        this.setupButtonAnimations();
        
        // Mobile menu toggle
        this.setupMobileMenu();
        
        // Smooth scrolling for navigation links
        this.setupSmoothScrolling();
        
        // Watch demo button
        this.setupDemoButton();
        
        // Feature card hover effects
        this.setupFeatureCardHovers();
        
        // Navbar scroll effect
        this.setupNavbarScrollEffect();
    }
    
    /**
     * Setup button hover animations
     */
    setupButtonAnimations() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                gsap.to(button, {
                    duration: 0.3,
                    scale: 1.05,
                    ease: "power2.out"
                });
                
                // Animate button icon
                const icon = button.querySelector('.btn-icon');
                if (icon) {
                    gsap.to(icon, {
                        duration: 0.3,
                        rotation: 15,
                        ease: "power2.out"
                    });
                }
            });
            
            button.addEventListener('mouseleave', () => {
                gsap.to(button, {
                    duration: 0.3,
                    scale: 1,
                    ease: "power2.out"
                });
                
                const icon = button.querySelector('.btn-icon');
                if (icon) {
                    gsap.to(icon, {
                        duration: 0.3,
                        rotation: 0,
                        ease: "power2.out"
                    });
                }
            });
        });
    }
    
    /**
     * Setup mobile menu functionality
     */
    setupMobileMenu() {
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        let isMenuOpen = false;
        
        if (mobileToggle && navLinks) {
            mobileToggle.addEventListener('click', () => {
                isMenuOpen = !isMenuOpen;
                
                // Animate toggle button
                const spans = mobileToggle.querySelectorAll('span');
                if (isMenuOpen) {
                    gsap.to(spans[0], { rotation: 45, y: 7, duration: 0.3 });
                    gsap.to(spans[1], { opacity: 0, duration: 0.3 });
                    gsap.to(spans[2], { rotation: -45, y: -7, duration: 0.3 });
                } else {
                    gsap.to(spans[0], { rotation: 0, y: 0, duration: 0.3 });
                    gsap.to(spans[1], { opacity: 1, duration: 0.3 });
                    gsap.to(spans[2], { rotation: 0, y: 0, duration: 0.3 });
                }
                
                // Show/hide menu (implement mobile menu display logic here)
                // This would require additional CSS for mobile menu display
            });
        }
    }
    
    /**
     * Setup smooth scrolling for navigation
     */
    setupSmoothScrolling() {
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    gsap.to(window, {
                        duration: 1,
                        scrollTo: {
                            y: targetElement,
                            offsetY: 70 // Account for fixed navbar
                        },
                        ease: "power3.inOut"
                    });
                }
            });
        });
    }
    
    /**
     * Setup demo button functionality
     */
    setupDemoButton() {
        const demoButton = document.getElementById('watchDemo');
        
        if (demoButton) {
            demoButton.addEventListener('click', () => {
                // Create demo popup animation
                this.showDemoPopup();
            });
        }
    }
    
    /**
     * Show demo popup with animation
     */
    showDemoPopup() {
        // Create popup element
        const popup = document.createElement('div');
        popup.className = 'demo-popup';
        popup.innerHTML = `
            <div class="popup-overlay"></div>
            <div class="popup-content">
                <div class="popup-header">
                    <h3>🎥 Demo Video</h3>
                    <button class="popup-close">✕</button>
                </div>
                <div class="popup-body">
                    <div class="demo-placeholder">
                        <div class="play-icon">▶️</div>
                        <p>Demo video would be embedded here</p>
                        <p class="demo-note">Try the actual app to see it in action!</p>
                        <a href="index.html" class="btn btn-primary">Launch App</a>
                    </div>
                </div>
            </div>
        `;
        
        // Add popup styles
        const style = document.createElement('style');
        style.textContent = `
            .demo-popup {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .popup-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(5px);
            }
            .popup-content {
                position: relative;
                background: white;
                border-radius: 20px;
                max-width: 500px;
                width: 90%;
                max-height: 80vh;
                overflow: hidden;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            }
            .popup-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 20px 30px;
                border-bottom: 1px solid #e5e7eb;
            }
            .popup-header h3 {
                margin: 0;
                color: #1f2937;
            }
            .popup-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: #6b7280;
                transition: color 0.3s ease;
            }
            .popup-close:hover {
                color: #ef4444;
            }
            .popup-body {
                padding: 30px;
            }
            .demo-placeholder {
                text-align: center;
                padding: 40px 20px;
            }
            .play-icon {
                font-size: 4rem;
                margin-bottom: 20px;
                opacity: 0.7;
            }
            .demo-placeholder p {
                color: #6b7280;
                margin-bottom: 10px;
            }
            .demo-note {
                font-weight: 600;
                color: #4f46e5;
                margin: 20px 0 !important;
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(popup);
        
        // Animate popup in
        gsap.set(popup, { opacity: 0 });
        gsap.set('.popup-content', { scale: 0.8, y: 50 });
        
        gsap.to(popup, { opacity: 1, duration: 0.3 });
        gsap.to('.popup-content', {
            scale: 1,
            y: 0,
            duration: 0.5,
            ease: "back.out(1.7)",
            delay: 0.1
        });
        
        // Close popup functionality
        const closePopup = () => {
            gsap.to('.popup-content', {
                scale: 0.8,
                y: 50,
                duration: 0.3,
                ease: "power3.in"
            });
            gsap.to(popup, {
                opacity: 0,
                duration: 0.3,
                delay: 0.1,
                onComplete: () => {
                    document.body.removeChild(popup);
                    document.head.removeChild(style);
                }
            });
        };
        
        popup.querySelector('.popup-close').addEventListener('click', closePopup);
        popup.querySelector('.popup-overlay').addEventListener('click', closePopup);
    }
    
    /**
     * Setup feature card hover effects
     */
    setupFeatureCardHovers() {
        const featureCards = document.querySelectorAll('.feature-card');
        
        featureCards.forEach(card => {
            const icon = card.querySelector('.feature-icon');
            
            card.addEventListener('mouseenter', () => {
                gsap.to(icon, {
                    duration: 0.3,
                    scale: 1.2,
                    rotation: 10,
                    ease: "power2.out"
                });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(icon, {
                    duration: 0.3,
                    scale: 1,
                    rotation: 0,
                    ease: "power2.out"
                });
            });
        });
    }
    
    /**
     * Setup navbar scroll effect
     */
    setupNavbarScrollEffect() {
        let lastScrollTop = 0;
        
        ScrollTrigger.create({
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            onUpdate: (self) => {
                const scrollTop = self.scroll();
                const navbar = document.querySelector('.navbar');
                
                if (scrollTop > 100) {
                    if (scrollTop > lastScrollTop) {
                        // Scrolling down
                        gsap.to(navbar, {
                            y: -100,
                            duration: 0.3,
                            ease: "power3.out"
                        });
                    } else {
                        // Scrolling up
                        gsap.to(navbar, {
                            y: 0,
                            duration: 0.3,
                            ease: "power3.out"
                        });
                    }
                } else {
                    gsap.to(navbar, {
                        y: 0,
                        duration: 0.3,
                        ease: "power3.out"
                    });
                }
                
                lastScrollTop = scrollTop;
            }
        });
    }
    
    /**
     * Start counter animations for hero stats
     */
    startCounterAnimations() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const targetCount = parseInt(stat.getAttribute('data-count'));
            const counter = { value: 0 };
            
            gsap.to(counter, {
                value: targetCount,
                duration: 2,
                ease: "power3.out",
                delay: 2.5,
                onUpdate: () => {
                    stat.textContent = Math.floor(counter.value).toLocaleString();
                },
                onComplete: () => {
                    // Add final formatting
                    if (targetCount === 99) {
                        stat.textContent = targetCount + '%';
                    } else {
                        stat.textContent = targetCount.toLocaleString() + '+';
                    }
                }
            });
        });
    }
}

// Initialize animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new LandingPageAnimations();
});

// Add some additional scroll-based animations
window.addEventListener('load', () => {
    // Create a continuous background animation
    gsap.to('.floating-element', {
        rotation: 360,
        duration: 20,
        ease: "none",
        repeat: -1
    });
    
    // Add subtle parallax to section backgrounds
    ScrollTrigger.batch('.features, .how-it-works, .examples', {
        onEnter: (elements) => {
            gsap.from(elements, {
                opacity: 0,
                y: 50,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out"
            });
        }
    });
    
    // Refresh ScrollTrigger to account for any layout changes
    ScrollTrigger.refresh();
});