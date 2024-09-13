import p5 from 'p5'
import React, { useEffect } from 'react'
import styled from 'styled-components'

import { useTheme } from '../extras/ThemeContext'

let theme = {
    bg: '#ffffff'
}


export default class Lightning extends React.Component {

    constructor(props) {
        super(props)
        this.lightningRef = React.createRef()
        this.rainAudio = null
        theme = this.props.theme
    }

    componentDidMount() {
        if (!this.sketch) this.sketch = new p5(this.Sketch, this.lightningRef.current)
        this.rainSounds = new Audio(process.env.PUBLIC_URL + '/rainSounds.mp3')
        this.rainSounds.loop = 'loop'
    }

    componentDidUpdate() {
        theme = this.props.theme
    }

    componentWillUnmount() {
        this.sketch.remove()
        this.rainSounds.pause()
        this.rainSounds.currentTime = 0
    }

    Sketch = p => {

        let canvas,
        rain,
        font,
        started = false;
    
        p.setup = () => {
            canvas = p.createCanvas(window.innerWidth, window.innerHeight);
            p.background(0);
            rain = [];
            for (let i = 0; i < 50; i++) {
                rain.push(new Drop(p));
            }
        }
        
        p.draw = () => {
            p.background(theme.bg + '11')
            if (started) {
                rain.forEach((drop) => drop.fall());
            } else {
                p.textSize(20)
        
                p.fill(theme.highlight || '#ffffff');
                let str = 'Click for thunder';
                p.text(str, window.innerWidth / 2 - (str.length * 6), window.innerHeight / 2 - 16);
            }
        }

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
    
        function vectorInBox(vec, box) {
            return (vec.x >= box.left && vec.x < box.left+box.width) && (vec.y > box.top && vec.y < box.top+box.height)
        }
    
        const getMouse = () => p.createVector(p.mouseX, p.mouseY)
        
        p.mousePressed = () => {
            const clickedOnHeader = vectorInBox(getMouse(), dim('header'))
            if (clickedOnHeader) return
            
            if (!started) {
                started = true
                this.rainSounds.play()
            }

            new Bolt(p, p.mouseX, p.mouseY, 2, 255, 1, 50, 0.1, 2, true);
        }
        
        p.windowResized = () => {
            canvas = p.createCanvas(window.innerWidth, window.innerHeight);
            p.background(0);
        }
    }

    render() {
        return (
            <>
                <ThemeToggleHack />
                <SketchContainer id='sketch-container'>
                    <div ref={this.lightningRef} />
                </SketchContainer>
            </>
        )
    }
}

function ThemeToggleHack() {
    const [theme, toggle] = useTheme()
    useEffect(() => {
        if (theme.mode === 'light') toggle()
    }, [])
}

const SketchContainer = styled.div`
    width: 100vw;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0
`



class Drop {
    constructor(p) {
        this.p = p
        this.pos = p.createVector(p.random(window.innerWidth), p.random(-1000, 0))
        this.spawn()
    }

    draw() {
        const { p } = this
        p.stroke('#7ca4d055')
        p.strokeWeight(this.width)
        p.line(this.pos.x, this.pos.y, this.pos.x, this.pos.y + this.len)
    }

    fall() {
        this.vel.add(this.g)
        this.pos.add(this.vel)
        if (this.pos.y > window.innerHeight) this.spawn()
        this.draw()
    }

    spawn() {
        const { p } = this
        this.pos = p.createVector(p.random(window.innerWidth), -p.random(window.innerHeight))
        this.vel = p.createVector()
        this.g = p.createVector(0, p.random(.03, .2))
        this.width = p.random(1, 5)
        this.len = p.random(5, 20)
    }
}



class Bolt {
    constructor(p, x, y, stroke, opacity, interval, reach, splitChance, splitCount, first) {
        this.p = p
        this.x = x
        this.y = y
        this.stroke = stroke
        this.opacity = opacity
        this.interval = interval
        this.reach = reach
        this.splitChance = splitChance
        this.splitCount = splitCount
        this.first = first

        if (this.first) this.path = []

        this.lightning()
    }

    lightning() {
        const { p } = this
        let timer = setInterval(() => {
            let dx = p.int(p.random(-this.reach, this.reach))
            let dy = p.int(p.random(this.reach))
            p.stroke(theme.highlight || '#ffffff')
            p.strokeWeight(this.stroke)
            p.line(this.x, this.y, this.x + dx, this.y + dy)

            if (this.path !== undefined) {
                this.path.push(p.createVector(this.x, this.y))
            }

            this.x += dx
            this.y += dy

            if (p.random() < this.splitChance) {
                for (let i = 0; i < this.splitCount; i++) {
                    let split = new Bolt(p, this.x, this.y, this.stroke / 5, this.opacity, this.interval / 2,
                        this.reach, this.splitChance * this.splitChance, this.splitCount, false)
                }
            }
            if (this.y >= window.innerHeight + this.reach) {
                clearInterval(timer)

                if (this.first) {
                    const rands = [
                        [1, 0], // [volume, delay]
                        [0.5, 500],
                        [0.4, 750],
                        [0.3, 1000],
                        [0.1, 1500],
                        [1, 0],
                    ]
                    // pick random volume\delay preset for thunder
                    let r = rands[Math.floor(Math.random() * rands.length)]
                    
                    // use different clap for near and far away strikes
                    let c = new Audio(process.env.PUBLIC_URL + (r[0] < 0.5 ? '/distantClap.mp3' : '/clap.mp3'))
                    
                    setTimeout(() => { c.volume = 1; c.play() }, r[1])
                    this.retrace()
                }
            }
        }, this.interval)
    }

    retrace() {
        const { p } = this
        p.background(255, 100)
        let i = this.path.length - 1
        let followPath = setInterval(() => {
            p.stroke(theme.highlight || '#ffffff')
            p.strokeWeight(this.stroke * 2)
            p.line(this.path[i].x, this.path[i].y, this.path[i - 1].x, this.path[i - 1].y)
            i--
            if (i === 0) {
                clearInterval(followPath)
            }
        }, 0)

    }
}