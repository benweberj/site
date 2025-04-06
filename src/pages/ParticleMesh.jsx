import p5 from 'p5'
import React from 'react'
import styled from 'styled-components'
// import { motion } from 'framer-motion'
import { Toaster, toast } from 'react-hot-toast'


let options = {
    pullDistance: 300,
    attractionForce: 2,
    repelMultiplier: 3,
    bounceDecay: .5,
    keepInbounds: true,
    nodesAttract: true,
    repelOnPress: true,
    drawConnections: true,
    drawParticles: true,
    attractedToMouse: true,
    debug: false,
    color: 'white',
    goingHome: false,
}

export default class ParticleMesh extends React.Component {

    constructor(props) {
        super(props)
        this.particleRef = React.createRef()
        options.color = props.theme.complement

        this.state = {
            showingInstructions: false,
            showingOptions: false,
            ready: false,
            used: false
        }

        // needs to be handled by the class so the UI can delete the particles
        this.particles = []

        this.toastOptions = {
            duration: 1000,
            style: { fontSize: '0.7rem', maxWidth: '40vw' }
        }

        setTimeout(() => {
            this.setState({ ready: true, showingInstructions: true})
        }, 100)
    }

    componentDidUpdate(prevProps) {
        if (this.props.theme != prevProps.theme) {
            options.color = this.props.theme.complement
        }
    }

    componentDidMount() {
        if (!this.sketch) this.sketch = new p5(this.Sketch, this.particleRef.current)
    }

    componentWillUnmount() {
        this.sketch.remove()
    }

