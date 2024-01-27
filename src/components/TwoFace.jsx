import React, { useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

import { Parallax } from './index'

export default function TwoFace(props) {
    const [real, setReal] = useState(false)
    const { ready } = props

    return (
        <Parallax fs>
            <TwoFaceContainer ready={ready} onClick={() => setReal(!real)}>
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