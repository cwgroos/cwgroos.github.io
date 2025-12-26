// ============================================
// INITIALIZE LUCIDE ICONS
// ============================================
lucide.createIcons();

// ============================================
// THEME TOGGLE
// ============================================
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
    const theme = html.getAttribute('data-theme');
    const newTheme = theme === 'light' ? 'dark' : 'light';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// ============================================
// MOBILE MENU TOGGLE
// ============================================
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.querySelector('.nav-links');

mobileMenuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');

    // Animate hamburger menu
    const spans = mobileMenuToggle.querySelectorAll('span');
    spans[0].style.transform = navLinks.classList.contains('active')
        ? 'rotate(-45deg) translate(-5px, 6px)'
        : 'none';
    spans[1].style.opacity = navLinks.classList.contains('active') ? '0' : '1';
    spans[2].style.transform = navLinks.classList.contains('active')
        ? 'rotate(45deg) translate(-5px, -6px)'
        : 'none';
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');

        // Reset hamburger menu
        const spans = mobileMenuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// ============================================
// SMOOTH SCROLLING & ACTIVE NAV LINK
// ============================================
const sections = document.querySelectorAll('.section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// ============================================
// DYNAMIC HEADER LOGO ON SCROLL
// ============================================
const navbar = document.querySelector('.navbar');
const logo = document.querySelector('.logo');
const heroTitle = document.querySelector('.hero-title');

window.addEventListener('scroll', () => {
    const heroTitleRect = heroTitle.getBoundingClientRect();
    const navbarHeight = navbar.offsetHeight;

    // Show logo when hero title scrolls off screen (goes above navbar)
    if (heroTitleRect.bottom < navbarHeight) {
        logo.textContent = 'Christopher Gross';
        logo.classList.add('visible');
    } else {
        logo.classList.remove('visible');
        // Small delay before clearing text to allow fade out
        setTimeout(() => {
            if (!logo.classList.contains('visible')) {
                logo.textContent = '';
            }
        }, 300);
    }
});

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.skill-category, .project-card, .timeline-item, .stat').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Typing effect removed - subtitle now appears immediately

// ============================================
// COUNTER ANIMATION FOR STATS
// ============================================
const animateCounter = (element, target, duration = 2000) => {
    let current = 0;
    const increment = target / (duration / 16); // 60fps

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.ceil(current) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    };

    updateCounter();
};

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const number = entry.target.textContent.replace('+', '');
            if (!isNaN(number) && number !== 'X' && number !== 'XX' && number !== 'XXX') {
                animateCounter(entry.target, parseInt(number));
            }
            entry.target.classList.add('animated');
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(stat => {
    statsObserver.observe(stat);
});

// ============================================
// CONSOLE EASTER EGG
// ============================================
console.log('%cHey there! 👋', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%cLooking to connect? Check out my contact info on the page!', 'color: #764ba2; font-size: 14px;');
