document.addEventListener("DOMContentLoaded", function() {
    // Animate the strawberry logo on scroll
    const strawberryLogo = document.getElementById('strawberry-logo');
    let lastScrollTop = 0;
    
    /* @tweakable rotation angle when scrolling down (in degrees) */
    const scrollDownRotation = 5;
    
    /* @tweakable rotation angle when scrolling up (in degrees) */
    const scrollUpRotation = -5;
    
    /* @tweakable rotation reset delay (in milliseconds) */
    const rotationResetDelay = 300;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        
        if (currentScroll > lastScrollTop) {
            // Scrolling down
            strawberryLogo.style.transform = `rotate(${scrollDownRotation}deg)`;
        } else {
            // Scrolling up
            strawberryLogo.style.transform = `rotate(${scrollUpRotation}deg)`;
        }
        
        setTimeout(() => {
            strawberryLogo.style.transform = 'rotate(0)';
        }, rotationResetDelay);
        
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    }, false);
    
    // App card interactions
    initializeAppCards();
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });
});

function initializeAppCards() {
    const appCards = document.querySelectorAll('.app-card');
    
    // App URLs mapping
    const appUrls = {
        'savespace': 'https://savespace.berrry.app',
        'moviesense': 'https://moviesense.berrry.app',
        'pizzaparty': 'https://pizzaparty.berrry.app',
        'icebreak': 'https://icebreak.berrry.app',
        'doodleboard': 'https://doodleboard.berrry.app'
    };
    
    appCards.forEach(card => {
        const appName = card.getAttribute('data-app');
        const url = appUrls[appName];
        
        if (url) {
            card.addEventListener('click', () => {
                window.open(url, '_blank');
            });
            
            // Add visual feedback
            card.style.cursor = 'pointer';
        }
        
        // Add subtle animation on load
        const delay = Array.from(appCards).indexOf(card) * 100;
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = card.style.transform || '';
        }, delay);
    });
    
    // Initialize cards as transparent for animation
    appCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transition = 'all 0.6s ease-out';
    });
}