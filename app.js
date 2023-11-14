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

function randomR(a, b) {
    const randomDecimal = Math.random();
    const randomNumber = a + randomDecimal * (b - a);
    return randomNumber;
}

function randomN(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let dt = 1 / 120;
let bubblesNumber = 5;

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
    }

    move() {
        
        this.vx = this.vx + this.ax * dt;
        this.vy = this.vy + this.ay * dt;
        this.x = this.x + this.vx * dt;
        this.y = this.y + this.vy * dt;
        this.bubblesInterval = [this.x - this.r, this.x + this.r];
        this.handleBoxCollision();
        this.handleParticlesCollision();
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
                    // Calculate the overlap distance
                    const overlap = (this.r + otherBubble.r) - distance;
                
                    // Calculate the direction from this bubble to the other bubble
                    const normalX = distanceX / distance;
                    const normalY = distanceY / distance;
                
                    // Move the bubbles apart
                    const moveScale = 0.5;
                    this.x -= overlap * normalX * moveScale;
                    this.y -= overlap * normalY * moveScale;
                    otherBubble.x += overlap * normalX * moveScale;
                    otherBubble.y += overlap * normalY * moveScale;
                
                    // Reflect velocities
                    const relativeVelocityX = otherBubble.vx - this.vx;
                    const relativeVelocityY = otherBubble.vy - this.vy;
                    const dotProduct = (relativeVelocityX * normalX) + (relativeVelocityY * normalY);
                
                    this.vx += 2 * dotProduct * normalX;
                    this.vy += 2 * dotProduct * normalY;
                    otherBubble.vx -= 2 * dotProduct * normalX;
                    otherBubble.vy -= 2 * dotProduct * normalY;
                
                    // Apply damping factor to reduce speed over time
                    const dampingFactor = 0.98; // Adjust this value as needed
                    this.vx *= dampingFactor;
                    this.vy *= dampingFactor;
                    otherBubble.vx *= dampingFactor;
                    otherBubble.vy *= dampingFactor;
                }
                
                
            }
        }
    }
}


let bubbles = [];


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