    Sketch = p => {
        let canvas
        const parentId = 'sketch-container'
        let i = 0
        let cooldownTime = 150 // ms cooldown after spawning particle
        let timer = null
        let grid = {} // Spatial hash grid
        let cellSize = options.pullDistance // Size of each grid cell
        
        let longPressTimer = null
    
        // get an object holding the dimensions of the element matching given id
        function dim(id) {
            const a = document.getElementById(id)
            if (!a) return { top: 0, left: 0, width: 0, height: 0 }
            return {
                top: a.getBoundingClientRect().top,
                left: a.getBoundingClientRect().left,
                width: a.clientWidth,
                height: a.clientHeight,
            }
        }
    
        // vec: p5 vector, box: dimentions object returned from dim()
        function vectorInBox(vec, box) {
            return (vec.x >= box.left && vec.x < box.left+box.width) && (vec.y > box.top && vec.y < box.top+box.height)
        }
    
        const getMouse = () => p.createVector(p.mouseX, p.mouseY)

        function updateGrid(particles) {
            grid = {}
            particles.forEach((particle, i) => {
                const cellX = Math.floor(particle.pos.x / cellSize)
                const cellY = Math.floor(particle.pos.y / cellSize)
                const key = `${cellX},${cellY}`
                if (!grid[key]) grid[key] = []
                grid[key].push(i)
            })
        }

        function getNeighbors(particle) {
            const cellX = Math.floor(particle.pos.x / cellSize)
            const cellY = Math.floor(particle.pos.y / cellSize)
            const neighbors = []

            // Check surrounding cells
            for (let x = -1; x <= 1; x++) {
                for (let y = -1; y <= 1; y++) {
                    const key = `${cellX + x},${cellY + y}`
                    if (grid[key]) {
                        neighbors.push(...grid[key])
                    }
                }
            }
            return neighbors
        }
    
        p.setup = () => {
            const d = dim(parentId)
            canvas = p.createCanvas(d.width, d.height);
            canvas.position(0,0)
            i++

            for (let i = 0; i < 100; i++) {
                this.particles.push(new Particle(p, p.createVector(Math.random() * window.innerWidth, Math.random() * window.innerHeight)))
            }
        }

        p.keyPressed = () => {
            const { toastOptions } = this

            if (p.key == 'x') this.clearParticles()

            if (p.key == 'c') this.toggleOption('drawConnections')
            if (p.key == 'b') this.toggleOption('keepInbounds')
            if (p.key == 'g') this.toggleOption('nodesAttract')
            if (p.key == 'm') this.toggleOption('attractedToMouse')
            if (p.key == 'd') this.toggleOption('debug')
            if (p.key == 'h') this.toggleOption('goingHome')
                
            if (p.key == '[') this.handleStrength(false)
            if (p.key == ']') this.handleStrength(true)

            if (p.key == 'i') this.setState({ showingInstructions: !this.state.showingInstructions })

            if (p.key == 'Backspace') {
                deleteClosestParticle(this.particles)
                toast('Particle deleted', toastOptions)
            }
        }

        function deleteClosestParticle(particles) {
            let mouse = getMouse()
            if (particles.length > 0) {
                let closest = [mouse.dist(particles[0].pos), 0] // [dist, index]
                for (let i = 0; i < particles.length; i++) {
                    let dist = mouse.dist(particles[i].pos)
                    if (dist < closest[0]) {
                        closest = [dist, i]
                    }
                }
                particles.splice(closest[1], 1)
            }
        }
    
        p.mousePressed = e => {
            clearTimeout(longPressTimer)
            longPressTimer = setTimeout(() => {
                longPressTimer = null
            }, 250)            
        }

        p.mouseReleased = e => {
            const { particles } = this
            
            const inRestrictedAreas = vectorInBox(getMouse(), dim('header')) || vectorInBox(getMouse(), dim('particle-controls')) || vectorInBox(getMouse(), dim('toggle-options'))

            if (this.state.ready && longPressTimer !== null && !inRestrictedAreas) {
                if (!this.state.used) {
                    this.setState({ showingInstructions: false })
                }
                const d = dim(parentId)

                // TODO: fix double particle spawn on mobile
                let x, y;
                if (e.type === 'touchend') {
                    x = e.changedTouches[0].clientX - d.left;
                    y = e.changedTouches[0].clientY - d.top;
                } else {
                    x = e.clientX - d.left;
                    y = e.clientY - d.top;
                }
                particles.push(new Particle(p, p.createVector(x, y)));

                this.setState({ used: true })
                timer = setTimeout(() => timer = null, cooldownTime)
            }
            clearTimeout(longPressTimer)
            longPressTimer = null
        }
    
        p.draw = () => {
            const { particles } = this
            const mouse = getMouse()
            
            p.clear()
            
            // perimeter of mouse's attraction
            if (options.debug) {
                p.noFill()
                p.stroke(options.color + '55')
                p.strokeWeight(1)
                p.ellipse(mouse.x, mouse.y, options.pullDistance*2)
            }

            p.windowResized = () => {
                const d = dim(parentId)
                p.resizeCanvas(d.width, d.height)
            }

            // Update spatial hash grid
            updateGrid(particles)

            particles.forEach((particle, i) => {
                if (particle.dead) return
                particle.move(options.keepInbounds, options.bounceDecay, options.goingHome);

                if (options.drawParticles) particle.draw(options.color);

                if (options.debug && options.nodesAttract) {
                    p.noFill()
                    p.stroke(options.color + '55')
                    p.strokeWeight(1)
                    p.ellipse(particle.pos.x, particle.pos.y, options.pullDistance)
                }

                if (options.goingHome && options.debug) {
                    p.strokeWeight(1)
                    p.line(particle.pos.x, particle.pos.y, particle.home.x, particle.home.y)
                }

                if (options.attractedToMouse) {
                    let mouseDist = particle.pos.copy().dist(mouse);
                    
                    // draw debug lines from mouse to particle
                    if (options.debug && (mouseDist < options.pullDistance)) {
                        p.strokeWeight(1)
                        p.stroke('#55bb99')
                        p.line(mouse.x, mouse.y, particle.pos.x, particle.pos.y)
                    }
                
                    // attract (or repel) from mouse
                    if ((!options.goingHome || p.mouseIsPressed) && (mouseDist < options.pullDistance) && vectorInBox(mouse, dim(parentId))) {
                        let dir = mouse.copy().sub(particle.pos);
                        if (p.mouseIsPressed) {
                            if (options.repelOnPress) dir.mult(-1*options.repelMultiplier * (options.goingHome ? 3 : 1));
                        }
                        
                        const strength = 10/Math.pow(mouseDist, 2)
                        dir.mult(p.constrain(options.attractionForce * strength, 0, options.attractionForce*.001))

                        particle.applyForce(dir, options.goingHome);
                    }
                }
                
                // Get only nearby particles using spatial hash grid
                const neighbors = getNeighbors(particle)
                neighbors.forEach(j => {
                    if (i !== j) {
                        const other = particles[j]
                        let dist = particle.pos.dist(other.pos);
    
                        if (dist < options.pullDistance) {
                            //draw connections
                            if (options.drawConnections) {
                                let str = Math.pow(15 / dist, 2);
                                str = p.constrain(str, 0, 2);
                                p.stroke(options.color);
                                p.strokeWeight(str);
                                p.line(particle.pos.x, particle.pos.y, other.pos.x, other.pos.y);
                            }

                            // attract to each other
                            if (options.nodesAttract) {
                                let dir = other.pos.copy().sub(particle.pos)
                                const strength = 1/Math.pow(dist, 2)
                                dir.mult(p.constrain(options.attractionForce * strength, 0, options.attractionForce*.001))
                                particle.applyForce(dir)
                            }
                        }
                    }
                });
            });
        }
    }

