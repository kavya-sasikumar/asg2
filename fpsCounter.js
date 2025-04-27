class FPSCounter {
    constructor(canvas = document.getElementById('fpsCanvas')) {
      this.canvas = canvas;
      this.lastTime = performance.now();
      this.frameCount = 0;
      this.fps = 0;
    }
  
    start() {
      this.lastTime = performance.now();
      this.frameCount = 0;
    }
  
    update() {
      this.frameCount++;
      const now = performance.now();
      const elapsed = now - this.lastTime;
      if (elapsed >= 1000) {
        this.fps = this.frameCount;
        this.frameCount = 0;
        this.lastTime = now;
      }
    }
  
    render() {
      const ctx = this.canvas.getContext('2d');
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      ctx.font = '14px Arial';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.6)'; 
      ctx.textAlign = 'right';
      ctx.fillText(`FPS: ${this.fps}`, this.canvas.width - 10, this.canvas.height - 10);
    }
  }
  