// Quote carousel functionality
let currentQuote = 0;
const quotes = document.querySelectorAll('.quote');
const dots = document.querySelectorAll('.dot');

function showQuote(index) {
    quotes.forEach((quote, i) => {
        quote.classList.remove('active');
        dots[i].classList.remove('active');
    });
    
    quotes[index].classList.add('active');
    dots[index].classList.add('active');
}

function nextQuote() {
    currentQuote = (currentQuote + 1) % quotes.length;
    showQuote(currentQuote);
}

// Auto-advance quotes every 5 seconds
let quoteInterval = setInterval(nextQuote, 5000);

// Manual dot navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentQuote = index;
        showQuote(currentQuote);
        
        // Reset auto-advance timer
        clearInterval(quoteInterval);
        quoteInterval = setInterval(nextQuote, 5000);
    });
});

// Touch swipe support for quotes
let touchStartX = 0;
let touchEndX = 0;

const quoteCarousel = document.querySelector('.quote-carousel');

quoteCarousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

quoteCarousel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        clearInterval(quoteInterval);
        
        if (diff > 0) {
            // Swipe left - next quote
            currentQuote = (currentQuote + 1) % quotes.length;
        } else {
            // Swipe right - previous quote
            currentQuote = (currentQuote - 1 + quotes.length) % quotes.length;
        }
        
        showQuote(currentQuote);
        quoteInterval = setInterval(nextQuote, 5000);
    }
}

// Smooth scroll
window.addEventListener('load', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Add parallax effect on scroll (desktop only)
if (window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.day-header, .message-card');
        
        parallaxElements.forEach((el, index) => {
            const speed = 0.1 + (index * 0.05);
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

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

// Observe all animated elements
document.querySelectorAll('.message-card, .quote-section, .interactive-rose').forEach(el => {
    observer.observe(el);
});

console.log('💕 Every moment with you is precious, Sonakshi 💕');
