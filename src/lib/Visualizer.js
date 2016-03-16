export default class {
  constructor(actx) {
    this.ctx = actx;
  }

  getColor() {
    let r = 255 * Math.random() | 0,
        g = 255 * Math.random() | 0,
        b = 255 * Math.random() | 0;
    return [r, g, b];
  }

  getGradient(x, y, radius, alpha) {
    let g = this.ctx.createRadialGradient(x, y, 0, x, y, radius),
        color = `${this.getColor().join(',')}`;
    g.addColorStop(0, `rgba(${color}, ${alpha})`);
    g.addColorStop(0.5, `rgba(${color}, ${alpha * 0.2})`);
    g.addColorStop(1, `rgba(${color}, 0`);
    return g;
  }

  renderArc(x, y, radius, alpha) {
    radius = radius * Math.random() + 5 | 0;
    this.ctx.beginPath();
    this.ctx.fillStyle = this.getGradient(x, y, radius, alpha);
    this.ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    this.ctx.fill();
  }

  renderBackground(x, y, width, height) {
    this.ctx.globalCompositeOperation = 'source-over';
    this.ctx.fillStyle = 'rgb(0, 0, 0)';
    this.ctx.fillRect(0, 0, width, height);
    this.ctx.globalCompositeOperation = 'lighter';
  }
}
