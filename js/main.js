// Main JavaScript file for Ankit Kumar's Portfolio
// Handles navigation, video loading, accessibility, and performance optimizations

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initSmoothScrolling();
    initVideoHandling();
    initAccessibility();
    initPerformanceOptimizations();
});

// Navigation functionality
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navMenu = document.querySelector('.nav-menu');

    // Helper to close mobile menu
    function closeMobileMenu() {
        navLinks.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        navLinks.style.position = '';
        navLinks.style.top = '';
        navLinks.style.left = '';
        navLinks.style.right = '';
        navLinks.style.width = '';
        navLinks.style.background = '';
        navLinks.style.boxShadow = '';
        navLinks.style.borderRadius = '';
        navLinks.style.zIndex = '';
    }

    // Attach click and keyboard listeners to nav links
    function attachNavLinkListeners() {
        navLinks.querySelectorAll('a').forEach(link => {
            link.removeEventListener('click', link._closeHandler);
            link.removeEventListener('keydown', link._closeKeyHandler);
            link._closeHandler = function(e) {
                if (window.innerWidth <= 768) {
                    closeMobileMenu();
                }
            };
            link._closeKeyHandler = function(e) {
                if ((e.key === 'Enter' || e.key === ' ') && window.innerWidth <= 768) {
                    closeMobileMenu();
                }
            };
            link.addEventListener('click', link._closeHandler);
            link.addEventListener('keydown', link._closeKeyHandler);
        });
    }

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const isExpanded = navLinks.classList.contains('active');
            navToggle.setAttribute('aria-expanded', isExpanded);
            navLinks.style.position = '';
            navLinks.style.top = '';
            navLinks.style.left = '';
            navLinks.style.right = '';
            navLinks.style.width = '';
            navLinks.style.background = '';
            navLinks.style.boxShadow = '';
            navLinks.style.borderRadius = '';
            navLinks.style.zIndex = '';
            attachNavLinkListeners(); // Always re-attach listeners
        });
        attachNavLinkListeners(); // Attach on load
    }

    // Hide navigation on scroll down, show on scroll up
    let lastScrollTop = 0;
    if (navMenu) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                navMenu.style.transform = 'translateY(-100%)';
            } else {
                navMenu.style.transform = 'translateY(0)';
            }
            lastScrollTop = scrollTop;
        });
    }
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;
            const targetId = href.trim();
            // Case-insensitive match for section IDs
            const target = document.querySelector(targetId) || document.getElementById(targetId.replace('#', ''));
            if (target) {
                e.preventDefault();
                // Calculate offset for fixed navbar
                const nav = document.querySelector('.nav-menu');
                const navHeight = nav ? nav.offsetHeight : 0;
                const rect = target.getBoundingClientRect();
                const scrollTop = window.scrollY || window.pageYOffset;
                // Only apply offset if not the first section (e.g., About)
                let offset = rect.top + scrollTop;
                if (targetId !== '#about' && targetId !== '#main-content') {
                    offset -= navHeight;
                }
                window.scrollTo({
                    top: offset,
                    behavior: 'smooth'
                });
                // Update URL without page jump
                history.pushState(null, null, targetId);
            }
        });
    });
}

// Video handling with lazy loading and error handling
function initVideoHandling() {
    const videos = document.querySelectorAll('video');
    
    videos.forEach(video => {
        const container = video.parentElement;
        
        // Create loading indicator
        const loading = document.createElement('div');
        loading.className = 'video-loading';
        loading.textContent = 'Loading video...';
        loading.setAttribute('aria-label', 'Loading video content');
        container.appendChild(loading);
        
        // Handle video load events
        video.addEventListener('loadeddata', () => {
            loading.style.display = 'none';
            video.style.display = 'block';
        });
        
        video.addEventListener('error', () => {
            loading.style.display = 'none';
            const error = document.createElement('div');
            error.className = 'video-error';
            error.innerHTML = `
                <p>Video failed to load.</p>
                <a href="${video.querySelector('source').src}" target="_blank" class="cta-button">
                    Download Video
                </a>
            `;
            container.appendChild(error);
        });
        
        // Add play/pause accessibility
        video.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                if (video.paused) {
                    video.play();
                } else {
                    video.pause();
                }
            }
        });
    });

    // Lazy loading for videos
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const video = entry.target;
                const source = video.querySelector('source');
                if (source && source.dataset.src) {
                    source.src = source.dataset.src;
                    video.load();
                    source.removeAttribute('data-src');
                }
                videoObserver.unobserve(video);
            }
        });
    }, {
        rootMargin: '100px',
        threshold: 0.1
    });

    document.querySelectorAll('video[data-lazy]').forEach(video => {
        videoObserver.observe(video);
    });
}

// Accessibility improvements
function initAccessibility() {
    // Add keyboard navigation for all interactive elements
    document.querySelectorAll('a, button, video').forEach(element => {
        element.addEventListener('keydown', (e) => {
            if (e.code === 'Enter' || e.code === 'Space') {
                e.preventDefault();
                element.click();
            }
        });
    });

    // Add focus indicators
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });

    // Add skip link functionality
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
        skipLink.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector('#main-content');
            if (target) {
                target.focus();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

// Performance optimizations
function initPerformanceOptimizations() {
    // Preload critical resources
    const criticalImages = [
        'IMG_20240417_163007.jpg'
    ];

    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.skill-category, .project, .experience-item, .certification-item, .contact-item').forEach(el => {
        animationObserver.observe(el);
    });

    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
            // Handle scroll-based optimizations
        }, 100);
    });

    // Service Worker registration for offline support
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('SW registered: ', registration);
                })
                .catch(registrationError => {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Analytics tracking (if needed)
function trackEvent(eventName, eventData = {}) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
}

// Export functions for global access if needed
window.PortfolioUtils = {
    trackEvent,
    debounce
}; 