const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const xCor = document.querySelector('.x');
const yCor = document.querySelector('.y');
const vxCor = document.querySelector('.vx');
const vyCor = document.querySelector('.vy');
const b1 = document.querySelector('.b1');
const b2 = document.querySelector('.b2');

let colors = ['#35d9c4', '#7b3dfe', '#b9b2ff'];
let colors2 = ['#FF7F00', '#FFC0CB', '#00FFFF'];

function ellipse(x, y, r, color) {
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
}

function line(x) {
    ctx.strokeStyle = colors;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 500);
    ctx.stroke();
}

function randomR(a, b) {
    const randomDecimal = Math.random();
    const randomNumber = a + randomDecimal * (b - a);
    return randomNumber;
}

function randomN(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let dt = 1 / 120;
let c = 0;
let bubblesNumber = 2;

class Bubble {
    constructor(x, y, vx, vy, ax, ay, r, color) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.ax = ax;
        this.ay = ay;
        this.r = r;
        this.color = color;
        this.bubblesInterval = [this.x - this.r, this.x + this.r];
    }

    show() {
        ellipse(this.x, this.y, this.r, this.color);
        //line(this.x - this.r);
        //line(this.x + this.r);
    }

    move() {
        this.handleBoxCollision();
        this.vx = this.vx + this.ax * dt;
        this.vy = this.vy + this.ay * dt;
        this.x = this.x + this.vx * dt;
        this.y = this.y + this.vy * dt;
        this.bubblesInterval = [this.x - this.r, this.x + this.r];
        this.handleParticlesCollision();
        xCor.innerText = 'x: ' + Math.round(this.x) + '. ';
        yCor.innerText = 'y: ' + Math.round(this.y);
        vxCor.innerText = 'vx: ' + this.vx.toFixed(2) + '. ';
        vyCor.innerText = 'vy: ' + this.vy.toFixed(2);
        //axCor.innerText = 'Intervale de la bulle: ' + Math.round(this.x - this.r);
    }

    handleBoxCollision() {
        if (this.x - this.r <= 0 || this.x + this.r >= canvas.width) {
            this.vx = -this.vx;
        }
        if (this.y - this.r <= 0 || this.y + this.r >= canvas.height) {
            this.vy = -this.vy;
        }
    }


    handleParticlesCollision() {
        for (const otherBubble of bubbles) {
            if (otherBubble !== this) {
                // Calculate the distance between the centers of the two bubbles
                const distanceX = this.x - otherBubble.x;
                const distanceY = this.y - otherBubble.y;
                const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

                // Check if the distance is less than the sum of their radii
                if (distance < this.r + otherBubble.r) {
                    console.log(`Collision between Bubble ${this.x} and Bubble ${otherBubble.x}`);

                    // Conservation of Momentum and Kinetic Energy
                    const totalMass = this.r + otherBubble.r;
                    const collisionNormalX = distanceX / distance;
                    const collisionNormalY = distanceY / distance;

                    // Relative velocity
                    const relativeVelocityX = this.vx - otherBubble.vx;
                    const relativeVelocityY = this.vy - otherBubble.vy;

                    // Calculate the impact parameter
                    const impactParameter = collisionNormalX * relativeVelocityX + collisionNormalY * relativeVelocityY;

                    // Calculate the impulse
                    const impulse = (2 * impactParameter) / totalMass;

                    // Update velocities using conservation of momentum
                    this.vx -= impulse * otherBubble.r;
                    this.vy -= impulse * otherBubble.r;
                    otherBubble.vx += impulse * this.r;
                    otherBubble.vy += impulse * this.r;

                    /* 
                     Update positions if needed:
                     this.x += this.vx * dt;
                     this.y += this.vy * dt;
                     otherBubble.x += otherBubble.vx * dt;
                     otherBubble.y += otherBubble.vy * dt;
                    */

                    b1.innerText = this.x.toFixed(4);
                    b2.innerText = otherBubble.x.toFixed(4);
                }
            }
        }
    }
}


let bubbles = [];
let bubblesAtX = [];
let activeInterval = [];

function generateBubbles(numBubbles) {
    for (let i = 0; i < numBubbles; i++) {
        let r = randomN(5, 30);
        let x = randomR(0 + r, canvas.width - r);
        let y = randomR(0 + r, canvas.height - r);
        let vx = randomR(-50, 50);
        let vy = randomR(-50, 50);
        let ax = randomN(-20, 20);
        let ay = randomN(-20, 20);
        let color = colors[randomN(0, 2)];
        let bubble = new Bubble(x, y, vx, vy, ax, ay, r, color);
        bubbles.push(bubble);
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < bubbles.length; i++) {
        bubbles[i].show();
        bubbles[i].move();
    }

    requestAnimationFrame(draw);
}

generateBubbles(bubblesNumber);
draw();
