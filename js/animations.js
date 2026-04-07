// Space Theme - Starfield Animation Only
class SpaceAnimations {
    constructor() {
        this.init();
    }
    
    init() {
        this.createStarfield();
    }
    
    createStarfield() {
        const starfield = document.getElementById('starfield');
        if (!starfield) return;
        
        const starCount = 150;
        
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            
            // Random position
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            
            // Random size (mostly small, some larger)
            const size = Math.random() > 0.9 ? 3 : (Math.random() > 0.7 ? 2 : 1);
            
            // Random opacity
            const opacity = Math.random() * 0.5 + 0.3;
            
            star.style.cssText = `
                left: ${x}%;
                top: ${y}%;
                width: ${size}px;
                height: ${size}px;
                opacity: ${opacity};
                animation: twinkle ${Math.random() * 3 + 2}s ease-in-out infinite;
                animation-delay: ${Math.random() * 3}s;
            `;
            
            starfield.appendChild(star);
        }
        
        // Add twinkle animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes twinkle {
                0%, 100% { opacity: 0.3; }
                50% { opacity: 0.8; }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SpaceAnimations();
});
