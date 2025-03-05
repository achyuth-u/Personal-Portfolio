/**
 * Achyuth Unni Portfolio - Interactive Features
 * This file contains all the JavaScript functionality for the portfolio website
 * Optimized for performance and reliability
 */

// Initialize the most critical functions first
document.addEventListener('DOMContentLoaded', function() {
    // ======== THEME SWITCHING ========
    initThemeSwitch();
    
    // ======== ANIMATED SKILL BARS ========
    initSkillBars();
    
    // Defer less critical initializations
    setTimeout(() => {
        // ======== PARTICLES.JS BACKGROUND ========
        initParticles();
        
        // ======== TYPING ANIMATION ========
        initTypingAnimation();
        
        // ======== SMOOTH SCROLLING NAVIGATION ========
        initNavigation();
        
        // ======== PROJECT CARD TILE INTERACTIONS ========
        initProjectCards();
        
        // ======== GALLERY LIGHTBOX ========
        initGallery();
        
        // ======== GALLERY IMPROVEMENTS ========
        initGalleryImprovements();
        
        // ======== FLOATING CONTACT FORM ========
        initContactForm();
        
        // ======== SCROLL TO TOP BUTTON ========
        initScrollToTop();
        
        // ======== SCROLL REVEAL ANIMATIONS ========
        initScrollReveal();
        
        // ======== PERFORMANCE OPTIMIZATIONS ========
        optimizeImageLoading();
        optimizeAnimations();
        progressiveEnhancement();
        
        // Apply modern UI effects after everything is loaded
        applyModernUIEffects();
    }, 100);
});

// Theme switching functionality
function initThemeSwitch() {
    const themeSwitch = document.getElementById('theme-switch');
    if (!themeSwitch) return;
    
    // Check for saved theme preference or set based on user's system preference
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-theme');
        themeSwitch.checked = true;
    } else if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.remove('light-theme');
        themeSwitch.checked = false;
    } else {
        // Check user system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
            document.body.classList.add('light-theme');
            themeSwitch.checked = true;
        }
    }
    
    // Handle theme switch
    themeSwitch.addEventListener('change', function() {
        if (this.checked) {
            document.body.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.classList.remove('light-theme');
            localStorage.setItem('theme', 'dark');
        }
        
        // Update particles.js if it's initialized
        if (typeof updateParticlesTheme === 'function') {
            updateParticlesTheme(this.checked);
        }
    });
}

// Function to update particles theme
function updateParticlesTheme(isLight) {
    if (typeof pJSDom !== 'undefined' && pJSDom.length > 0) {
        const particleColors = isLight ? 
            ['#0077cc', '#0088ee', '#3399ff'] : 
            ['#089add', '#0078af', '#005f8c'];
        
        pJSDom[0].pJS.particles.color.value = particleColors;
        pJSDom[0].pJS.particles.line_linked.color = isLight ? '#0077cc' : '#ffffff';
        pJSDom[0].pJS.fn.particlesRefresh();
    }
}

// Initialize particles.js with optimized settings
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        try {
            particlesJS("particles-js", {
                "particles": {
                    "number": {
                        "value": 40, // Reduced from 60 for better performance
                        "density": {
                            "enable": true,
                            "value_area": 800
                        }
                    },
                    "color": {
                        "value": document.body.classList.contains('light-theme') ? 
                            ['#0077cc', '#0088ee', '#3399ff'] : 
                            ['#089add', '#0078af', '#005f8c']
                    },
                    "shape": {
                        "type": "circle",
                        "stroke": {
                            "width": 0,
                            "color": "#000000"
                        },
                    },
                    "opacity": {
                        "value": 0.5,
                        "random": false,
                        "anim": {
                            "enable": false,
                            "speed": 1,
                            "opacity_min": 0.1,
                            "sync": false
                        }
                    },
                    "size": {
                        "value": 3,
                        "random": true,
                        "anim": {
                            "enable": false,
                            "speed": 40,
                            "size_min": 0.1,
                            "sync": false
                        }
                    },
                    "line_linked": {
                        "enable": true,
                        "distance": 150,
                        "color": document.body.classList.contains('light-theme') ? "#0077cc" : "#ffffff",
                        "opacity": 0.4,
                        "width": 1
                    },
                    "move": {
                        "enable": true,
                        "speed": 2,
                        "direction": "none",
                        "random": false,
                        "straight": false,
                        "out_mode": "out",
                        "bounce": false,
                        "attract": {
                            "enable": false,
                            "rotateX": 600,
                            "rotateY": 1200
                        }
                    }
                },
                "interactivity": {
                    "detect_on": "canvas",
                    "events": {
                        "onhover": {
                            "enable": true,
                            "mode": "grab"
                        },
                        "onclick": {
                            "enable": true,
                            "mode": "push"
                        },
                        "resize": true
                    },
                    "modes": {
                        "grab": {
                            "distance": 140,
                            "line_linked": {
                                "opacity": 1
                            }
                        },
                        "push": {
                            "particles_nb": 2 // Reduced from 4
                        }
                    }
                },
                "retina_detect": true
            });
        } catch (error) {
            console.error("Error initializing particles.js:", error);
        }
    }
}

