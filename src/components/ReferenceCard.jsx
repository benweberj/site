import { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { Toaster, toast } from 'react-hot-toast'

import { Modal, SVG } from './index' 
import { copyToClipboard } from '../extras/tools'
import { useTheme } from '../extras/ThemeContext'

const RefCard = styled.div`
    // position: relative;
    cursor: pointer;

    .tooltip {
        transition: all 0.25s ease;
        position: absolute;
        // left: 100%;
        // top: 50%;
        // transform: translate(-50px, -50%);
        border: 1px solid red;
        opacity: 0.1;
        pointer-events: none;
        user-select: none;
        // backdrop-filter: blur(5px);
        background: ${props => props.theme.base};
        z-index: 5;
        // left: 105%;
        top: 50%;
        transform: translateY(-50%);

        &.active {
            // transform: translate(10px, -50%);
            opacity: 1;
            pointer-events: all;
            user-select: all;
        }
    }
`

export default function ReferenceCard(props) {
    const [active, setActive] = useState(false)
    const { reference } = props
    const [theme, _] = useTheme()
    const [isBrowser, setIsBrowser] = useState(false)

    const contact = {}
    if (reference.linkedIn) contact.linkedIn = reference.linkedIn
    if (reference.number) contact.number = reference.number
    if (reference.github) contact.github = reference.github
    if (reference.email) contact.email = reference.email

    const hasContact = Object.keys(contact).length > 0


    function handleContactClick(type) {
        console.log(reference, type)
        if (type == 'linkedIn') window.open(reference.linkedIn, '_blank')
        if (type == 'github') window.open(reference.github, '_blank')

        const toastProps = { style: {
            background: theme.complement,
            color: theme.base,
            fontSize: '0.8rem',
            padding: '5px 15px',
        }}

        if (type == 'number') {
            copyToClipboard(reference.number)
            toast('Number copied', toastProps)
        }

        if (type == 'email') {
            copyToClipboard(reference.email)
            toast('Email copied', toastProps)
        }
    }

    useEffect(() => {
        setIsBrowser(true)
    }, [])

    return (
        <>
        {isBrowser && ReactDOM.createPortal(
            <Toaster style={{ zIndex: 9999 }} />,
            document.getElementById('aux-root')        
        )}

        {/* <Toaster style={{ zIndex: 9999 }} /> */}
        
        <RefCard className='card iflex hoverable' onClick={() => setActive(!active)}>
            <h4 className='thin'>{reference.name}</h4>
            <h5 className='thin mtxs'>{reference.former && <span className='faded'>Former </span>}{reference.title}</h5>


            {/* <div className={`tooltip card ${active && 'active'}`}>
                {Object.keys(contact).map(media => (
                    <p className='mbs'>{media}: {contact[media]}</p>
                ))}         
            </div> */}
        </RefCard>

        <Modal ready={active} onClose={() => setActive(false)}>
            {/* <p>{JSON.stringify(reference)}</p> */}
            <div style={{ padding: '3vmin' }}>
                <h2>{reference.name}</h2>
                <h3 style={{ marginBottom: '2rem' }} className='thin mtxs'>{reference.former && <span className='faded'>Former </span>}{reference.title}</h3>

                {Object.keys(contact).map((social, i) => (
                    <div className='split mbs'>
                        <h4>{social}</h4>
                        <SVG name={social} onClick={() => handleContactClick(social)}/>
                    </div>
                ))}
            </div>
        </Modal>
        </>
    )

}