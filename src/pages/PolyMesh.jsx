import p5 from 'p5'
import React from 'react'
import styled from 'styled-components'


export default class PolyMesh extends React.Component {

    constructor(props) {
        super(props)
        this.polyRef = React.createRef()
    }

    componentDidMount() {
        if (!this.sketch) this.sketch = new p5(this.Sketch, this.polyRef.current)
    }

    componentWillUnmount() {
        this.sketch.remove()
    }

    Sketch = p => {
        let vertices = []
        let triangles = []
        let gridSize = 10
        let maxDisplacement = 50

        p.setup = () => {
            p.createCanvas(window.innerWidth, window.innerHeight)
            vertices = createVertices()
            triangles = createTriangles()
            p.frameRate(100)
        }

        p.draw = () => {
            p.background(220)
            const mouseVector = p.createVector(p.mouseX, p.mouseY)
            maxDisplacement = p.mouseIsPressed ? 200 : 50

            vertices.forEach((v) => {
                v.repulse(mouseVector, maxDisplacement)
                v.returnHome()
            })

            triangles.forEach((triangle) => {
                triangle.display(this.props.theme.mode)
            })
        }

        function createVertices() {
            const vertices = []
            const cellWidth = p.width / gridSize
            const cellHeight = p.height / gridSize

            for (let i = 0; i <= gridSize; i++) {
                for (let j = 0; j <= gridSize; j++) {
                    // random noise
                    let shakeX = p.random(-cellWidth / 4, cellWidth / 4)
                    let shakeY = p.random(-cellWidth / 4, cellWidth / 4)

                    // don't make the edge vertics go outside the canvas
                    if (j === 0) shakeY = -Math.abs(shakeY)
                    if (j === gridSize) shakeY = Math.abs(shakeY)
                    if (i === 0) shakeX = -Math.abs(shakeY)
                    if (i === gridSize) shakeX = Math.abs(shakeY)
                    const home = p.createVector(i * cellWidth + shakeX, j * cellHeight + shakeY)
                    vertices.push(new Vertex(p, home))
                }
            }

            return vertices
        }

        function createTriangles() {
            const rectangles = []
            for (let i = 0; i < gridSize; i++) {
                for (let j = 0; j < gridSize; j++) {
                    rectangles.push(new Rectangle(
                        p,
                        vertices[i * (gridSize + 1) + j],
                        vertices[(i + 1) * (gridSize + 1) + j],
                        vertices[(i + 1) * (gridSize + 1) + j + 1],
                        vertices[i * (gridSize + 1) + j + 1]
                    ))
                }
            }
            return rectangles
        }

    }

    render() {
        return (
            <>
                {/* <Toaster /> */}
                <SketchContainer id='sketch-container'>
                    <div ref={this.polyRef} />
                </SketchContainer>
            </>
        )
    }
}



class Vertex {
    constructor(p, home) {
        this.p = p
        this.home = home
        this.position = home.copy()
    }

    repulse(mouseVector, maxDisplacement) {
        const displacement = p5.Vector.sub(this.position, mouseVector)
        const distance = displacement.mag()
        displacement.normalize()
        if (distance < 0.01) return
        displacement.mult(maxDisplacement / distance)
        this.position.add(displacement)
    }

    returnHome() {
        const displacement = p5.Vector.sub(this.home, this.position)
        displacement.mult(0.05) // Damping factor
        this.position.add(displacement)
    }
}



class Rectangle {
    constructor(p, v1, v2, v3, v4) {
        this.p = p
        this.vertices = [v1, v2, v3, v4]
        this.randomIntensity = p.random(15, 50)
        this.fadeCounter = 0
    }

    display(mode) {
        // start out at full white/black then slowly fade the color until its at its designated brightness
        this.fadeCounter++

        let { randomIntensity: r, p } = this
        r = Math.min(this.fadeCounter, r)
        if (mode === 'light') {
            r = 255-r
        }
        p.fill(r, r, r)
        p.stroke(r, r, r)
        p.beginShape()
        this.vertices.forEach((v) => {
            p.vertex(v.position.x, v.position.y)
        })
        p.endShape(p.CLOSE)
    }
}


const SketchContainer = styled.div`
    width: 100vw;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0
`
