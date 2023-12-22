import styled from 'styled-components'

import { useTheme } from '../extras/ThemeContext'

const _Modal = styled.section`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: ${props => props.theme.bg}f8;
    z-index: 1;
    transition: all 0.25s ease;

    opacity: ${props => props.ready ? 1 : 0};
    user-select: ${props => !props.ready && 'none'};
    pointer-events: ${props => !props.ready && 'none'};

    header {

        .close-btn {
            padding: 0;
            width: 40px;
            height: 40px;
        }

    }

    main {
        padding: 10vmin;
        padding-top: 0;
    }
`

export default function Modal(props) {
    const [theme,_] = useTheme()
    const { ready, onClose, children } = props

    return (
        <_Modal ready={ready} theme={theme}>
            <header className='flex end pm'>
                <button className='close-btn' onClick={onClose}>X</button>
            </header>
            <main className='debug'>
                {children}
            </main>
        </_Modal>
    )
}