// Function to check if an element is in viewport
function isInViewport(element) {
    if (!element) return false;
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Initialize skill bars animation
function initSkillBars() {
    const skillSection = document.getElementById('skills');
    const progressBars = document.querySelectorAll('.progress');
    
    if (!skillSection || !progressBars.length) return;
    
    // Initial check on page load
    checkSkills();
    
    // Check on scroll
    window.addEventListener('scroll', checkSkills);
    
    function checkSkills() {
        if (skillSection && isInViewport(skillSection)) {
            progressBars.forEach(bar => {
                const width = bar.getAttribute('data-progress');
                bar.style.width = width;
            });
        }
    }
}

// Initialize typing animation
function initTypingAnimation() {
    const typingElement = document.getElementById('typing-element');
    if (!typingElement) return;
    
    const roles = [
        'Computer Science Engineer',
        'Web Developer',
        'UI/UX Designer',
        'Graphic Designer',
    ];
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100; // Base typing speed in ms
    
    function typeText() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            // Removing text
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Faster when deleting
        } else {
            // Adding text
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // Normal speed when typing
        }
        
        // Check if word is complete
        if (!isDeleting && charIndex === currentRole.length) {
            // Pause at the end of typing
            isDeleting = true;
            typingSpeed = 1500; // Wait before starting to delete
        } else if (isDeleting && charIndex === 0) {
            // Move to next word when deleted
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // Pause before typing new word
        }
        
        setTimeout(typeText, typingSpeed);
    }
    
    // Start the typing animation
    setTimeout(typeText, 500); // Reduced delay for faster startup
}

// Initialize smooth scrolling navigation
function initNavigation() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for header
                    behavior: 'smooth'
                });
                
                // Update active nav item
                document.querySelectorAll('nav a').forEach(link => {
                    link.classList.remove('active-nav');
                });
                this.classList.add('active-nav');
            }
        });
    });
    
    // Highlight active section on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav a');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            
            if (pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active-nav');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active-nav');
            }
        });
    });
}

// Initialize project cards (tile style)
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    if (!projectCards.length) return;
    
    projectCards.forEach(card => {
        // Add hover effects and interactions
        card.addEventListener('mouseenter', function() {
            this.classList.add('hover-active');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hover-active');
        });
        
        // Stop propagation for buttons inside the card
        const buttons = card.querySelectorAll('button');
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        });
    });
    
    // Toggle project details
    window.toggleDetails = function(id) {
        const details = document.getElementById(id);
        if (!details) return;
        
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0,0,0,0.7)';
        overlay.style.zIndex = '999';
        
        if (!details.classList.contains('show')) {
            document.body.appendChild(overlay);
            details.classList.add('show');
            
            // Hide theme toggle and scroll-to-top when modal is open
            const themeToggle = document.querySelector('.theme-toggle-container');
            if (themeToggle) themeToggle.style.display = 'none';
            
            // Close when clicking overlay
            overlay.addEventListener('click', function() {
                details.classList.remove('show');
                document.body.removeChild(overlay);
                if (themeToggle) themeToggle.style.display = 'block';
            });
            
            // Add close button to details if it doesn't exist
            if (!details.querySelector('.close-details')) {
                const closeBtn = document.createElement('span');
                closeBtn.innerHTML = '&times;';
                closeBtn.className = 'close-details';
                closeBtn.style.position = 'absolute';
                closeBtn.style.top = '10px';
                closeBtn.style.right = '15px';
                closeBtn.style.fontSize = '24px';
                closeBtn.style.cursor = 'pointer';
                closeBtn.style.color = 'var(--text-color)';
                
                closeBtn.addEventListener('click', function() {
                    details.classList.remove('show');
                    const existingOverlay = document.querySelector('.modal-overlay');
                    if (existingOverlay) {
                        document.body.removeChild(existingOverlay);
                    }
                    if (themeToggle) themeToggle.style.display = 'block';
                });
                
                details.style.position = 'relative';
                details.appendChild(closeBtn);
            }
        } else {
            details.classList.remove('show');
            const existingOverlay = document.querySelector('.modal-overlay');
            if (existingOverlay) {
                document.body.removeChild(existingOverlay);
            }
            const themeToggle = document.querySelector('.theme-toggle-container');
            if (themeToggle) themeToggle.style.display = 'block';
        }
    };
}

