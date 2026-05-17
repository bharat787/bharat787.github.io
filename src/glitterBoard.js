import gsap from 'gsap';

const AMOUNT = 24;
const SIZE = 96 / AMOUNT;

export class GlitterBoard {
  constructor(el) {
    this.EL = el;
    this.CANVAS = el.querySelector('canvas');
    if (!this.CANVAS) return;
    this.CONTEXT = this.CANVAS.getContext('2d');
    this.HUE = el.dataset?.hue;
    this.boundGlitter = null;
    this.onEnter = () => this.enable();
    this.onLeave = () => this.disable();
    this.init();
  }

  glitter() {
    this.CONTEXT.clearRect(0, 0, this.CANVAS.width, this.CANVAS.width);
    for (let i = 0; i < AMOUNT * AMOUNT; i++) {
      const x = (i % AMOUNT) * SIZE;
      const y = Math.floor(i / AMOUNT) * SIZE;
      this.CONTEXT.fillStyle =
        this.HUE !== undefined
          ? `hsl(${this.HUE} 80% ${gsap.utils.random(40, 90, 1)}%)`
          : `hsl(0 0% ${gsap.utils.random(20, 90, 1)}%)`;
      this.CONTEXT.fillRect(x, y, SIZE, SIZE);
    }
  }

  init() {
    this.CANVAS.width = this.CANVAS.height = this.CANVAS.offsetWidth;
    if (this.HUE !== undefined) {
      this.CONTEXT.fillStyle = `hsl(${this.HUE} 80% 50%)`;
    }
    this.boundGlitter = this.glitter.bind(this);
    this.EL.addEventListener('pointerenter', this.onEnter);
    this.EL.addEventListener('pointerleave', this.onLeave);
  }

  enable() {
    gsap.ticker.add(this.boundGlitter);
  }

  disable() {
    gsap.ticker.remove(this.boundGlitter);
  }

  destroy() {
    this.disable();
    this.EL.removeEventListener('pointerenter', this.onEnter);
    this.EL.removeEventListener('pointerleave', this.onLeave);
  }
}
