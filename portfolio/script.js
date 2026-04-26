// ============ PARTICLES GENERATOR ============
const particlesContainer = document.getElementById('particles');
const particleColors = ['#6c5ce7', '#a29bfe', '#00cec9', '#81ecec', '#fd79a8', '#ffffff'];

function createParticle() {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    const size = Math.random() * 5 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.backgroundColor = particleColors[Math.floor(Math.random() * particleColors.length)];
    particle.style.animationDuration = Math.random() * 12 + 8 + 's';
    particle.style.animationDelay = Math.random() * 10 + 's';
    particle.style.boxShadow = `0 0 ${size * 3}px ${particle.style.backgroundColor}`;
    particlesContainer.appendChild(particle);

    setTimeout(() => {
        if (particle.parentNode) particle.remove();
    }, 20000);
}

// Create initial particles
for (let i = 0; i < 40; i++) {
    setTimeout(createParticle, Math.random() * 5000);
}
// Keep creating particles
setInterval(createParticle, 600);

// ============ TYPING ANIMATION ============
const typingText = document.getElementById('typingText');
const phrases = [
    'Full-Stack Developer',
    'UI/UX Enthusiast',
    'Open Source Contributor',
    'Problem Solver',
    'Creative Coder',
    'Tech Innovator'
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeLoop() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 40;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 400;
    }

    setTimeout(typeLoop, typingSpeed);
}

typeLoop();

// ============ SCROLL ANIMATIONS (Intersection Observer) ============
const animateElements = document.querySelectorAll('[data-animate]');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // For skill cards and project cards, we already handle with CSS class visible
        }
    });
}, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });

animateElements.forEach(el => observer.observe(el));

// ============ ACTIVE NAV LINK HIGHLIGHT ON SCROLL ============
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    // If hero is in view, remove active from all (or set to home)
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
    // Handle the case when at the very top (home)
    if (window.scrollY < 300) {
        navLinks.forEach(link => link.classList.remove('active'));
    }
});

// ============ COUNT UP ANIMATION FOR STATS ============
const statNumbers = document.querySelectorAll('.stat-number');

function animateStats() {
    statNumbers.forEach(stat => {
        const target = +stat.getAttribute('data-count');
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        function update() {
            current += step;
            if (current < target) {
                stat.textContent = Math.floor(current);
                requestAnimationFrame(update);
            } else {
                stat.textContent = target;
            }
        }
        // Only animate if not already animated (or reset)
        if (parseInt(stat.textContent) === 0) {
            update();
        }
    });
}

// Observe the about section for counting up
const aboutSection = document.getElementById('about');
const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            aboutObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

if (aboutSection) {
    aboutObserver.observe(aboutSection);
}