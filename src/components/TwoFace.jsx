import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

import { Parallax } from './index'

export default function TwoFace(props) {
    const [real, setReal] = useState(false)
    const hoveringFace = useRef(false)
    const { ready } = props


    // useEffect(() => {
    //     window.addEventListener('click', bounce)
    //     return () => window.removeEventListener('click', bounce)
    // }, [])

    // const bounce = () => {
    //     console.log('hovering face: ', hoveringFace.current)
    //     if (!hoveringFace.current) {
    //         document.getElementById('two-face-container').style.animation = 'shake-head 2s ease'
    //         setTimeout(() => document.getElementById('two-face-container').style.animation = undefined, 1500)
    //     }
    // }

    function handleClick() {
        setReal(!real)
        // document.getElementById('two-face-container').style.animation = undefined
    }

    return (
        <Parallax fs>
            <TwoFaceContainer
                id='two-face-container'
                ready={ready}
                onClick={handleClick}
                onMouseOver={() => hoveringFace.current = true}
                onMouseOut={() => { setReal(false); hoveringFace.current = false } }
            >
                <img width={200} className='real' src={process.env.PUBLIC_URL + '/img/real.png'} />
                <img width={200} className={`vec ${real && 'hide'}`} src={process.env.PUBLIC_URL + '/img/vec.png'} />
            </TwoFaceContainer>
        </Parallax>
    )
}

const TwoFaceContainer = styled.div`
    width: 200px;
    height: 200px;
    transition: transform 0.5s ease;
    transform: scale(${props => props.ready ? 1 : 0});
    user-select: none;
    z-index: 99999999;
    position: relative;
    
    img {
        width: 200px;
        height: 200px;
        border-radius: 999px;
        overflow: hidden;
        user-select: none;
        pointer-events: none;
        user-drag: none;
        
        &.vec {
            position: absolute;
            left: 0;
            clip-path: inset(0 0 0 0);
            transition: clip-path 0.25s ease;
        }

        &.vec.hide {
            clip-path: inset(0 100% 0 0);
        }
    }
`