import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { motion } from 'framer-motion'

import { useTheme } from '../extras/ThemeContext'

const _Modal = styled.section`
    // fullscreen container
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background: ${props => props.theme.bg}ee;
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


    .content {
        max-width: 80vw;
        max-height: 80vh;
        // overflow: scroll;
        // transform: scale(${props => props.ready ? 1 : 0})

        // position: absolute;
        // top: 50%;
        // left: 50%;
        // transform: translate(-50%, -50%);
        // max-width: 500px;
`

export default function Modal(props) {
    const [theme,_] = useTheme()
    const { ready, onClose, children } = props
    const [isBrowser, setIsBrowser] = useState(false)

    // useEffect(() => {
    //     alert(ready)
    // }, [ready])

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
            <_Modal ready={ready} theme={theme} onClick={handleBackgroundClick}>
                <motion.div
                    className='content card'
                    initial={{ scale: 0 }}
                    animate={{ scale: ready ? 1 : 0 }}
                    transition={{ type: 'spring', duration: 0.5 }}
                >
                    {children}
                </motion.div>
            </_Modal>,
            document.getElementById('modal-root')        
        )
    }
    return null

    // return (
    //     <_Modal ready={ready} theme={theme}>
    //         <div className='content'>
    //             {children}
    //         </div>
    //     </_Modal>
    // )
}