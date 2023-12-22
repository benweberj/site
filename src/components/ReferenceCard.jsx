import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

const RefCard = styled.div`
    position: relative;
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
    const tipRef = useRef(null)
    const { reference } = props

    function repositionTooltip() {
        const dim = tipRef.current.getBoundingClientRect()
        let w = window.innerWidth
        let h = window.innerHeight
        let gap = 10
        let overlapX = (dim.x + dim.width) - w

        if (overlapX > 0 && active) { // overflow right
            console.log('overflow right by ', overlapX, 'px')
            tipRef.current.style.left = `calc(105% - ${overlapX + gap}px)`
        } else {
            tipRef.current.style.left = `105%`
        }
    }

    function checkForOutsideClick(e) {
        e.stopPropagation()
        let x = e.clientX
        let y = e.clientY
        let dim = tipRef.current.getBoundingClientRect()
        console.log(`checking if click (${x}, ${y}) is inside: `, dim)

        // if (active) {
            if (x > dim.right || x < dim.left || y < dim.top || y > dim.bottom) {
                console.log('outside')
                setActive(false)
            } else {
                console.log('inside')
            }
            // if (!tipRef.current.contains(e.target)) {
            //     console.log('outside -- closing tooltip')
            //     setActive(false)
            // } else {
            //     console.log('clicked on tooltip')
            // }
        // }
    }


    useEffect(() => {
        window.addEventListener('resize', repositionTooltip)
        document.addEventListener('click', checkForOutsideClick)
        
        return () => {
            window.removeEventListener('resize', repositionTooltip)
            window.removeEventListener('click', checkForOutsideClick)
        }
        
    }, [])


    useEffect(() => {
        repositionTooltip()
    })




    const contact = {}
    if (reference.linkedIn) contact.linkedIn = reference.linkedIn
    if (reference.number) contact.number = reference.number
    if (reference.github) contact.github = reference.github
    if (reference.email) contact.email = reference.email

    const hasContact = Object.keys(contact).length > 0

    return (
        <RefCard className='card iflex' onClick={() => !active && setActive(true)}>
            <h4 className='thin'>{reference.name}</h4>
            <h5 className='thin mtxs'>{reference.former && <span className='faded'>Former </span>}{reference.title}</h5>
            {/* <p>{JSON.stringify(reference)}</p> */}

            <div ref={tipRef} className={`tooltip card ${active && 'active'}`}>
                {Object.keys(contact).map(media => (
                    <p className='mbs'>{media}: {contact[media]}</p>
                ))}         
            </div>
        </RefCard>
    )

}