    toggleOption(key) {
        const { toastOptions } = this

        if (key === 'nodesAttract') {
            options.nodesAttract = !options.nodesAttract
            toast(`Inter-particle interactions ${options.nodesAttract ? 'enabled' : 'disabled'}`, toastOptions)
        }

        if (key == 'attractedToMouse') {
            options.attractedToMouse = !options.attractedToMouse
            toast(`Interactions with mouse ${options.attractedToMouse ? 'enabled' : 'disabled'}`, toastOptions)
        }

        if (key == 'drawConnections') {
            options.drawConnections = !options.drawConnections
            toast(`Connections ${options.drawConnections ? 'shown' : 'hidden'}`, toastOptions)
        }

        if (key === 'goingHome') {
            options.goingHome = !options.goingHome
            toast(options.goingHome ? 'Going home' : 'Release particles', toastOptions)
        }


        if (key === 'debug') {
            options.debug = !options.debug
            toast(`Debugging ${options.debug ? 'enabled' : 'disabled'}`, toastOptions)
        }

        if (key === 'keepInbounds') {
            options.keepInbounds = !options.keepInbounds
            toast(`Window boundaries ${options.keepInbounds ? 'enabled' : 'disabled'}`, toastOptions)
        }

        // update UI
        this.forceUpdate()
    }

    handleStrength(increment=true) {
        const { toastOptions } = this

        if (increment) {
            options.attractionForce += 0.5
            toast(`Attraction force increased to ${options.attractionForce}`, toastOptions)

        } else { // decrement
            if (options.attractionForce >= 0.5) options.attractionForce -= 0.5
            toast(`Attraction force decreased to ${options.attractionForce}`, toastOptions)
        }
        this.forceUpdate()
    }

    clearParticles() {
        const { toastOptions } = this
        this.particles = []
        toast('Particles cleared', toastOptions)
    }

