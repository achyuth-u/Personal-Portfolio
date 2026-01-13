let currentImageIndex = 0;
const galleryData = [];

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Gallery Data for Lightbox
    document.querySelectorAll('.masonry .item img').forEach((img, index) => {
        galleryData.push({
            src: img.src,
            alt: img.alt
        });
    });

    // 2. Typing Effect Logic
    const words = ["FRONTEND DEVELOPER", "GRAPHIC DESIGNER", "CREATIVE DESIGNER"];
    let wordIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    const typingElement = document.getElementById("typing-text");

    function typeEffect() {
        if (!typingElement) return;
        const currentWord = words[wordIdx];
        
        if (isDeleting) {
            typingElement.textContent = currentWord.substring(0, charIdx - 1);
            charIdx--;
        } else {
            typingElement.textContent = currentWord.substring(0, charIdx + 1);
            charIdx++;
        }

        let speed = isDeleting ? 50 : 100;

        if (!isDeleting && charIdx === currentWord.length) {
            speed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            wordIdx = (wordIdx + 1) % words.length;
            speed = 500;
        }

        setTimeout(typeEffect, speed);
    }
    typeEffect();

    // 3. Scroll to Top Logic
    const scrollTopBtn = document.getElementById("scroll-to-top");
    window.addEventListener("scroll", () => {
        if (window.pageYOffset > 400) {
            scrollTopBtn.classList.add("show");
        } else {
            scrollTopBtn.classList.remove("show");
        }
    });

    scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // 4. Accordion Logic
    document.querySelectorAll('.acc-trigger').forEach(trigger => {
        trigger.addEventListener('click', () => {
            const card = trigger.parentElement;
            const isActive = card.classList.contains('active');
            
            // Close other accordions in the same bento-grid
            const parentGrid = card.closest('.bento-grid');
            if(parentGrid) {
                parentGrid.querySelectorAll('.acc-card').forEach(otherCard => {
                    if (otherCard !== card) otherCard.classList.remove('active');
                });
            }
            card.classList.toggle('active');
        });
    });

    // 5. Theme Toggle Logic
    const themeBtn = document.getElementById('theme-toggle');
    themeBtn.addEventListener('click', () => {
        const body = document.body;
        body.classList.toggle('light');
        const isLight = body.classList.contains('light');
        
        // Update Icon
        themeBtn.querySelector('i').setAttribute('data-lucide', isLight ? 'moon' : 'sun');
        lucide.createIcons();
    });

    // 6. Scroll Animation (Intersection Observer)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.acc-card, .item, .hero, .section').forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
        el.style.transition = "all 0.6s cubic-bezier(0.2, 1, 0.3, 1)";
        observer.observe(el);
    });

    // Re-initialize Lucide for dynamic icon swaps
    lucide.createIcons();
});

// Lightbox Core Functions
function openLightbox(index) {
    currentImageIndex = index;
    updateLightboxUI();
    const lb = document.getElementById('lightbox');
    lb.style.display = 'flex';
    document.body.style.overflow = 'hidden'; 
}

function updateLightboxUI() {
    const img = document.getElementById('lb-img');
    const cap = document.getElementById('lb-cap');
    const data = galleryData[currentImageIndex];
    if(data) {
        img.src = data.src;
        cap.innerText = data.alt;
    }
}

function changeImage(step) {
    currentImageIndex += step;
    if (currentImageIndex >= galleryData.length) currentImageIndex = 0;
    if (currentImageIndex < 0) currentImageIndex = galleryData.length - 1;
    updateLightboxUI();
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Keyboard Support
document.addEventListener('keydown', (e) => {
    const lb = document.getElementById('lightbox');
    if (lb.style.display === 'flex') {
        if (e.key === "ArrowRight") changeImage(1);
        if (e.key === "ArrowLeft") changeImage(-1);
        if (e.key === "Escape") closeLightbox();
    }
});
