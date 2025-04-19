import { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

import { Main, Parallax, Modal, Animated } from '../../components/index'
import Header from './Header'


export default function AirpactFire() {
    const [viewing, setViewing] = useState(null);
    const contentRef = useRef(null);
    const fullscreenRef = useRef(null);
    const secondFullscreenRef = useRef(null);
    const [contentHeight, setContentHeight] = useState(0);
    const [atBottom, setAtBottom] = useState(false)
    const [cover, setCover] = useState('vizinet')
    const [isMouseDown, setIsMouseDown] = useState(false); // New state for mouse down

    function handleScroll(e) {
        const content = document.querySelector('.content').getBoundingClientRect()
        setAtBottom(-content.top > window.innerHeight)
    }

    function handleMouseDown() {
        setIsMouseDown(true);
    }

    function handleMouseUp() {
        setIsMouseDown(false);
        setCover(prev => prev == 'airpact' ? 'vizinet' : 'airpact')
    }

    useEffect(() => {
        const updateHeight = () => {
            if (contentRef.current) {
                setContentHeight(contentRef.current.offsetHeight);
            }
        };

        const root = document.getElementById('root')

        updateHeight();
        window.addEventListener('resize', updateHeight);
        root.addEventListener('scroll', handleScroll)
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        
        return () => {
            window.removeEventListener('resize', updateHeight);
            root.removeEventListener('scroll', handleScroll)
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    return (
        <Styles contentHeight={contentHeight}>
            <div className="content" style={{ padding: '5rem' }} ref={contentRef}>
                <Animated><Header id='airpactfire' /></Animated>
                <Animated><p className='ptl'>WSU's AIRPACT-Fire is a wildfire smoke forecasting system aimed at enhancing public health risk communication through improved smoke modeling and real-time data visualization.</p></Animated>
                <Animated><p className='ptl'>The goal was to craft a visual identity that bridges wildfire science and modern data tech. AIRPACT-Fire is all about modeling smoke, tracking particles, and communicating risk clearly, so the logo needed to reflect complexity made understandable. I started with hand sketches rooted in particle visualization: nodes, networks, fire motifs. Every concept plays with structured chaos: a mesh of points (particles) forming larger systems (smoke clouds, data sets, forecast models).</p></Animated>

                <div className='plm ptl'>
                    <Animated><h3 className='pym'>First Iteration of Designs</h3></Animated>
                    <div className='flex sep-md'>
                        <Animated> <img onClick={() => setViewing('/img/designs/airpact-sketches.png')} src={process.env.PUBLIC_URL + '/img/designs/airpact-sketches.png'} alt='Airpact-Fire logo pencil sketches' /></Animated>
                        <Animated> <img onClick={() => setViewing('/img/designs/airpact-draft.png')} src={process.env.PUBLIC_URL + '/img/designs/airpact-draft.png'} alt='Airpact-Fire logo first digital draft' /></Animated>
                        <Animated> <img onClick={() => setViewing('/img/designs/airpact-final.png')} src={process.env.PUBLIC_URL + '/img/designs/airpact-final.png'} alt='Airpact-Fire logo final draft' /></Animated>
                    </div>

                    <Animated><p className='pyl'>Airpact-Fire soon became Vizinet. The original design, a wireframe flame, worked well for a fire-focused project, but Vizinet's scope expanded to track all <a target='_blank' className='link' href='https://ww2.arb.ca.gov/resources/inhalable-particulate-matter-and-health'>PM2.5 particles</a>, not just smoke. The new logo keeps the wireframe style but shifts to a cluster of particles inside a cube, representing a broader range of pollutants in a clean, structured format. The update keeps the technical feel while better reflecting the program's expanded focus</p></Animated>

                    <Animated><h3 className='pym'>Second Iteration of Designs</h3></Animated>

                    <div className='flex sep-md'>
                        <Animated><img onClick={() => setViewing('/img/designs/vizinet-sketches.png')} src={process.env.PUBLIC_URL + '/img/designs/vizinet-sketches.png'} alt='Vizinet logo pencil sketches' /></Animated>
                        <Animated><img onClick={() => setViewing('/img/designs/vizinet-final.png')} src={process.env.PUBLIC_URL + '/img/designs/vizinet-final.png'} alt='Vizinet logo final draft' /></Animated>
                    </div>
                </div>
            </div>

            <Modal full center ready={viewing} onClose={() => setViewing(null)} style={{ pointerEvents:'none' }}>
                <img 
                    src={viewing ? (process.env.PUBLIC_URL + viewing) : 'https://i.gifer.com/origin/3e/3ef9a480f53941f196d036b8151baaf4_w200.gif'} 
                    alt="Enlarged view of image"
                    style={{ maxHeight: '90vh', maxWidth: '90vw', objectFit: 'contain' }}
                />
            </Modal>

            <FullscreenSection 
                ref={fullscreenRef} 
                viz={cover=='vizinet'} 
            >
                <motion.img 
                    initial={{ scale: 0 }} 
                    animate={{ scale: isMouseDown ? 0 : (atBottom ? 1 : 0) }} 
                    transition={{ type: 'spring', duration: .25 }} 
                    id='logo' 
                    src={process.env.PUBLIC_URL + `/img/designs/${cover}-logo.png`} 
                />
                <motion.h2 
                    initial={{  opacity: 1 }} 
                    animate={{  scaleX: isMouseDown ? 0 : (atBottom ? 1 : 0) }} 
                    transition={{ type: 'spring', duration: .25 }} 
                    className='ptm thin'
                >
                    {cover == 'vizinet' ? 'VIZINET' : 'Airpact-Fire'}
                </motion.h2>
            </FullscreenSection>

        </Styles>
    )
}

const Styles = styled.div`
    .content {
        position: relative;
        z-index: 1;
        background: ${props => props.theme.bg};
        margin-bottom: ${props => props.contentHeight}px;
        box-shadow:0 0 60px 100px #0006;
    }

    img {
        height: 15rem;
    }
`

const FullscreenSection = styled.div`
    height: 100vh;
    width: 100%;
    z-index: -1;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: radial-gradient(#281960, #060912);
    transition: transform 0.5s ease;

    &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transition: opacity 0.25s ease;
        opacity: ${props => props.viz ? 0 : 1};
        background: radial-gradient(#7f3e38, #2f0e0b)
    }

    #logo {
        height: 30vmin;
    }

    * {
        color: white;
        font-size: 3rem;
        z-index: 2;
    }
`