// Initialize gallery and lightbox
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    
    if (!galleryItems.length || !lightbox) return;
    
    const lightboxImg = document.getElementById('lightbox-img');
    const caption = document.getElementById('caption');
    const closeLightbox = document.querySelector('.close-lightbox');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const thumbsContainer = document.querySelector('.lightbox-thumbs');
    
    let currentIndex = 0;
    
    // Create thumbnails
    if (thumbsContainer) {
        galleryItems.forEach((item, index) => {
            const img = item.querySelector('img');
            if (img) {
                const thumb = document.createElement('img');
                thumb.src = img.src;
                thumb.alt = img.alt;
                thumb.classList.add('thumb');
                thumb.addEventListener('click', () => {
                    currentIndex = index;
                    updateLightbox();
                });
                thumbsContainer.appendChild(thumb);
            }
        });
    }
    
    // Open lightbox when clicking on gallery image
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            if (e.target.classList.contains('view-original-btn')) {
                return; // Don't open lightbox if the button was clicked
            }
            
            e.preventDefault();
            currentIndex = index;
            lightbox.style.display = 'flex';
            document.body.classList.add('lightbox-active'); // Add class to body
            updateLightbox();
            document.body.style.overflow = 'hidden'; // Prevent scrolling
            
            // Hide theme toggle when lightbox is open
            const themeToggle = document.querySelector('.theme-toggle-container');
            if (themeToggle) themeToggle.style.display = 'none';
        });
    });
    
    // Close lightbox
    if (closeLightbox) {
        closeLightbox.addEventListener('click', () => {
            lightbox.style.display = 'none';
            document.body.classList.remove('lightbox-active'); // Remove class from body
            document.body.style.overflow = 'auto'; // Re-enable scrolling
            
            // Show theme toggle when lightbox is closed
            const themeToggle = document.querySelector('.theme-toggle-container');
            if (themeToggle) themeToggle.style.display = 'block';
        });
    }
    
    // Next image
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % galleryItems.length;
            updateLightbox(true);
        });
    }
    
    // Previous image
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
            updateLightbox(false);
        });
    }
    
    // Update lightbox with current image
    function updateLightbox(isNext = true) {
        if (!lightboxImg) return;
        
        const thumbs = document.querySelectorAll('.thumb');
        thumbs.forEach((thumb, i) => {
            thumb.classList.remove('active-thumb');
            if (i === currentIndex) {
                thumb.classList.add('active-thumb');
            }
        });
        
        const currentItem = galleryItems[currentIndex];
        const currentImg = currentItem.querySelector('img');
        if (!currentImg) return;
        
        const title = currentItem.querySelector('h3')?.textContent || '';
        const desc = currentItem.querySelector('p')?.textContent || '';
        
        lightboxImg.src = currentImg.src;
        if (caption) {
            caption.textContent = title ? `${title} - ${desc}` : currentImg.alt;
        }
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'flex') {
            if (e.key === 'ArrowRight') {
                currentIndex = (currentIndex + 1) % galleryItems.length;
                updateLightbox(true);
            } else if (e.key === 'ArrowLeft') {
                currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
                updateLightbox(false);
            } else if (e.key === 'Escape') {
                lightbox.style.display = 'none';
                document.body.classList.remove('lightbox-active'); // Remove class from body
                document.body.style.overflow = 'auto';
                
                // Show theme toggle when lightbox is closed
                const themeToggle = document.querySelector('.theme-toggle-container');
                if (themeToggle) themeToggle.style.display = 'block';
            }
        }
    });
}

