let gridSize = 20;
let grid;
let snakes = [];

function setup() {
    createCanvas(500, 500);
    frameRate(10)

    // Create grid
    grid = [];
    for (let y = 0; y < height; y += gridSize) {
        let row = [];
        for (let x = 0; x < width; x += gridSize) {
            row.push(new Cell(x, y));
        }
        grid.push(row);
    }

    // Create snakes
    for (let i = 0; i < 10; i++) {
        let x = floor(random(width));
        let y = floor(random(height));
        snakes.push(new Snake(x, y));
    }
}

function draw() {
    background(0);

    // Display grid
    grid.forEach(row => {
        row.forEach(cell => {
            cell.show();
        });
    });

    // Move and display snakes
    snakes.forEach(snake => {
        snake.move();
        snake.show();
    });
}

class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    show() {
        fill(10);
        noStroke();
        ellipse(this.x + gridSize / 2, this.y + gridSize / 2, gridSize * 0.75);
    }
}

class Snake {
    constructor(x, y) {

        x = round(x / gridSize) * gridSize;
        y = round(y / gridSize) * gridSize;
        this.body = [];
        this.body.push(createVector(x, y));
        this.dir = floor(random(4));

        let len = random(3, 10);

        for (let i = 0; i < len; i++) {
            this.body.push(createVector(x, y));
        }
    }

    move() {
        let head = this.body[this.body.length - 1].copy();

        if (this.dir === 0) {
            head.y -= gridSize;
        } else if (this.dir == 1) {
            head.x += gridSize;
        } else if (this.dir == 2) {
            head.y += gridSize;
        } else {
            head.x -= gridSize;
        }

        // Wrap around edges
        if (head.x < 0) {
            head.x = width;
        }
        if (head.x >= width) {
            head.x = 0;
        }
        if (head.y < 0) {
            head.y = height;
        }
        if (head.y >= height) {
            head.y = 0;
        }

        this.body.shift();
        this.body.push(head);

        // Slow down snakes
        let change = floor(random(20));
        if (change === 0) {
            this.changeDir();
        }
    }

    changeDir() {
        let options = [];
        if (this.dir !== 0) {
            options.push(0);
        }
        if (this.dir !== 1) {
            options.push(1);
        }
        if (this.dir !== 2) {
            options.push(2);
        }
        if (this.dir !== 3) {
            options.push(3);
        }

        this.dir = random(options);
    }

    show() {

        for (let i = 0; i < this.body.length; i++) {

            let cell = this.body[i];

            fill(20);
            noStroke();
            ellipse(cell.x + gridSize / 2, cell.y + gridSize / 2, gridSize * 0.75);

        }

    }
}