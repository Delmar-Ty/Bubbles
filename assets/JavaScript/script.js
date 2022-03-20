let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

window.addEventListener('resize', function() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
});

let randRan = (min, max) => {
    return Math.random() * (max - min) + min;
}

const colors = [
    '#C724B1',
    '#4D4DFF',
    '#E0E722',
    '#FFAD00',
    '#D22730',
    '#DB3EB1',
    '#44D62C'
];

let bubbles = [];

let howMany = Math.floor(prompt('How Many Bubbles Do You Want (A number only because otherwise it might not work)'));

function init() {
    for (let i = 0; i < howMany; i++) {
        let r = randRan(10, 40);
        let x = randRan(r, canvas.width - r);
        let y = randRan(r, canvas.height - r);
        let xv = randRan(-0.5, 0.5);
        let yv = randRan(-0.5, 0.5);
        bubbles[i] = new Bubble(x, y, xv, yv, r, randRan(1, 10), i);
    }
    console.log(bubbles);
}

function spawn(id) {
    let r = randRan(10, 40);
    let x = randRan(r, canvas.width - r);
    let y = randRan(r, canvas.height - r);
    let xv = randRan(-0.5, 0.5);
    let yv = randRan(-0.5, 0.5);
    bubbles[id] = new Bubble(x, y, xv, yv, r, randRan(1, 10), id);
}

init();

// let bubble1 = new Bubble(canvas.width / 2, canvas.height / 2, randRan(-3, 3), randRan(-3, 3), randRan(10, 40), 5);

function Bubble(x, y, xv, yv, r, dura, index) {
    this.x = x;
    this.y = y;
    this.xv = xv;
    this.yv = yv;
    this.r = r;
    this.color = colors[Math.floor(randRan(0, colors.length))];
    this.currentColor = this.color;
    this.dura = dura;
    this.opacity = 1;
    this.index = index;
    this.draw = function() {
        ctx.beginPath();
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.strokeStyle = 'white'
        ctx.lineWidth = 3;
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        ctx.stroke();
        ctx.fill();
        ctx.restore();
        ctx.closePath();
    }
    this.update = function() {
        if (this.dura <= 0) {
            if (this.opacity > 0.01) {
                this.opacity = Math.fround(this.opacity - 0.02);
                this.r += 0.5;
            } else {
                this.opacity = 0;
                spawn(this.index);
            }
        } else {
        if (this.x + this.r >= canvas.width || this.x - r <= 0) {
            this.xv *= -1;
            while (this.color === this.currentColor) {
                this.color = colors[Math.floor(randRan(0, colors.length))];
            }
            this.currentColor = this.color;
            this.dura -= 1;
        } else if (this.y + r >= canvas.height || this.y - r <= 0) {
            this.yv *= -1;
            while (this.color === this.currentColor) {
                this.color = colors[Math.floor(randRan(0, colors.length))];
            }
            this.currentColor = this.color;
            this.dura -= 1;
        }
        this.x += this.xv;
        this.y += this.yv;
    }
        this.draw();
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < bubbles.length; i++) {
        bubbles[i].update();
    }
    requestAnimationFrame(animate);
}

animate();