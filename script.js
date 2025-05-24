// Global variables
let currentSlide = 0;
const totalSlides = 5;

// Mobile menu functionality
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('show');
}

// Smooth scrolling to sections
function scrollToSection(sectionId) {
    const element = document.querySelector(sectionId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
    // Close mobile menu if open
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.remove('show');
}

// Carousel functionality
function changeSlide(direction) {
    const slides = document.getElementById('carouselSlides');
    const dots = document.querySelectorAll('.carousel-dot');
    
    // Remove active class from current slide and dot
    dots[currentSlide].classList.remove('active');
    
    // Calculate new slide index
    currentSlide += direction;
    
    // Wrap around if necessary
    if (currentSlide >= totalSlides) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }
    
    // Update slide position
    slides.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Update active dot
    dots[currentSlide].classList.add('active');
}

function goToSlide(slideIndex) {
    const slides = document.getElementById('carouselSlides');
    const dots = document.querySelectorAll('.carousel-dot');
    
    // Remove active class from current dot
    dots[currentSlide].classList.remove('active');
    
    // Update current slide
    currentSlide = slideIndex;
    
    // Update slide position
    slides.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Update active dot
    dots[currentSlide].classList.add('active');
}

// Auto-advance carousel
function autoAdvanceCarousel() {
    changeSlide(1);
}

// Contact form submission
function submitForm(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(event.target);
    const firstName = formData.get('firstName') || event.target.querySelector('input[type="text"]').value;
    const lastName = formData.get('lastName') || event.target.querySelectorAll('input[type="text"]')[1].value;
    const email = formData.get('email') || event.target.querySelector('input[type="email"]').value;
    const phone = formData.get('phone') || event.target.querySelector('input[type="tel"]').value;
    const course = formData.get('course') || event.target.querySelector('select').value;
    const message = formData.get('message') || event.target.querySelector('textarea').value;
    
    // Simple validation
    if (!firstName || !lastName || !email || !phone || !course || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    // Show success message
    alert('Thank you for your message! We will contact you soon.');
    
    // Reset form
    event.target.reset();
}

// Floating call button functionality
function makeCall() {
    window.open('tel:7004940519', '_self');
}

// Initialize floating call button
function initFloatingCallButton() {
    const floatingBtn = document.getElementById('floatingCallBtn');
    
    // Show button after 2 seconds
    setTimeout(() => {
        floatingBtn.style.display = 'flex';
        positionFloatingButton();
    }, 2000);
    
    // Change position every 10 seconds
    setInterval(() => {
        positionFloatingButton();
    }, 10000);
}

function positionFloatingButton() {
    const floatingBtn = document.getElementById('floatingCallBtn');
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Calculate random position (10% to 80% of viewport)
    const randomTop = Math.random() * 70 + 10; // 10% to 80%
    const randomLeft = Math.random() * 70 + 10; // 10% to 80%
    
    // Apply position
    floatingBtn.style.top = `${randomTop}%`;
    floatingBtn.style.left = `${randomLeft}%`;
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.contact-card, .service-card, .stat-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.textContent.replace(/[^0-9]/g, ''));
                let current = 0;
                const increment = target / 100;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current) + (counter.textContent.includes('%') ? '%' : '+');
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = counter.textContent;
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

// Parallax effect for floating shapes
function initParallaxEffect() {
    const shapes = document.querySelectorAll('.floating-element');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.1;
            shape.style.transform = `translateY(${rate * speed}px) rotate(${scrolled * speed * 0.1}deg)`;
        });
    });
}

// Navigation scroll effect
function initNavigationScroll() {
    const nav = document.querySelector('.navigation');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(30, 64, 175, 0.95)';
            nav.style.backdropFilter = 'blur(10px)';
        } else {
            nav.style.background = 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)';
            nav.style.backdropFilter = 'none';
        }
    });
}

// Form input animations
function initFormAnimations() {
    const inputs = document.querySelectorAll('.form-input, .form-select, .form-textarea');
    
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (input.value === '') {
                input.parentElement.classList.remove('focused');
            }
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize carousel auto-advance
    setInterval(autoAdvanceCarousel, 5000);
    
    // Initialize floating call button
    initFloatingCallButton();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize counter animations
    animateCounters();
    
    // Initialize parallax effects
    initParallaxEffect();
    
    // Initialize navigation scroll effect
    initNavigationScroll();
    
    // Initialize form animations
    initFormAnimations();
    
    // Handle window resize for responsive design
    window.addEventListener('resize', () => {
        const mobileMenu = document.getElementById('mobileMenu');
        if (window.innerWidth > 768) {
            mobileMenu.classList.remove('show');
        }
    });
    
    // Add smooth scrolling to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add keyboard navigation for carousel
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            changeSlide(-1);
        } else if (e.key === 'ArrowRight') {
            changeSlide(1);
        }
    });
    
    // Add touch/swipe support for carousel
    let startX = 0;
    let endX = 0;
    
    const carouselWrapper = document.querySelector('.carousel-wrapper');
    
    carouselWrapper.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });
    
    carouselWrapper.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                changeSlide(1); // Swipe left, go to next slide
            } else {
                changeSlide(-1); // Swipe right, go to previous slide
            }
        }
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate hero elements
    const heroTitle = document.querySelector('.hero-title');
    const heroDescription = document.querySelector('.hero-description');
    const heroButtons = document.querySelector('.hero-buttons');
    
    if (heroTitle) {
        heroTitle.style.animation = 'fadeInUp 1s ease 0.2s both';
    }
    if (heroDescription) {
        heroDescription.style.animation = 'fadeInUp 1s ease 0.4s both';
    }
    if (heroButtons) {
        heroButtons.style.animation = 'fadeInUp 1s ease 0.6s both';
    }
});

// Add CSS animations via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .focused .form-label {
        color: #3b82f6;
        transform: translateY(-2px);
    }
    
    .loaded .floating-element {
        animation-play-state: running;
    }
`;
document.head.appendChild(style);