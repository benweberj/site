import p5 from 'p5'
import React from 'react'
import styled from 'styled-components'
// import { motion } from 'framer-motion'
// import { Toaster, toast } from 'react-hot-toast'


let options = {
    // pullDistance: 300,
    // attractionForce: 2,
    // repelMultiplier: 3,
    // bounceDecay: .5,
    // keepInbounds: true,
    // nodesAttract: true,
    // repelOnPress: true,
    // drawConnections: true,
    // drawParticles: true,
    // attractedToMouse: true,
    // debug: false,
    // color: 'white',
    // goingHome: false,
}

export default class PolyMesh extends React.Component {

    constructor(props) {
        super(props)
        this.snakesRef = React.createRef()
        options.color = props.theme.complement

        this.state = {
            // showingInstructions: false,
            // ready: false,
            // used: false
        }

        // setTimeout(() => {
        //     this.setState({ ready: true, showingInstructions: true})
        // }, 100)
    }

    componentDidUpdate(prevProps) {
        if (this.props.theme != prevProps.theme) {
            options.color = this.props.theme.complement
        }
    }

    componentDidMount() {
        if (!this.sketch) this.sketch = new p5(this.Sketch, this.snakesRef.current)
    }

    componentWillUnmount() {
        this.sketch.remove()
    }

    Sketch = p => {
        let gridSize = 20;
        let grid;
        let snakes = [];
    
        p.setup = () => {
            p.createCanvas(window.innerWidth, window.innerHeight);
            p.frameRate(10)
    
            // Create grid
            grid = [];
            for (let y = 0; y < window.innerHeight; y += gridSize) {
                let row = [];
                for (let x = 0; x < window.innerWidth; x += gridSize) {
                    row.push(new Cell(p, gridSize, x, y));
                }
                grid.push(row);
            }
    
            // Create snakes
            for (let i = 0; i < 10; i++) {
                let x = p.floor(p.random(window.innerWidth));
                let y = p.floor(p.random(window.innerHeight));
                snakes.push(new Snake(p, gridSize, x, y));
            }
        }
    
        p.draw = () => {
            p.background(this.props.theme.mode === 'dark' ? 0 : 255);
    
            // Display grid
            grid.forEach(row => {
                row.forEach(cell => {
                    cell.show(this.props.theme.mode);
                });
            });
    
            // Move and display snakes
            snakes.forEach(snake => {
                snake.move();
                snake.show(this.props.theme.mode);
            });
        }
    }    

    render() {
        return (
            <>
                {/* <Toaster /> */}
                <SketchContainer id='sketch-container'>
                    <div ref={this.snakesRef} />
                </SketchContainer>
            </>
        )
    }
}


const SketchContainer = styled.div`
    width: 100vw;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0
`

class Cell {
    constructor(p, gridSize, x, y) {
        this.p = p
        this.gridSize = gridSize
        this.x = x;
        this.y = y;
    }

    show(mode) {
        const { p, gridSize } = this
        p.fill(mode === 'dark' ? 10 : 245);
        p.noStroke();
        p.ellipse(this.x + gridSize / 2, this.y + gridSize / 2, gridSize * 0.75);
    }
}

class Snake {
    constructor(p, gridSize, x, y) {
        this.p = p
        this.gridSize = gridSize
        x = p.round(x / gridSize) * gridSize;
        y = p.round(y / gridSize) * gridSize;
        this.body = [];
        this.body.push(p.createVector(x, y));
        this.dir = p.floor(p.random(4));

        let len = p.random(3, 10);

        for (let i = 0; i < len; i++) {
            this.body.push(p.createVector(x, y));
        }
    }

    move() {
        const { p, gridSize } = this
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
        if (head.x < 0)  head.x = window.innerWidth;
        if (head.x >= window.innerWidth)  head.x = 0;
        if (head.y < 0)  head.y = window.innerHeight;
        if (head.y >= window.innerHeight)  head.y = 0;

        this.body.shift();
        this.body.push(head);

        // Slow down snakes
        let change = p.floor(p.random(20));
        if (change === 0) this.changeDir();
    }

    changeDir() {
        let options = [];
        if (this.dir !== 0) options.push(0);
        if (this.dir !== 1) options.push(1);
        if (this.dir !== 2) options.push(2);
        if (this.dir !== 3) options.push(3);

        this.dir = this.p.random(options);
    }

    show(mode) {
        const { p, gridSize } = this
        for (let i = 0; i < this.body.length; i++) {
            let cell = this.body[i];

            p.fill(mode === 'dark' ? 20 : 235);
            p.noStroke();
            p.ellipse(cell.x + gridSize / 2, cell.y + gridSize / 2, gridSize * 0.75);
        }
    }
}