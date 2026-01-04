// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('.theme-icon');
let currentTheme = 'dark';

themeToggle.addEventListener('click', function () {
    this.classList.add('rotating');

    setTimeout(() => {
        if (currentTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
            themeIcon.textContent = '☀️';
            currentTheme = 'light';
        } else {
            document.documentElement.removeAttribute('data-theme');
            themeIcon.textContent = '🌙';
            currentTheme = 'dark';
        }
        this.classList.remove('rotating');
    }, 250);
});

// Improved Parallax Effect
// function updateParallax() {
//     const scrolled = window.pageYOffset;

//     // Background layers with subtle movement
//     const layer1 = document.querySelector('.parallax-layer-1');
//     const layer2 = document.querySelector('.parallax-layer-2');
//     const layer3 = document.querySelector('.parallax-layer-3');

//     if (layer1) layer1.style.transform = `translateY(${scrolled * 0.1}px)`;
//     if (layer2) layer2.style.transform = `translateY(${scrolled * 0.2}px)`;
//     if (layer3) layer3.style.transform = `translateY(${scrolled * 0.15}px)`;

//     // Hero floating shapes
//     const shapes = document.querySelectorAll('.floating-shape');
//     shapes.forEach((shape, index) => {
//         const speed = 0.3 + (index * 0.1);
//         shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
//     });

//     // Section parallax with more subtle effect
//     const sections = document.querySelectorAll('section:not(.hero)');
//     sections.forEach((section, index) => {
//         const rect = section.getBoundingClientRect();
//         if (rect.top < window.innerHeight && rect.bottom > 0) {
//             const speed = 0.05;
//             section.style.transform = `translateY(${scrolled * speed}px)`;
//         }
//     });
// }

// // Smooth parallax with throttling
// let parallaxTicking = false;
// function requestParallaxTick() {
//     if (!parallaxTicking) {
//         requestAnimationFrame(() => {
//             updateParallax();
//             parallaxTicking = false;
//         });
//         parallaxTicking = true;
//     }
// }

// Navigation scroll effect and active link updates
function updateNavigation() {
    const navbar = document.getElementById('navbar');
    const scrolled = window.pageYOffset;

    // Add scrolled class for styling
    if (scrolled > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Update active navigation link
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (scrolled >= sectionTop && scrolled < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}
        // Timeline Animation Controller
        function animateTimeline() {
            const timelineItems = document.querySelectorAll('.timeline-item');
            const timelineProgress = document.getElementById('timelineProgress');
            const timelineContainer = document.querySelector('.timeline-container');
            
            if (!timelineContainer) return;

            const containerTop = timelineContainer.offsetTop;
            const containerHeight = timelineContainer.offsetHeight;
            const scrolled = window.pageYOffset;
            const windowHeight = window.innerHeight;

            // Calculate progress percentage
            const startAnimation = containerTop - windowHeight + 100;
            const endAnimation = containerTop + containerHeight - windowHeight;
            
            if (scrolled > startAnimation && scrolled < endAnimation) {
                const progress = ((scrolled - startAnimation) / (endAnimation - startAnimation)) * 100;
                timelineProgress.style.height = Math.min(progress, 100) + '%';
            }

            // Animate timeline items
            timelineItems.forEach((item, index) => {
                const itemTop = item.offsetTop + containerTop;
                const itemTrigger = itemTop - windowHeight + 100;

                if (scrolled > itemTrigger) {
                    setTimeout(() => {
                        item.classList.add('animate');
                        const icon = item.querySelector('.timeline-icon');
                        if (icon && scrolled > itemTrigger + 200) {
                            icon.classList.add('pulse');
                            setTimeout(() => icon.classList.remove('pulse'), 2000);
                        }
                    }, index * 200);
                }
            });
        }

window.addEventListener('scroll', () => {
    // requestParallaxTick();
    updateNavigation();
    animateTimeline();
});

// Mobile menu functionality
const mobileToggle = document.getElementById('mobileToggle');
const mobileNav = document.getElementById('mobileNav');
let mobileMenuOpen = false;

mobileToggle.addEventListener('click', () => {
    mobileMenuOpen = !mobileMenuOpen;
    mobileNav.classList.toggle('active', mobileMenuOpen);
    mobileToggle.textContent = mobileMenuOpen ? '✕' : '☰';
});

// Close mobile menu when clicking a link
document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuOpen = false;
        mobileNav.classList.remove('active');
        mobileToggle.textContent = '☰';
    });
});
// Particle animation
function createParticles() {
    const container = document.body;
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        container.appendChild(particle);
    }
}

// Smooth scrolling for navigation links with mobile support
document.querySelectorAll('.nav-link, .mobile-nav-link, .btn, .scroll-indicator, .logo').forEach(link => {
    link.addEventListener('click', function (e) {
        if (this.getAttribute('href') && this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed nav
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Form submission
document.querySelector('.contact-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    // Simulate form submission
    const submitBtn = this.querySelector('button');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
        submitBtn.textContent = 'Message Sent!';
        submitBtn.style.background = 'linear-gradient(135deg, #00ff88, #00d4ff)';
        this.reset();

        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
        }, 3000);
    }, 2000);
});