// Gallery improvements
function initGalleryImprovements() {
    // Add functionality to "View Full Image" buttons
    document.querySelectorAll('.view-original-btn').forEach(btn => {
        btn.addEventListener('click', e => {
            e.stopPropagation(); // Prevent lightbox from opening
            const img = e.target.closest('.gallery-item').querySelector('img');
            if (img) {
                window.open(img.src, '_blank');
            }
        });
    });

    // Add "Open in New Tab" button to lightbox
    const lightboxContent = document.querySelector('.lightbox-content');
    if (lightboxContent && !document.querySelector('.lightbox-actions')) {
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'lightbox-actions';
        
        const openBtn = document.createElement('button');
        openBtn.className = 'lightbox-btn';
        openBtn.textContent = 'Open in New Tab';
        openBtn.addEventListener('click', () => {
            const lightboxImg = document.getElementById('lightbox-img');
            if (lightboxImg) {
                window.open(lightboxImg.src, '_blank');
            }
        });
        
        actionsDiv.appendChild(openBtn);
        lightboxContent.appendChild(actionsDiv);
    }
    
    // Hide theme toggle when lightbox is open
    document.addEventListener('DOMContentLoaded', function() {
        const lightbox = document.getElementById('lightbox');
        if (!lightbox) return;
        
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
                document.body.classList.remove('lightbox-active');
                document.body.style.overflow = 'auto';
                
                // Show theme toggle when lightbox is closed by clicking outside
                const themeToggle = document.querySelector('.theme-toggle-container');
                if (themeToggle) themeToggle.style.display = 'block';
            }
        });
    });
}

// Initialize contact form
function initContactForm() {
    const contactBtn = document.getElementById('contactBtn');
    const contactForm = document.getElementById('contactForm');
    const closeForm = document.querySelector('.close-form');
    const messageForm = document.getElementById('messageForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (!contactBtn || !contactForm) return;
    
    // Ensure contact button text is always the correct color
    if (contactBtn) {
        contactBtn.style.color = 'white';
    }
    
    // Toggle contact form
    contactBtn.addEventListener('click', () => {
        contactForm.classList.toggle('open');
        contactBtn.classList.toggle('active');
    });
    
    // Close contact form
    if (closeForm) {
        closeForm.addEventListener('click', () => {
            contactForm.classList.remove('open');
            contactBtn.classList.remove('active');
        });
    }
    
    // Submit form (mock submission)
    if (messageForm && formSuccess) {
        messageForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Here you would normally send the form data to a server
            // For this example, we'll just show a success message
            messageForm.style.display = 'none';
            formSuccess.style.display = 'block';
            
            // Reset form after 3 seconds
            setTimeout(() => {
                messageForm.reset();
                messageForm.style.display = 'block';
                formSuccess.style.display = 'none';
                contactForm.classList.remove('open');
                contactBtn.classList.remove('active');
            }, 3000);
        });
    }
    
    // Close contact form when clicking outside
    document.addEventListener('click', (e) => {
        if (!contactBtn || !contactForm) return;
        const isClickInside = contactBtn.contains(e.target) || contactForm.contains(e.target);
        
        if (!isClickInside && contactForm.classList.contains('open')) {
            contactForm.classList.remove('open');
            contactBtn.classList.remove('active');
        }
    });
}

// Initialize scroll to top button
function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (!scrollToTopBtn) return;
    
    // Make sure the button is at the bottom right
    scrollToTopBtn.style.position = 'fixed';
    scrollToTopBtn.style.bottom = '30px';
    scrollToTopBtn.style.right = '30px';
    scrollToTopBtn.style.zIndex = '99';
    
    window.addEventListener('scroll', function() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize scroll reveal animations
function initScrollReveal() {
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    if (!animateElements.length) return;
    
    // Observer options
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // trigger when 10% of the element is visible
    };
    
    // Create observer
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Get animation type from data attribute or default to fade-up
                const animationType = entry.target.dataset.animation || 'fade-up';
                entry.target.classList.add(animationType);
                
                // Only animate once if not a timeline item (which we'll handle separately)
                if (!entry.target.classList.contains('timeline-item')) {
                    observer.unobserve(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Start observing elements
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
    // Special handling for timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        const isEven = index % 2 === 1;
        item.classList.add(isEven ? 'animate-fade-left' : 'animate-fade-right');
    });
}

// Apply modern UI effects
function applyModernUIEffects() {
    // Add hover classes to elements
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.classList.add('hover-float');
    });
    
    const socialIcons = document.querySelectorAll('.social-media a');
    socialIcons.forEach(icon => {
        icon.classList.add('hover-scale');
    });
    
    // Add pulse animation to CTA elements
    const ctaElements = document.querySelectorAll('.contact-btn, .download-resume');
    ctaElements.forEach(element => {
        element.classList.add('pulse-animation');
    });
}

// Optimize image loading
function optimizeImageLoading() {
    // Add lazy loading to all images (modern browsers support this natively)
    document.querySelectorAll('img:not([loading])').forEach(img => {
        img.setAttribute('loading', 'lazy');
    });
}

