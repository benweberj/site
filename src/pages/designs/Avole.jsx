import { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

import { Main, Parallax, Modal, Animated } from '../../components/index'
import Header from './Header'


export default function Avole() {
    const [viewing, setViewing] = useState(null);
    const contentRef = useRef(null);
    const fullscreenRef = useRef(null);
    const [contentHeight, setContentHeight] = useState(0);
    const [atBottom, setAtBottom] = useState(false)
    const [broken, setBroken] = useState(false)
    const [isMouseDown, setIsMouseDown] = useState(false)

    function handleScroll(e) {
        const content = document.querySelector('.content').getBoundingClientRect()
        setAtBottom(-content.top > window.innerHeight)
    }

    useEffect(() => {
        if (!atBottom && broken) {
            setBroken(false)
        }
    }, [atBottom, broken])

    function handleMouseDown() {
        setIsMouseDown(true);
        setBroken(prev => !prev)
    }

    function handleMouseUp() {
        setIsMouseDown(false)
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
                <Animated><Header id='avole' /></Animated>


                <Animated><p className='ptl'>I spent my Summer of 2019 as a barista in a small, hole in the wall coffee shop near the University of Washington. I got to know one of the co-owners of Avole and mentioned I did web and design work. Just for fun, I started thinking about a logo. The first designs were quite simple, just trying to incorporate patterned, tribal shapes into common coffee shop iconography.</p></Animated>

                <div className='plm ptl'>
                    <Animated><h3 className='pym'>First Iteration of Designs</h3></Animated>
                    <div className='flex sep-md'>
                        <Animated> <img onClick={() => setViewing('/img/designs/avole-draft-1.png')} src={process.env.PUBLIC_URL + '/img/designs/avole-draft-1.png'} alt='Avole sketches' /></Animated>
                        <Animated> <img onClick={() => setViewing('/img/designs/avole-draft-2.png')} src={process.env.PUBLIC_URL + '/img/designs/avole-draft-2.png'} alt='Avole first draft' /></Animated>
                        <Animated> <img onClick={() => setViewing('/img/designs/avole-draft-3.png')} src={process.env.PUBLIC_URL + '/img/designs/avole-draft-3.png'} alt='Avole second draft' /></Animated>
                    </div>

                    <Animated><p className='pyl'>The results were a bit forced and disconnected, so I needed to think of something more original and personal. After researching Ethiopian languages and seeing the spelling of the word “coffee”, the logo designed itself. </p></Animated>


                    <div className='align-center plm'>
                        <img className='inv' style={{ height: '2rem' }} src={process.env.PUBLIC_URL + '/img/designs/buna.png'} />
                        <h1 className='normal pll'>"Buna" meaning coffee in <a target='_blank' href='https://en.wikipedia.org/wiki/Amharic' className='link'>Ahmaric</a></h1>
                    </div>


                    <Animated><p className='pyl'>That first symbol kinda looked like a hook or a handle to me, and the second symbol resembled a cup. With a quick transformation, I created a unique, abstract, design tied directly to the shop's rich Ethiopian culture.</p></Animated>

                    <Animated><h3 className='pym'>Final Design</h3></Animated>
                    <Animated> <img onClick={() => setViewing('/img/designs/avole-final.png')} src={process.env.PUBLIC_URL + '/img/designs/avole-final.png'} alt='Avole final version' /></Animated>
                   


                    {/* <div className='flex sep-md'>
                        <Animated><img onClick={() => setViewing('/img/designs/vizinet-sketches.png')} src={process.env.PUBLIC_URL + '/img/designs/vizinet-sketches.png'} alt='Vizinet logo pencil sketches' /></Animated>
                        <Animated><img onClick={() => setViewing('/img/designs/vizinet-final.png')} src={process.env.PUBLIC_URL + '/img/designs/vizinet-final.png'} alt='Vizinet logo final draft' /></Animated>
                    </div> */}
                </div>
            </div>

            <Modal full center ready={viewing} onClose={() => setViewing(null)} style={{ pointerEvents:'none' }}>
                <img 
                    src={viewing ? (process.env.PUBLIC_URL + viewing) : 'https://i.gifer.com/origin/3e/3ef9a480f53941f196d036b8151baaf4_w200.gif'} 
                    alt="Enlarged view of image"
                    style={{ maxHeight: '90vh', maxWidth: '90vw', objectFit: 'contain' }}
                />
            </Modal>

            <FullscreenSection ref={fullscreenRef}>
                <div className='rel' id='logo-container'>
                    <motion.img // cup
                        animate={{
                            scale: atBottom ? 1 : 0,
                            x: broken ? '10vw' : '0vw',
                            y: broken ? '8vmin' : '0vmin',
                            rotate: broken ? 180 : 0,
                        }} 
                        transition={{ type: 'spring', duration: .25 }} 
                        className='logo' 
                        src={process.env.PUBLIC_URL + `/img/designs/avole-logo-1.png`} 
                    />
                    <motion.img // handle
                        initial={{ scale: 0 }}
                        animate={{
                            scale: atBottom ? broken ? 2 : 1 : 0,
                        }} 
                        transition={{ type: 'spring', duration: .25 }} 
                        className='logo' 
                        src={process.env.PUBLIC_URL + `/img/designs/avole-logo-2.png`} 
                    />
                     <motion.img // coffee
                        initial={{ scale: 0 }}
                        animate={{ scale: atBottom ? broken ? 0 : 1 : 0 }} 
                        transition={{ type: 'spring', duration: .25 }} 
                        className='logo' 
                        src={process.env.PUBLIC_URL + `/img/designs/avole-logo-3.png`} 
                    />
                     <motion.img // steam
                        initial={{ scale: 0 }}
                        animate={{ scale: atBottom ? broken ? 0 : 1 : 0 }} 
                        transition={{ type: 'spring', duration: .25 }} 
                        className='logo' 
                        src={process.env.PUBLIC_URL + `/img/designs/avole-logo-4.png`} 
                    />
                </div>
                
                <div className='center col' style={{ paddingLeft: '4vmin' }}>
                    <motion.h1  
                        animate={{ y: !atBottom || broken ? 50 : 0, opacity: atBottom && !broken ? 1 : 0 }} 
                        style={{ fontSize: '4rem' }}
                        transition={{ type: 'spring', duration: .25 }} 
                        className='ptm thin'
                    >
                        Avole
                    </motion.h1>

                    <motion.h2  
                        animate={{ y: !atBottom || broken ? 20 : 0, opacity: atBottom && !broken ? 0.5 : 0 }} 
                        style={{ fontSize: '2rem' }}
                        transition={{ type: 'spring', duration: .25 }} 
                        className='thin'
                    >
                        On the Ave
                    </motion.h2>
                </div>
                


                <motion.h1
                    animate={{ x: broken ? 0 : -100, opacity: broken ? .5 : 0 }}
                    style={{ fontSize: '30vw', position: 'absolute', left: 0, bottom: '0vmin', mixBlendMode: 'soft-light' }}
                    // transition: 'type'
                >BU
                </motion.h1>
                <motion.h1
                    animate={{ x: broken ? 0 : 100, opacity: broken ? .5 : 0 }}
                    style={{ fontSize: '30vw', position: 'absolute', right: '2rem', bottom: '0vmin', mixBlendMode: 'soft-light' }}
                    // transition: 'type'
                >NA
                </motion.h1>

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
    // background: radial-gradient(#281960, #060912);
    background-image: url('${process.env.PUBLIC_URL + '/img/designs/avole-cover.png'}');
    background-size: cover;
    transition: transform 0.5s ease;

    #logo-container {
        height: 40vmin;
        width: 30vmin; // to counter balance
        
        .logo {
            height: 100%;
            
            position: absolute;
        }
    }

    * {
        color: white;
    }
`
