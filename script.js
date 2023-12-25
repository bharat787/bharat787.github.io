import { GUI } from 'https://cdn.skypack.dev/dat.gui';
import gsap from 'https://cdn.skypack.dev/gsap@3.11.0';
const CANVAS = document.querySelector('canvas');
const CONTEXT = CANVAS.getContext('2d');

gsap.ticker.fps(12);



const AMOUNT = 24;
const SIZE = 96 / AMOUNT;

console.clear();

class GlitterBoard {
    constructor(el) {
        var _el$dataset;
        this.EL = el;
        this.CANVAS = el.querySelector('canvas');
        this.CONTEXT = this.CANVAS.getContext('2d');
        this.HUE = (_el$dataset = el.dataset) === null || _el$dataset === void 0 ? void 0 : _el$dataset.hue;
        this.init();
        return this;
    }
    glitter() {
        const that = this;
        that.CONTEXT.clearRect(0, 0, that.CANVAS.width, that.CANVAS.width);
        for (let i = 0; i < Math.pow(AMOUNT, 2); i++) {
            let x = i % AMOUNT * SIZE;
            let y = Math.floor(i / AMOUNT) * SIZE;
            that.CONTEXT.fillStyle = that.HUE !== undefined ? `hsl(${that.HUE} 80% ${gsap.utils.random(40, 90, 1)}%)` : `hsl(0 0% ${gsap.utils.random(20, 90, 1)}%)`;
            that.CONTEXT.fillRect(x, y, SIZE, SIZE);
        }
    }
    init() {
        const that = this;
        that.CANVAS.width = that.CANVAS.height = that.CANVAS.offsetWidth;
        that.CONTEXT.fillStyle = `hsl(${that.HUE} 80% 50%)`;
        that.boundGlitter = that.glitter.bind(that);
        that.EL.addEventListener('pointerenter', that.enable.bind(that));
        that.EL.addEventListener('pointerleave', that.disable.bind(that));
    }
    enable() {
        const that = this;
        gsap.ticker.add(that.boundGlitter);
    }
    disable() {
        const that = this;
        gsap.ticker.remove(that.boundGlitter);
    }
}


const BOARDS = [];

const ICONS = document.querySelector('.icons');

document.querySelectorAll('.icon').forEach(Icon => BOARDS.push(new GlitterBoard(Icon)));