    render() {
        return (
            <>
                <Toaster />
                <Instructions show={this.state.showingInstructions}>
                    <ul>
                        <li>Press <code>i</code> to toggle this menu</li>
                        <li><b>Click</b> to add a particle</li>
                        <li><b>Click and hold</b> to repel particles</li>
                        <li>Press <code>g</code> to toggle particle interactions</li>
                        <li>Press <code>m</code> to toggle mouse interactions</li>
                        <li>Press <code>c</code> to toggle connection lines</li>
                        <li>Press <code>b</code> to toggle screen boundary</li>
                        <li>Increase/decrease attraction strength with <code>{'['}</code> and <code>{']'}</code></li>
                        <li>Press <code>x</code> to clear all particles</li>
                        <li>Press <code>d</code> to see each particle's sphere of influence</li>
                        <li>Press <code>h</code> to have all particles steer home (starting position)</li>
                        <li>Press <code>backspace</code> to remove the particle closest to mouse</li>
                    </ul>
                </Instructions>

                <SketchContainer id='sketch-container'>
                    <div ref={this.particleRef} />
                </SketchContainer>

                <Controls $showing={this.state.showingOptions} id='particle-controls'>
                    <div className='entry'>
                        <button onClick={() => this.toggleOption('nodesAttract')} className={`chip ${options.nodesAttract && 'selected'}`}>on</button>
                        <button onClick={() => this.toggleOption('nodesAttract')} className={`chip ${!options.nodesAttract && 'selected'}`}>off</button>
                        particle interactions (g)
                    </div>

                    <div className='entry'>
                        <button onClick={() => this.toggleOption('attractedToMouse')} className={`chip ${options.attractedToMouse && 'selected'}`}>on</button>
                        <button onClick={() => this.toggleOption('attractedToMouse')} className={`chip ${!options.attractedToMouse && 'selected'}`}>off</button>
                        mouse interactions (m)
                    </div>

                    <div className='entry'>
                        <button onClick={() => this.toggleOption('drawConnections')} className={`chip ${options.drawConnections && 'selected'}`}>on</button>
                        <button onClick={() => this.toggleOption('drawConnections')} className={`chip ${!options.drawConnections && 'selected'}`}>off</button>
                        connection lines (c)
                    </div>

                    <div className='entry'>
                        <button onClick={() => this.toggleOption('keepInbounds')} className={`chip ${options.keepInbounds && 'selected'}`}>on</button>
                        <button onClick={() => this.toggleOption('keepInbounds')} className={`chip ${!options.keepInbounds && 'selected'}`}>off</button>
                        screen boundary (b)
                    </div>

                    <div className='entry'>
                        <button onClick={() => this.toggleOption('goingHome')} className={`chip ${options.goingHome && 'selected'}`}>on</button>
                        <button onClick={() => this.toggleOption('goingHome')} className={`chip ${!options.goingHome && 'selected'}`}>off</button>
                        home seeking (h)
                    </div>

                    <div className='entry'>
                        <button onClick={() => this.toggleOption('debug')} className={`chip ${options.debug && 'selected'}`}>on</button>
                        <button onClick={() => this.toggleOption('debug')} className={`chip ${!options.debug && 'selected'}`}>off</button>
                        debug lines (d)
                    </div>

                    <div className='entry'>
                        <button onClick={() => this.handleStrength(false)} className={`chip`}>-</button>
                        {options.attractionForce.toFixed(1)}
                        <button onClick={() => this.handleStrength(true)} className={`chip sm`}>+</button>
                        attraction force ([/])
                    </div>

                    <div className='entry'>
                        <button onClick={this.clearParticles.bind(this)} className={`chip`}>clear particles</button>
                    </div>

                    <div id='toggle-options'>
                        <button className={this.state.showingOptions && 'red'} onClick={() => this.setState({ showingOptions: !this.state.showingOptions })}>
                            {this.state.showingOptions ? 'hide' : 'options'}
                        </button>
                    </div>

                </Controls>
            </>
        )
    }
}

const Controls = styled.div`
    position: absolute;
    bottom: 10px;
    left: 10px;
    transition: transform 0.5s ease;
    transform: translateX(${props => props.$showing ? 0 : '-110%'});

    #toggle-options {
        position: absolute;
        bottom: 0;
        right: -10%;
        transform: translateX(100%);
    }

    * {
        font-size: 0.8rem;
    }

    .entry {
        margin-bottom: 5px;

        button {
            margin: 2px;

            &:nth-child(2) {
                margin-right: 10px;
            }
        }
    }

`


