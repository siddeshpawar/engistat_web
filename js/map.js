// Maharashtra Pixel Map - Matching Reference Style
class MaharashtraMap {
    constructor() {
        this.canvas = document.getElementById('maharashtraMap');
        this.ctx = this.canvas.getContext('2d');
        
        // Set canvas size
        this.canvas.width = 600;
        this.canvas.height = 500;
        
        // Small pixel size for dense grid
        this.pixelSize = 8;
        this.gap = 2; // Gap between pixels
        
        // Grid dimensions
        this.cols = Math.floor(this.canvas.width / (this.pixelSize + this.gap));
        this.rows = Math.floor(this.canvas.height / (this.pixelSize + this.gap));
        
        this.animationFrame = 0;
        this.init();
    }
    
    init() {
        this.drawMap();
        this.animate();
    }
    
    // Maharashtra shape mask - improved shape
    isMaharashtraPixel(col, row) {
        const x = col / this.cols;
        const y = row / this.rows;
        
        // Define Maharashtra shape with bezier-like curves
        // Based on actual Maharashtra geography
        
        // Western coastline (jagged, irregular)
        const westCoast = 0.12 + Math.sin(y * 15) * 0.04 + Math.cos(y * 8) * 0.03 + (y * 0.08);
        
        // Eastern boundary (smoother, curves inward at middle)
        let eastBound = 0.88;
        if (y > 0.3 && y < 0.6) {
            eastBound = 0.88 - (Math.sin((y - 0.3) * Math.PI / 0.3) * 0.06);
        }
        
        // Northern boundary (slight curve)
        const northBound = 0.10 + (x * 0.04) + Math.sin(x * 6) * 0.02;
        
        // Southern boundary (tapers to a point on right side)
        let southBound = 0.85;
        if (x > 0.65) {
            southBound = 0.85 - ((x - 0.65) * 0.6);
        } else if (x < 0.25) {
            southBound = 0.85 - ((0.25 - x) * 0.4);
        }
        
        // Check if within bounds
        if (x < westCoast || x > eastBound || y < northBound || y > southBound) {
            return false;
        }
        
        // Add coastal irregularities
        if (x - westCoast < 0.06) {
            if (Math.random() > 0.8) return false;
        }
        
        // Mumbai region - west coast, upper middle area
        const mumbaiLeft = 0.13;
        const mumbaiRight = 0.21;
        const mumbaiTop = 0.32;
        const mumbaiBottom = 0.42;
        
        if (x > mumbaiLeft && x < mumbaiRight && y > mumbaiTop && y < mumbaiBottom) {
            return 'mumbai';
        }
        
        return 'maharashtra';
    }
    
    drawMap() {
        // Clear canvas
        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw pixel grid
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const type = this.isMaharashtraPixel(col, row);
                
                if (type) {
                    const x = col * (this.pixelSize + this.gap);
                    const y = row * (this.pixelSize + this.gap);
                    
                    // Base color
                    let color = '#ffffff';
                    let alpha = 1;
                    
                    if (type === 'mumbai') {
                        color = '#ff0000';
                        // Add pulse effect to Mumbai
                        const pulse = Math.sin(this.animationFrame * 0.05) * 0.3 + 0.7;
                        alpha = pulse;
                    }
                    
                    // Draw pixel with rounded corners
                    this.ctx.fillStyle = color;
                    this.ctx.globalAlpha = alpha;
                    this.roundRect(x, y, this.pixelSize, this.pixelSize, 1);
                    this.ctx.globalAlpha = 1;
                    
                    // Add glow effect for Mumbai pixels
                    if (type === 'mumbai') {
                        this.ctx.shadowColor = '#ff0000';
                        this.ctx.shadowBlur = 8;
                        this.ctx.fillStyle = '#ff0000';
                        this.roundRect(x, y, this.pixelSize, this.pixelSize, 1);
                        this.ctx.shadowBlur = 0;
                    }
                }
            }
        }
        
        // Add Mumbai label
        const mumbaiCol = Math.floor(this.cols * 0.17);
        const mumbaiRow = Math.floor(this.rows * 0.42);
        const labelX = mumbaiCol * (this.pixelSize + this.gap);
        const labelY = mumbaiRow * (this.pixelSize + this.gap) - 20;
        
        this.ctx.fillStyle = '#ff0000';
        this.ctx.font = 'bold 12px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('MUMBAI', labelX, labelY);
        
        // Draw connecting line from label to Mumbai
        this.ctx.strokeStyle = '#ff0000';
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.moveTo(labelX, labelY + 5);
        this.ctx.lineTo(labelX, mumbaiRow * (this.pixelSize + this.gap) - 5);
        this.ctx.stroke();
    }
    
    // Draw rounded rectangle
    roundRect(x, y, width, height, radius) {
        this.ctx.beginPath();
        this.ctx.moveTo(x + radius, y);
        this.ctx.lineTo(x + width - radius, y);
        this.ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        this.ctx.lineTo(x + width, y + height - radius);
        this.ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        this.ctx.lineTo(x + radius, y + height);
        this.ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        this.ctx.lineTo(x, y + radius);
        this.ctx.quadraticCurveTo(x, y, x + radius, y);
        this.ctx.closePath();
        this.ctx.fill();
    }
    
    animate() {
        this.animationFrame++;
        
        // Redraw every few frames to save performance but still animate
        if (this.animationFrame % 3 === 0) {
            this.drawMap();
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize map when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MaharashtraMap();
});
