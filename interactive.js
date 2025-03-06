/**
 * Achyuth Unni Portfolio - Interactive Features (Optimized)
 * Performance-optimized version with improved particle effects
 */

// Enhanced particles.js configuration for both dark and light modes
function getParticlesConfig(isLightTheme, isMobile) {
    // Base configuration with adaptive settings
    const particleCount = isMobile ? 25 : 60;
    const particleSize = isMobile ? 2.5 : 3.5;
    const lineOpacity = isMobile ? 0.3 : 0.6;
    const moveSpeed = isMobile ? 2 : 3.5;
    
    // Vibrant color schemes for both themes
    const darkThemeColors = [
      '#089add', // Base blue
      '#38b6ff', // Light blue
      '#1976D2', // Material blue
      '#6a11cb', // Purple
      '#8A2BE2'  // Violet
    ];
    
    const lightThemeColors = [
      '#0077cc', // Base blue
      '#1565C0', // Darker blue
      '#0288d1', // Medium blue
      '#6200ea', // Deep purple
      '#651fff'  // Purple
    ];
    
    // Configuration object for particles.js
    return {
      "particles": {
        "number": {
          "value": particleCount,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": isLightTheme ? lightThemeColors : darkThemeColors
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#000000"
          }
        },
        "opacity": {
          "value": 0.7,
          "random": true,
          "anim": {
            "enable": true,
            "speed": 0.8,
            "opacity_min": 0.3,
            "sync": false
          }
        },
        "size": {
          "value": particleSize,
          "random": true,
          "anim": {
            "enable": true,
            "speed": 2,
            "size_min": 0.5,
            "sync": false
          }
        },
        "line_linked": {
          "enable": true,
          "distance": isMobile ? 120 : 150,
          "color": isLightTheme ? "#0077cc" : "#ffffff",
          "opacity": lineOpacity,
          "width": 1.5
        },
        "move": {
          "enable": true,
          "speed": moveSpeed,
          "direction": "none",
          "random": true,
          "straight": false,
          "out_mode": "out", // Changed to 'out' for better performance
          "bounce": false,
          "attract": {
            "enable": true,
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
            "distance": isMobile ? 140 : 180,
            "line_linked": {
              "opacity": 0.8
            }
          },
          "push": {
            "particles_nb": isMobile ? 2 : 4
          },
          "bubble": {
            "distance": 200,
            "size": particleSize * 1.5,
            "duration": 2,
            "opacity": 0.8,
            "speed": 3
          },
          "repulse": {
            "distance": 200,
            "duration": 0.4
          }
        }
      },
      "retina_detect": true
    };
  }
  
  // Initialize the most critical functions first
  document.addEventListener('DOMContentLoaded', function() {
      // Detect device capabilities for adaptive performance
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      // ======== THEME SWITCHING ========
      initThemeSwitch();
      
      // ======== ANIMATED SKILL BARS ========
      initSkillBars();
      
      // Defer less critical initializations with requestAnimationFrame for better performance
      requestAnimationFrame(() => {
          // ======== PARTICLES.JS BACKGROUND ========
          if (!prefersReducedMotion) {
              initEnhancedParticles();
          } else {
              // Fallback for reduced motion preference
              const particlesContainer = document.getElementById('particles-js');
              if (particlesContainer) {
                  const isLightTheme = document.body.classList.contains('light-theme');
                  particlesContainer.style.background = isLightTheme 
                    ? 'linear-gradient(135deg, rgba(0,119,204,0.1), rgba(106,17,203,0.1))'
                    : 'linear-gradient(135deg, rgba(8,154,221,0.2), rgba(106,17,203,0.2))';
              }
          }
          
          // ======== TYPING ANIMATION ========
          initTypingAnimation(isMobile);
          
          // ======== SMOOTH SCROLLING NAVIGATION ========
          initNavigation();
          
          // ======== PROJECT CARD TILE INTERACTIONS ========
          initProjectCards();
          
          // ======== GALLERY LIGHTBOX ========
          initGallery();
          
          // ======== CONTACT FORM ========
          initContactForm();
          
          // ======== SCROLL TO TOP BUTTON ========
          initScrollToTop();
          
          // ======== SCROLL REVEAL ANIMATIONS ========
          initScrollObserver();
          
          // ======== PERFORMANCE OPTIMIZATIONS ========
          optimizeImageLoading();
      });
      
      // Add debounced scroll event listener for performance
      let scrollTimeout;
      window.addEventListener('scroll', function() {
          if (scrollTimeout) {
              window.cancelAnimationFrame(scrollTimeout);
          }
          
          scrollTimeout = requestAnimationFrame(() => {
              // Check for skill bars animation
              const skillSection = document.getElementById('skills');
              if (skillSection && isInViewport(skillSection)) {
                  initSkillBars();
              }
              
              // Update active navigation
              updateActiveNavigation();
              
              // Show/hide scroll to top button
              const scrollToTopBtn = document.getElementById('scrollToTop');
              if (scrollToTopBtn) {
                  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
                      scrollToTopBtn.classList.add('show');
                  } else {
                      scrollToTopBtn.classList.remove('show');
                  }
              }
          });
      });
  });
  
  // Function to initialize enhanced particles
  function initEnhancedParticles() {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const isLightTheme = document.body.classList.contains('light-theme');
      
      if (typeof particlesJS !== 'undefined') {
          try {
              particlesJS("particles-js", getParticlesConfig(isLightTheme, isMobile));
              console.log("Enhanced particles initialized");
          } catch (error) {
              console.error("Error initializing enhanced particles:", error);
              
              // Fallback to simple gradient if particles.js fails
              const particlesContainer = document.getElementById('particles-js');
              if (particlesContainer) {
                  particlesContainer.style.background = isLightTheme 
                    ? 'linear-gradient(135deg, rgba(0,119,204,0.1), rgba(106,17,203,0.1))'
                    : 'linear-gradient(135deg, rgba(8,154,221,0.2), rgba(106,17,203,0.2))';
              }
          }
      }
  }
  
  // Function to check if element is in viewport
  function isInViewport(element) {
      if (!element) return false;
      const rect = element.getBoundingClientRect();
      const margin = 100; // Extra margin to trigger animations earlier
      return (
          rect.top >= -margin - rect.height &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight + margin) &&
          rect.right <= window.innerWidth
      );
  }
  
  // Theme switching functionality (optimized)
  function initThemeSwitch() {
      const themeSwitch = document.getElementById('theme-switch');
      if (!themeSwitch) return;
      
      // Check for saved preference or system preference
      const savedTheme = localStorage.getItem('theme');
      const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      if (savedTheme === 'light' || (!savedTheme && !prefersDarkMode)) {
          document.body.classList.add('light-theme');
          themeSwitch.checked = true;
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
          
          // Update particles
          updateEnhancedParticles();
      });
  }
  
  // Update particles when theme changes
  function updateEnhancedParticles() {
      const isLightTheme = document.body.classList.contains('light-theme');
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      if (typeof pJSDom !== 'undefined' && pJSDom.length > 0) {
          // Get updated configuration
          const config = getParticlesConfig(isLightTheme, isMobile);
          
          // Update particle colors
          pJSDom[0].pJS.particles.color.value = config.particles.color.value;
          
          // Update line colors
          pJSDom[0].pJS.particles.line_linked.color = config.particles.line_linked.color;
          
          // Apply changes
          pJSDom[0].pJS.fn.particlesRefresh();
      }
  }
  
  // Initialize skill bars animation (optimized)
  function initSkillBars() {
      const progressBars = document.querySelectorAll('.progress');
      if (!progressBars.length) return;
      
      progressBars.forEach(bar => {
          if (!bar.classList.contains('animated')) {
              const width = bar.getAttribute('data-progress');
              bar.style.width = width;
              bar.classList.add('animated');
          }
      });
  }
  
  // Initialize typing animation
  function initTypingAnimation(isMobile) {
      const typingElement = document.getElementById('typing-element');
      if (!typingElement) return;
      
      const roles = [
          'Computer Science Engineer',
          'Web Developer',
          'UI/UX Designer',
          'Graphic Designer',
      ];
      
      // On mobile, use simpler animation with fewer iterations
      const maxIterations = isMobile ? 4 : -1; // -1 for infinite
      let iterations = 0;
      
      let roleIndex = 0;
      let charIndex = 0;
      let isDeleting = false;
      let typingSpeed = 100;
      
      function typeText() {
          const currentRole = roles[roleIndex];
          
          if (isDeleting) {
              typingElement.textContent = currentRole.substring(0, charIndex - 1);
              charIndex--;
              typingSpeed = 50;
          } else {
              typingElement.textContent = currentRole.substring(0, charIndex + 1);
              charIndex++;
              typingSpeed = 100;
          }
          
          if (!isDeleting && charIndex === currentRole.length) {
              isDeleting = true;
              typingSpeed = 1500;
          } else if (isDeleting && charIndex === 0) {
              isDeleting = false;
              roleIndex = (roleIndex + 1) % roles.length;
              typingSpeed = 500;
              
              // Count iterations on mobile for limited animation
              if (isMobile) {
                  iterations++;
                  if (iterations >= maxIterations) {
                      typingElement.textContent = roles[roles.length - 1];
                      return;
                  }
              }
          }
          
          setTimeout(typeText, typingSpeed);
      }
      
      setTimeout(typeText, 500);
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
                  const headerHeight = document.querySelector('header').offsetHeight;
                  window.scrollTo({
                      top: targetElement.offsetTop - headerHeight,
                      behavior: 'smooth'
                  });
                  
                  // Update active nav
                  document.querySelectorAll('nav a').forEach(link => {
                      link.classList.remove('active-nav');
                  });
                  this.classList.add('active-nav');
              }
          });
      });
  }
  
  // Update active navigation on scroll
  function updateActiveNavigation() {
      const navLinks = document.querySelectorAll('nav a[href^="#"]');
      if (!navLinks.length) return;
      
      let current = '';
      const sections = document.querySelectorAll('section');
      const scrollPosition = window.scrollY + 150; // Adjusted for header offset
      
      sections.forEach(section => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
              current = section.getAttribute('id');
          }
      });
      
      navLinks.forEach(link => {
          link.classList.remove('active-nav');
          if (link.getAttribute('href') === `#${current}`) {
              link.classList.add('active-nav');
          }
      });
  }
  
  // Initialize project cards
  function initProjectCards() {
      const projectCards = document.querySelectorAll('.project-card');
      if (!projectCards.length) return;
      
      projectCards.forEach(card => {
          // Add hover effects
          card.addEventListener('mouseenter', function() {
              this.classList.add('hover-active');
          });
          
          card.addEventListener('mouseleave', function() {
              this.classList.remove('hover-active');
          });
      });
      
      // Toggle project details function
      window.toggleDetails = function(id) {
          const details = document.getElementById(id);
          if (!details) return;
          
          let overlay = document.querySelector('.modal-overlay');
          if (!overlay) {
              overlay = document.createElement('div');
              overlay.className = 'modal-overlay';
              overlay.style.position = 'fixed';
              overlay.style.top = '0';
              overlay.style.left = '0';
              overlay.style.width = '100%';
              overlay.style.height = '100%';
              overlay.style.backgroundColor = 'rgba(0,0,0,0.7)';
              overlay.style.zIndex = '999';
          }
          
          const themeToggle = document.querySelector('.theme-toggle-container');
          
          if (!details.classList.contains('show')) {
              document.body.appendChild(overlay);
              details.classList.add('show');
              document.body.classList.add('modal-open');
              document.body.style.overflow = 'hidden';
              
              if (themeToggle) themeToggle.style.display = 'none';
              
              // Close when clicking overlay
              overlay.addEventListener('click', closeModal);
              
              // Add close button if needed
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
                  
                  closeBtn.addEventListener('click', closeModal);
                  
                  details.style.position = 'relative';
                  details.appendChild(closeBtn);
              }
          } else {
              closeModal();
          }
          
          function closeModal() {
              details.classList.remove('show');
              if (overlay.parentNode) {
                  document.body.removeChild(overlay);
              }
              document.body.classList.remove('modal-open');
              document.body.style.overflow = '';
              if (themeToggle) themeToggle.style.display = '';
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
      let thumbsCreated = false;
      
      // Create thumbnails only when needed
      function createThumbs() {
          if (thumbsCreated || !thumbsContainer) return;
          
          // Clear existing thumbs
          thumbsContainer.innerHTML = '';
          
          galleryItems.forEach((item, index) => {
              const img = item.querySelector('img');
              if (img) {
                  const thumb = document.createElement('img');
                  thumb.src = img.src;
                  thumb.alt = img.alt;
                  thumb.loading = 'lazy';
                  thumb.classList.add('thumb');
                  thumb.addEventListener('click', () => {
                      currentIndex = index;
                      updateLightbox();
                  });
                  thumbsContainer.appendChild(thumb);
              }
          });
          
          thumbsCreated = true;
      }
      
      // Open lightbox when clicking on gallery item
      galleryItems.forEach((item, index) => {
          item.addEventListener('click', function(e) {
              // Skip if clicking the "View Full Image" button
              if (e.target.classList.contains('view-original-btn')) return;
              
              e.preventDefault();
              currentIndex = index;
              
              lightbox.style.display = 'flex';
              document.body.classList.add('lightbox-active');
              document.body.style.overflow = 'hidden';
              
              // Create thumbnails when needed
              createThumbs();
              updateLightbox();
              
              // Hide theme toggle
              const themeToggle = document.querySelector('.theme-toggle-container');
              if (themeToggle) themeToggle.style.display = 'none';
          });
      });
      
      // View original button
      document.querySelectorAll('.view-original-btn').forEach(btn => {
          btn.addEventListener('click', e => {
              e.stopPropagation();
              const img = e.target.closest('.gallery-item').querySelector('img');
              if (img) {
                  window.open(img.src, '_blank');
              }
          });
      });
      
      // Close lightbox
      if (closeLightbox) {
          closeLightbox.addEventListener('click', closeLightboxFunction);
      }
      
      // Close lightbox when clicking outside
      lightbox.addEventListener('click', function(e) {
          if (e.target === lightbox) {
              closeLightboxFunction();
          }
      });
      
      function closeLightboxFunction() {
          lightbox.style.display = 'none';
          document.body.classList.remove('lightbox-active');
          document.body.style.overflow = '';
          
          // Show theme toggle
          const themeToggle = document.querySelector('.theme-toggle-container');
          if (themeToggle) themeToggle.style.display = '';
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
                  // Scroll thumb into view if needed
                  if (thumbsContainer) {
                      thumbsContainer.scrollLeft = thumb.offsetLeft - (thumbsContainer.clientWidth / 2) + (thumb.clientWidth / 2);
                  }
              }
          });
          
          const currentItem = galleryItems[currentIndex];
          const currentImg = currentItem.querySelector('img');
          if (!currentImg) return;
          
          // Set image src
          lightboxImg.src = currentImg.src;
          
          // Update caption
          if (caption) {
              const title = currentItem.querySelector('h3')?.textContent || '';
              const desc = currentItem.querySelector('p')?.textContent || '';
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
                  closeLightboxFunction();
              }
          }
      });
      
      // Add "Open in New Tab" button if not already present
      const lightboxContent = document.querySelector('.lightbox-content');
      if (lightboxContent && !document.querySelector('.lightbox-actions')) {
          const actionsDiv = document.createElement('div');
          actionsDiv.className = 'lightbox-actions';
          
          const openBtn = document.createElement('button');
          openBtn.className = 'lightbox-btn';
          openBtn.textContent = 'Open in New Tab';
          openBtn.addEventListener('click', () => {
              if (lightboxImg && lightboxImg.src) {
                  window.open(lightboxImg.src, '_blank');
              }
          });
          
          actionsDiv.appendChild(openBtn);
          lightboxContent.appendChild(actionsDiv);
      }
  }
  
  // Initialize scroll animations using Intersection Observer
  function initScrollObserver() {
      const animateElements = document.querySelectorAll('.animate-on-scroll');
      if (!animateElements.length || !window.IntersectionObserver) return;
      
      const observerOptions = {
          root: null,
          rootMargin: '0px',
          threshold: 0.1
      };
      
      const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  const animationType = entry.target.dataset.animation || 'fade-up';
                  entry.target.classList.add(animationType);
                  
                  // Only unobserve non-timeline items
                  if (!entry.target.classList.contains('timeline-item')) {
                      observer.unobserve(entry.target);
                  }
              }
          });
      }, observerOptions);
      
      // Observe elements
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
  
  // Initialize contact form
  function initContactForm() {
      const contactBtn = document.getElementById('contactBtn');
      const contactForm = document.getElementById('contactForm');
      const closeForm = document.querySelector('.close-form');
      const messageForm = document.getElementById('messageForm');
      const formSuccess = document.getElementById('formSuccess');
      
      if (!contactBtn || !contactForm) return;
      
      // Ensure contact button text color
      if (contactBtn) {
          contactBtn.style.color = 'white';
      }
      
      // Toggle contact form
      contactBtn.addEventListener('click', function(e) {
          e.stopPropagation();
          contactForm.classList.toggle('open');
          contactBtn.classList.toggle('active');
      });
      
      // Close contact form
      if (closeForm) {
          closeForm.addEventListener('click', function() {
              contactForm.classList.remove('open');
              contactBtn.classList.remove('active');
          });
      }
      
      // Submit form (mock submission)
      if (messageForm && formSuccess) {
          messageForm.addEventListener('submit', function(e) {
              e.preventDefault();
              
              messageForm.style.display = 'none';
              formSuccess.style.display = 'block';
              
              // Reset form after delay
              setTimeout(function() {
                  messageForm.reset();
                  messageForm.style.display = 'block';
                  formSuccess.style.display = 'none';
                  contactForm.classList.remove('open');
                  contactBtn.classList.remove('active');
              }, 3000);
          });
      }
      
      // Close form when clicking outside
      document.addEventListener('click', function(e) {
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
      
      scrollToTopBtn.addEventListener('click', function() {
          window.scrollTo({
              top: 0,
              behavior: 'smooth'
          });
      });
  }
  
  // Optimize image loading
  function optimizeImageLoading() {
      document.querySelectorAll('img:not([loading])').forEach(img => {
          img.setAttribute('loading', 'lazy');
      });
  }
