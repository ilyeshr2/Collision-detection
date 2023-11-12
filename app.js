const canvas = document.getElementById("myCanvas") 
const ctx = canvas.getContext("2d") 

function ellipse(x, y, r) {
    ctx.beginPath() 
    ctx.arc(x, y, r, 0, 2 * Math.PI) 
    ctx.stroke() 
}

function randomR(a, b) {
    const randomDecimal = Math.random() 
    const randomNumber = a + randomDecimal * (b - a) 
    return randomNumber 
}

function randomN(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min 
}


let dt=1/60 //delta t

class Bubble {
    //x hiya position x
    //y hiya position y
    //vx hiya velocity f x
    //vy hiya velocity f y
    //ax hiya accélération f x
    //ay hiya accélération fy
    //r houwa radius
    constructor(x, y, vx, vy, ax, ay, r) {
        this.x = x 
        this.y = y 
        this.vx = vx 
        this.vy = vy 
        this.ax= ax 
        this.ay= ay 
        this.r = r 
    }

    show() {
        ellipse(this.x, this.y, this.r) 
    }

    move() {
        this.handleBoxCollision() 
        if(this.vx>=0 || this.vy>=0){
            this.x = this.x + (this.vx + this.ax* dt) 
            this.y = this.y + (this.vy+ this.ay* dt) 
        }
        if(this.vx>=0 || this.vy<=0){
            this.x = this.x + (this.vx + this.ax* dt) 
            this.y = this.y + (this.vy - this.ay* dt) 
        }
        if(this.vx<=0 || this.vy>=0){
            this.x = this.x + (this.vx - this.ax* dt) 
            this.y = this.y + (this.vy + this.ay* dt) 
        }
        if(this.vx<=0 || this.vy<=0){
            this.x = this.x + (this.vx - this.ax* dt) 
            this.y = this.y + (this.vy - this.ay* dt) 
        }
        
    }
    handleBoxCollision(){
        //if (the left pixle of the arc <= the left pixle of the canvas or
        //the right pixle of the arc >= the right pixle of the canvas):
        //vx=-vx
        if (this.x - this.r <= 0 || this.x + this.r >= canvas.width) {
            this.vx = -this.vx
        }
        //if (the bottom pixle of the arc <= the bottom pixle of the canvas or
        //the top pixle of the arc >= the top pixle of the canvas):
        //vy=-vy
        if (this.y - this.r <= 0 || this.y + this.r >= canvas.height) {
            this.vy = -this.vy
        }
    }
}

let bubbles = [] 

function generateBubbles(numBubbles) {
    for (let i = 0 ; i < numBubbles ; i++) {
        let x=randomR(0, canvas.width)
        let y=randomR(0, canvas.height)
        let vx=randomR(-0.5,0.5) //bedlah l (-0.1,0.1) for a slower animation
        let vy=randomR(-0.5,0.5) //bedlah l (-0.1,0.1) for a slower animation
        let ax=randomN(5,20)
        let ay=randomN(5,20)
        let r=randomN(5,20)
        let bubble = new Bubble(x, y, vx, vy,ax,ay, r) 
        bubbles.push(bubble) 
    }
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height) 
    for (let i = 0 ; i < bubbles.length ; i++) {
        bubbles[i].show() 
        bubbles[i].move() 
    }
    requestAnimationFrame(draw) 
}

generateBubbles(100) 
draw()


/*
function random(a, b) {
    const randomDecimal = Math.random() 
    const randomNumber = a + randomDecimal * (b - a) 
    return randomNumber 
}
x=random(-1,1)
//example x est 0.87
y=myFunction(x,4)
//y=4.87
//example2 x est -0.21
y=myFunction(x,8)
//y=-8.21
*/