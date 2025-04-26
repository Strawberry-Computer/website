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
    
    // Type animation for screen content
    typeAnimation();
    
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

function typeAnimation() {
    const screenContent = document.querySelector('.screen-content');
    
    // Create a terminal-like element
    const terminal = document.createElement('div');
    terminal.className = 'terminal';
    terminal.style.cssText = `
        position: absolute;
        top: 10px;
        left: 10px;
        color: #0f0;
        font-family: monospace;
        font-size: 12px;
        width: calc(100% - 20px);
        height: calc(100% - 20px);
        overflow: hidden;
    `;
    
    screenContent.appendChild(terminal);
    
    /* @tweakable terminal text content */
    const lines = [
        'Initializing Strawberry OS...',
        'Loading AI Core...',
        'Integrating personal preferences...',
        'Customizing interface...',
        'Optimizing for user experience...',
        'System ready.',
        '> Strawberry Computer activated.',
        '> Your personal AI companion is ready.',
        '> How can I help you today?'
    ];
    
    /* @tweakable typing speed (milliseconds) */
    const typingSpeed = { min: 50, max: 100 };
    
    /* @tweakable pause between lines (milliseconds) */
    const linePause = 500;
    
    /* @tweakable pause before restarting animation (milliseconds) */
    const restartDelay = 5000;
    
    let lineIndex = 0;
    let charIndex = 0;
    
    function type() {
        if (lineIndex < lines.length) {
            // If starting a new line
            if (charIndex === 0) {
                const lineElement = document.createElement('div');
                lineElement.className = 'line';
                terminal.appendChild(lineElement);
            }
            
            const currentLine = terminal.querySelector('.line:last-child');
            const currentText = lines[lineIndex].substring(0, charIndex + 1);
            currentLine.textContent = currentText;
            
            charIndex++;
            
            // If line is complete
            if (charIndex === lines[lineIndex].length + 1) {
                lineIndex++;
                charIndex = 0;
                setTimeout(type, linePause); // Pause before next line
            } else {
                setTimeout(type, typingSpeed.min + Math.random() * (typingSpeed.max - typingSpeed.min)); // Random typing speed
            }
        } else {
            // Restart animation after a pause
            setTimeout(() => {
                terminal.innerHTML = '';
                lineIndex = 0;
                charIndex = 0;
                type();
            }, restartDelay);
        }
    }
    
    // Start typing animation
    type();
}