// Cursor glow effect (desktop only)
const cursorGlow = document.querySelector('.cursor-glow');

if (window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });
} else {
    cursorGlow.style.display = 'none';
}

// Create floating hearts
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.textContent = '♥';
    heart.style.position = 'absolute';
    heart.style.fontSize = Math.random() * 20 + 15 + 'px';
    heart.style.color = `rgba(255, 107, 157, ${Math.random() * 0.5 + 0.2})`;
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animation = `float ${Math.random() * 10 + 10}s linear`;
    heart.style.pointerEvents = 'none';
    
    document.querySelector('.hearts-bg').appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 20000);
}

// Generate hearts periodically
setInterval(createFloatingHeart, 2000);

// Mobile card flip on tap
const dayCards = document.querySelectorAll('.day-card');

if ('ontouchstart' in window) {
    dayCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.classList.contains('explore-btn')) {
                this.classList.toggle('flipped');
            }
        });
    });
}

// Navigation function
function navigateToDay(day) {
    window.location.href = `${day}.html`;
}

// Add sparkle effect to Valentine card
const valentineCard = document.querySelector('.valentine-special');
if (valentineCard) {
    setInterval(() => {
        const sparkle = document.createElement('span');
        sparkle.textContent = '✨';
        sparkle.style.position = 'absolute';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.fontSize = '1.5rem';
        sparkle.style.animation = 'sparkle 2s ease';
        sparkle.style.pointerEvents = 'none';
        
        valentineCard.querySelector('.card-front').appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 2000);
    }, 1500);
}

// Smooth scroll
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

// Prevent scroll issues on mobile
document.addEventListener('touchmove', function(e) {
    if (e.target.closest('.day-card')) {
        e.stopPropagation();
    }
}, { passive: true });

// Animation on scroll for cards
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

dayCards.forEach(card => {
    observer.observe(card);
});

console.log('💕 Made with love by Pabani for Sonakshi 💕');
