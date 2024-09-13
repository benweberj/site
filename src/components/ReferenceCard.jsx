import { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Toaster, toast } from 'react-hot-toast'

import { Modal, SVG, AnimateHeight } from './index'
import { copyToClipboard } from '../extras/tools'
import { useTheme } from '../extras/ThemeContext'

const RefCard = styled.div`
    cursor: pointer;

    .tooltip {
        transition: all 0.25s ease;
        position: absolute;
        border: 1px solid red;
        opacity: 0.1;
        pointer-events: none;
        user-select: none;
        // backdrop-filter: blur(5px);
        background: ${props => props.theme.base};
        z-index: 5;
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
    const [showMore, setShowMore] = useState(false) // to expand the 'contact-me' section after a short delay

    const contact = {}
    if (reference.linkedIn) contact.linkedIn = reference.linkedIn
    if (reference.number) contact.number = reference.number
    if (reference.github) contact.github = reference.github
    if (reference.email) contact.email = reference.email

    const hasContact = Object.keys(contact).length > 0

    const toastProps = {
        style: {
            background: theme.complement,
            color: theme.base,
            fontSize: '0.8rem',
            padding: '5px 15px',
        }
    }


    function handleContactClick(type) {
        console.log(reference, type)
        if (type == 'linkedIn') window.open(reference.linkedIn, '_blank')
        if (type == 'github') window.open(reference.github, '_blank')

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

    function giveMyEmail() {
        copyToClipboard('ben.weberj@gmail.com')
        toast('I\'ve copied my email to your clipboard', toastProps)
    }

    useEffect(() => {
        if (active) {
            const timer = setTimeout(() => {
                setShowMore(true)
            }, 900);
            return () => clearTimeout(timer);
        } else {
            setShowMore(false)
        }
    }, [active])

    return (
        <>
            {isBrowser && ReactDOM.createPortal(
                <Toaster style={{ zIndex: 9999 }} />,
                document.getElementById('aux-root')
            )}

            {/* <Toaster style={{ zIndex: 9999 }} /> */}

            <RefCard className='card iflex hoverable' onClick={() => setActive(!active)}>
                <h4>{reference.name}</h4>
                <h5 className='thin mtxs' style={{ opacity: 0.8 }}>{reference.former && <span className='faded'>Former </span>}{reference.title}</h5>
            </RefCard>

            <Modal ready={active} onClose={() => setActive(false)} overflow='hidden'>
                {/* <p>{JSON.stringify(reference)}</p> */}
                <div style={{ padding: '3vmin' }}>
                    <h2>{reference.name}</h2>
                    <h3 style={{ marginBottom: '2rem' }} className='thin mtxs'>{reference.former && <span className='faded'>Former </span>}{reference.title}</h3>

                    {hasContact ? Object.keys(contact).map((social, i) => (
                        <div className='split mbs'>
                            <h4>{social}</h4>
                            <SVG name={social} onClick={() => handleContactClick(social)} className='scale-hover' />
                        </div>
                    ))
                    : <h4 className='faded thin'>{reference.name} has no available public profiles</h4>}
                </div>

                {active && <motion.p
                        className='contact-reference'
                        style={{ position: 'absolute', width: '100vw', left: 0, bottom: '10vh', textAlign: 'center', padding: '5vmin' }}
                        initial={{ transform: 'translateY(50px)', opacity: 0 }}
                        animate={{ transform: `translateY(${showMore ? 0 : 50}px)`, opacity: showMore ? 1 : 0 }}
                    >
                    <b className='contact-me underline-hover' onClick={giveMyEmail}>Contact me </b>
                    for more ways to reach {reference.name.split(' ')[0]}
                </motion.p>}


            </Modal>
        </>
    )
}