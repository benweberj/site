let vertices = []
let triangles = []
let gridSize = 10
let maxDisplacement = 50

function setup() {
  createCanvas(windowWidth, windowHeight)
  vertices = createVertices()
  triangles = createTriangles()
  frameRate(100)
}

function draw() {
  background(220)
  const mouseVector = createVector(mouseX, mouseY)
  maxDisplacement = mouseIsPressed ? 200 : 50

  vertices.forEach((v) => {
    v.repulse(mouseVector, maxDisplacement)
    v.returnHome()
  })

  triangles.forEach((triangle) => {
    triangle.display()
  })
}

function createVertices() {
  const vertices = []
  const cellWidth = width / gridSize
  const cellHeight = height / gridSize

  for (let i = 0; i <= gridSize; i++) {
    for (let j = 0; j <= gridSize; j++) {
      // random noise
      let shakeX = random(-cellWidth / 4, cellWidth / 4)
      let shakeY = random(-cellWidth / 4, cellWidth / 4)

      // don't make the edge vertics go outside the canvas
      if (j === 0) shakeY = -Math.abs(shakeY)
      if (j === gridSize) shakeY = Math.abs(shakeY)
      if (i === 0) shakeX = -Math.abs(shakeY)
      if (i === gridSize) shakeX = Math.abs(shakeY)
      const home = createVector(i * cellWidth + shakeX, j * cellHeight + shakeY)
      vertices.push(new Vertex(home))
    }
  }

  return vertices
}

function createTriangles() {
  const rectangles = []
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      rectangles.push(new Rectangle(
        vertices[i * (gridSize + 1) + j],
        vertices[(i + 1) * (gridSize + 1) + j],
        vertices[(i + 1) * (gridSize + 1) + j + 1],
        vertices[i * (gridSize + 1) + j + 1]
      ))
    }
  }

  return rectangles
}

class Vertex {
  constructor(home) {
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
  constructor(v1, v2, v3, v4) {
    this.vertices = [v1, v2, v3, v4]
    this.randomIntensity = random(15)
  }

  display() {
    const { randomIntensity: r } = this
    fill(r, r, r)
    stroke(r, r, r)
    beginShape()
    this.vertices.forEach((v) => {
      vertex(v.position.x, v.position.y)
    })
    endShape(CLOSE)
  }
}