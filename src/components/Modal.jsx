import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { motion } from 'framer-motion'

import { useTheme } from '../extras/ThemeContext'

const glassLink = 'https://images.pexels.com/photos/1287075/pexels-photo-1287075.jpeg?cs=srgb&dl=pexels-eberhard-grossgasteiger-1287075.jpg&fm=jpg'
const _Modal = styled.section`
    // fullscreen container
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    min-height: 100vh;
    overflow: ${props => props.overflow=='hidden' ? 'hidden' : 'auto'};
    max-height: ${props => (!props.ready || props.overflow=='hidden') && '100vh'};
    background: ${props => props.glass ? `linear-gradient(45deg, #21252aee, #21252aee), url(${glassLink})` : props.theme.bg + 'ee'};
    background-size: cover;
    z-index: 99;
    transition: all 0.25s ease;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: ${props => props.theme.spacing.lg}rem;
    backdrop-filter: blur(4px);

    opacity: ${props => props.ready ? 1 : 0};
    pointer-events: ${props => !props.ready && 'none'};
    user-select: ${props => !props.ready && 'none'};

    .close-btn {
        position: absolute;
        top: 5px;
        right: 15px;
        background: none;
        padding: 0;
        width: 2rem;
        height: 2rem;

        &:hover {
            background: ${props => props.theme.complement};
        }
    }


    .content {
        max-width: 80vw;
        max-height: 80vh;
    }
`

export default function Modal(props) {
    const { ready, onClose, children, full, glass, overflow, center } = props

    const [theme,_] = useTheme()
    const [isBrowser, setIsBrowser] = useState(false)
    
    useEffect(() => {
        setIsBrowser(true)

        function handleClose(e) { if (e.key === 'Escape') onClose() }
        window.addEventListener('keydown', handleClose)
        return () => window.removeEventListener('keydown', handleClose)
    }, [])

    function handleBackgroundClick(e) {
        if (e.target == e.currentTarget) onClose()
    }

    if (isBrowser) {
        return ReactDOM.createPortal(
            <_Modal ready={ready} theme={theme} onClick={handleBackgroundClick} glass={glass} overflow={overflow}>
                <motion.div
                    className={(full ? 'full' : 'content card') + (center ? ' center' : '')}
                    initial={{ scale: 0 }}
                    animate={{ scale: ready ? 1 : 0 }}
                    transition={{ type: 'spring', duration: 0.5 }}
                >
                    {children}
                </motion.div>

                { full && <button className='close-btn' onClick={onClose}>X</button> }

            </_Modal>,
            document.getElementById('modal-root')        
        )
    }
    return null
}