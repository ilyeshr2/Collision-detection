# Collision detection

This project creates a dynamic bubble animation using HTML5 Canvas and JavaScript. It generates bubbles of random sizes and colors that move within a confined space, bouncing off the edges of the canvas.


![CPT2409021518-1064x534](https://github.com/user-attachments/assets/a2aeb00d-5840-4c7e-a8f0-803fe6993467)

## Features

- **Bubbles**: Each bubble has a random position, size, color, velocity, and acceleration.
- **Collision Detection**: Bubbles bounce off the edges of the canvas when they collide with it.
- **Random Motion**: The bubbles move in random directions with random speeds, providing a lively and unpredictable animation.

## Setup

To run the project, simply open the `index.html` file in your web browser. The required HTML, CSS, and JavaScript files are already included in the repository.

## Code Overview

### JavaScript Overview

- **Variables**
  - `canvas`: The HTML Canvas element where the animation is drawn.
  - `ctx`: The 2D rendering context for the canvas.
  - `colors`: An array of color codes used for the bubbles.
  - `bubbles`: An array that stores all the bubble objects.

- **Functions**
  - `ellipse(x, y, r, color)`: Draws an ellipse (bubble) at the specified coordinates with the given radius and color.
  - `randomR(a, b)`: Generates a random floating-point number between `a` and `b`.
  - `randomN(min, max)`: Generates a random integer between `min` and `max`.
  - `generateBubbles(numBubbles)`: Creates the specified number of bubbles with random properties.
  - `draw()`: The main animation loop that clears the canvas, draws each bubble, and updates its position.

- **Class**
  - `Bubble`: Represents a bubble with properties for position, velocity, acceleration, radius, and color. It includes methods to display the bubble and update its position based on its velocity and acceleration.

### Key Concepts

- **Delta Time (`dt`)**: A constant representing the time step for the animation.
- **Collision Handling**: The `handleBoxCollision()` method ensures that bubbles bounce off the edges of the canvas by inverting their velocity when a collision is detected.

## Customization

- **Number of Bubbles**: Adjust the number of bubbles by changing the argument passed to `generateBubbles()` in the `draw()` function.
- **Bubble Speed**: Modify the range of velocities in the `generateBubbles()` function to speed up or slow down the animation.

## License

This project is open-source and available under the MIT License.