// Optimize animations to use will-change only when needed
function optimizeAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll, .project-card, .gallery-item');
    
    // Only apply will-change when the animation is about to happen
    const optimizeElement = (element) => {
        element.addEventListener('mouseenter', () => {
            element.style.willChange = 'transform, opacity';
        });
        
        element.addEventListener('mouseleave', () => {
            // Remove will-change after animation completes
            setTimeout(() => {
                element.style.willChange = 'auto';
            }, 500);
        });
    };
    
    animatedElements.forEach(optimizeElement);
}

// Progressive enhancement for JS features
function progressiveEnhancement() {
    // Check if particles.js loaded successfully
    if (typeof particlesJS === 'undefined') {
        // Fallback to simple gradient background if particles.js fails
        const particlesContainer = document.getElementById('particles-js');
        if (particlesContainer) {
            particlesContainer.style.background = 'linear-gradient(135deg, rgba(0,119,204,0.3), rgba(106,17,203,0.3))';
        }
    }

    // Provide fallbacks for other JS-dependent features
    if (!window.IntersectionObserver) {
        // Simple fallback for browsers without IntersectionObserver
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            el.classList.add('fade-in');
            el.style.opacity = 1;
        });
    }
}

// Portfolio diagnostic tool (optional - can be removed in production)
function portfolioDiagnostic() {
    console.log("======= PORTFOLIO DIAGNOSTIC TOOL =======");
    
    // Check if critical elements are present
    const criticalElements = [
        'particles-js',
        'about',
        'skills',
        'projects',
        'professional-experience',
        'graphic-design',
        'contact-info'
    ];
    
    console.log("Checking critical elements...");
    criticalElements.forEach(id => {
        const element = document.getElementById(id);
        console.log(`${id}: ${element ? '✅ Present' : '❌ Missing'}`);
        
        if (element) {
            const styles = window.getComputedStyle(element);
            const isVisible = styles.display !== 'none' && 
                              styles.visibility !== 'hidden' && 
                              styles.opacity !== '0';
            
            console.log(`  - Visibility: ${isVisible ? '✅ Visible' : '❌ Hidden'}`);
            
            if (id === 'particles-js') {
                console.log(`  - Position: ${styles.position}`);
                console.log(`  - Z-index: ${styles.zIndex}`);
            }
        }
    });
    
    // Check for CSS issues
    console.log("\nChecking CSS variables...");
    const rootStyles = window.getComputedStyle(document.documentElement);
    const cssVars = [
        '--bg-color',
        '--text-color',
        '--accent-color',
        '--card-bg'
    ];
    
    cssVars.forEach(variable => {
        console.log(`${variable}: ${rootStyles.getPropertyValue(variable) || '❌ Not set'}`);
    });
    
    // Check for JavaScript issues
    console.log("\nChecking JavaScript functionality...");
    console.log(`particles.js: ${typeof particlesJS !== 'undefined' ? '✅ Loaded' : '❌ Not loaded'}`);
    console.log(`pJSDom: ${typeof pJSDom !== 'undefined' ? '✅ Initialized' : '❌ Not initialized'}`);
    
    // Fix common issues
    console.log("\nAttempting to fix common issues...");
    
    // Fix particles.js
    if (document.getElementById('particles-js')) {
        document.getElementById('particles-js').style.position = 'fixed';
        document.getElementById('particles-js').style.zIndex = '-1';
        document.getElementById('particles-js').style.opacity = '0.5';
        console.log("✅ Applied fixes to particles.js");
    }
    
    // Fix animations
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        el.style.opacity = '1';
        console.log("✅ Fixed animation opacity");
    });
    
    // Force repaint
    document.body.style.display = 'none';
    setTimeout(() => {
        document.body.style.display = '';
        console.log("✅ Forced repaint to fix rendering issues");
    }, 0);
    
    console.log("======= DIAGNOSTIC COMPLETE =======");
    console.log("If issues persist, add the CSS fixes mentioned in critical-fixes.css");
}

// Auto-run diagnostic after 3 seconds if page appears broken
setTimeout(() => {
    const mainContent = document.getElementById('about');
    if (!mainContent) return;
    
    const computedStyle = window.getComputedStyle(mainContent);
    if (computedStyle.opacity === '0' || computedStyle.visibility === 'hidden') {
        console.log("Detecting rendering issues, running diagnostic...");
        portfolioDiagnostic();
    }
}, 3000);