// Intersection Observer for animations
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

// Observe project cards and skill categories
document.querySelectorAll('.project-card, .skill-category').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Dynamic typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Skill hover effects with tooltips
document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', function () {
        this.style.transform = 'scale(1.05) rotateY(10deg)';
    });

    item.addEventListener('mouseleave', function () {
        this.style.transform = 'scale(1) rotateY(0deg)';
    });
});

// Project card 3D tilt effect (simplified for better performance)
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Progress bars for skills (animated on scroll)
function animateSkillBars() {
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.background = 'rgba(0, 255, 136, 0.2)';
            item.style.transform = 'scale(1.05)';
            setTimeout(() => {
                item.style.background = 'rgba(255, 255, 255, 0.1)';
                item.style.transform = 'scale(1)';
            }, 200);
        }, index * 50);
    });
}

// Scroll-triggered animations
let skillsAnimated = false;
window.addEventListener('scroll', () => {
    const skillsSection = document.getElementById('skills');
    const skillsTop = skillsSection.offsetTop;
    const scrollTop = window.pageYOffset;

    if (scrollTop > skillsTop - window.innerHeight / 2 && !skillsAnimated) {
        animateSkillBars();
        skillsAnimated = true;
    }

    // Hide/show scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollTop > window.innerHeight / 2) {
        scrollIndicator.style.opacity = '0';
        scrollIndicator.style.pointerEvents = 'none';
    } else {
        scrollIndicator.style.opacity = '1';
        scrollIndicator.style.pointerEvents = 'auto';
    }
});

// Stats counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        let current = 0;
        const increment = target / 50;
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };
        updateCounter();
    });
}

// Trigger counter animation when about section is visible
const aboutSection = document.getElementById('about');
const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            aboutObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });
aboutObserver.observe(aboutSection);

// Random tech facts that appear on hover
const techFacts = [
    "Python is named after Monty Python's Flying Circus!",
    "The first computer bug was an actual bug - a moth!",
    "JavaScript was created in just 10 days!",
    "MySQL's dolphin mascot is named Sakila!",
    "OpenCV was originally developed by Intel!",
    "CSS stands for Cascading Style Sheets!"
];

document.querySelectorAll('.tech-item').forEach((item, index) => {
    item.addEventListener('mouseenter', function () {
        if (!this.hasAttribute('data-tooltip')) {
            this.setAttribute('data-tooltip', techFacts[index % techFacts.length]);
            this.style.position = 'relative';

            const tooltip = document.createElement('div');
            tooltip.textContent = this.getAttribute('data-tooltip');
            tooltip.style.cssText = `
                        position: absolute;
                        bottom: 100%;
                        left: 50%;
                        transform: translateX(-50%);
                        background: rgba(0, 0, 0, 0.9);
                        color: #00ff88;
                        padding: 8px 12px;
                        border-radius: 8px;
                        font-size: 0.8rem;
                        white-space: nowrap;
                        z-index: 1000;
                        opacity: 0;
                        transition: opacity 0.3s ease;
                        pointer-events: none;
                        margin-bottom: 5px;
                    `;

            this.appendChild(tooltip);
            setTimeout(() => tooltip.style.opacity = '1', 10);
        }
    });

    item.addEventListener('mouseleave', function () {
        const tooltip = this.querySelector('div');
        if (tooltip) {
            tooltip.style.opacity = '0';
            setTimeout(() => tooltip.remove(), 300);
        }
    });
});

// Initialize everything
createParticles();

// Initialize parallax
// updateParallax();
updateNavigation();

// Add padding to body for fixed navigation
document.body.style.paddingTop = '80px';

// Keyboard navigation
document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowDown' || e.key === 'Space') {
        e.preventDefault();
        window.scrollBy(0, window.innerHeight);
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        window.scrollBy(0, -window.innerHeight);
    }
});

// Easter egg - Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

document.addEventListener('keydown', function (e) {
    konamiCode.push(e.code);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }

    if (konamiCode.join(',') === konamiSequence.join(',')) {
        document.body.style.filter = 'hue-rotate(180deg)';
        setTimeout(() => {
            document.body.style.filter = 'hue-rotate(0deg)';
        }, 5000);
        konamiCode = [];
    }
});

// Performance optimization - lazy loading for heavy animations
if ('IntersectionObserver' in window) {
    const lazyAnimationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                lazyAnimationObserver.unobserve(entry.target);
            }
        });
    });

    document.querySelectorAll('[data-animate]').forEach(el => {
        lazyAnimationObserver.observe(el);
    });
}
const handleSubmit = (event) => {
  event.preventDefault();

  const myForm = event.target;
  const formData = new FormData(myForm);
  
  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(formData).toString(),
  })
    .then(() => {
      // Hide the form and show the feedback
      myForm.style.display = "none";
      document.getElementById("form-feedback").style.display = "block";
    })
    .catch((error) => alert(error));
};

document.querySelector("#portfolio-form").addEventListener("submit", handleSubmit);