class Particle {
    constructor(p, pos) {
        this.p = p
        this.size = 0
        this.growthRate = .1
        this.respawn()
        this.pos = pos || p.createVector(p.random(-100, p.width+100), p.random(-100, p.height+100))
        this.home = this.pos.copy()
        this.dead = false
        this.goingHome = false
    }

    goHome() {
        const homeDir = p5.Vector.sub(this.home, this.pos);
        const homeDist = this.pos.dist(this.home);
      
        const steerForce = p5.Vector.sub(homeDir, this.vel);
        const strength = 90 / Math.pow(homeDist, 2);
        steerForce.mult(strength);
        steerForce.limit(1)
      
        if (homeDist < 100) {
            steerForce.mult(homeDist/50)
            this.vel.mult(0.8)
        }
        this.vel.add(steerForce);
        
    }

    move(keepInbounds=true, bounceDecay=1, goingHome) {
        this.goingHome = goingHome;
        this.pos.add(this.vel);

        if (goingHome) this.goHome()
        
        if (keepInbounds) {
            this.checkBounce(bounceDecay)
        } else this.checkPos();

        if (this.size < this.potential) this.size += this.growthRate
    }

    draw(color) {
        this.p.strokeWeight(this.size);
        this.p.stroke(color);
        this.p.point(this.pos.x, this.pos.y);
    }

    applyForce(force, allowMouse=false) {
        if (!this.goingHome || allowMouse) {
            this.vel.add(force);
        }
    }

    checkBounce(bounceDecay) {
        let { x, y } = this.pos
        let { width, height } = this.p
        let { x:vx, y:vy } = this.vel
        let r = this.size/2
        const d = Math.min(1, bounceDecay)

        if (x <= r) { // left wall
            this.pos.x = r
            this.vel = this.p.createVector(vx*-d, vy)
        } else if (x >= (width-r)) { // right wall
            this.pos.x = width-r
            this.vel = this.p.createVector(vx*-d, vy)
        } else if (y <= r) { // top wall
            this.pos.y = r
            this.vel = this.p.createVector(vx, vy*-d)
        } else if (y >= (height-r)) { // bottom
            this.pos.y = height-r
            this.vel = this.p.createVector(vx, vy*-d)
        } 
    }

    checkPos() {
        let { x, y } = this.pos
        let s = 100;
        if ((x < 0 - s) || (x > this.p.width + s) || (y < 0 - s) || (y > this.p.height + s)) {
            this.dead = true
            this.pos = this.p.createVector(9999, 9999)
        }
    }

    respawn() {
        // let rate = this.p.random(.2, .4);
        let rate = 1;
        this.pos = this.p.createVector(this.p.random(-100, this.p.width + 100), -100);
        this.vel = this.p.createVector(this.p.random(-rate, rate), this.p.random(-rate, rate));
        this.potential = this.p.random(3,7);
    }
}


const Instructions = styled.div`
    position: absolute;
    width: 100vw;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;

    transition: all 0.5s ease;
    background: ${props => props.show ? props.theme.bg + '99' : 0};
    pointer-events: ${props => props.show ? 'auto' : 'none'};
    user-select: ${props => props.show ? 'auto' : 'none'};
    overflow-y: scroll;

    ul {
        padding: 2vw;
        padding-left: 10vw;
        // padding-top: 10vh;
        transform: scale(${props => props.show ? 1 : 0.75});
        transition: transform 0.25s ease, opacity 0.15s ease;
        opacity: ${props => props.show? 1 : 0};
        max-height: 80vh;
        overflow-y: scroll;

        li {
            line-height: 2;
            // max-width: 300px;
        }
    }
`

const SketchContainer = styled.div`
    width: 100vw;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0
    // z-index: -999;
`
