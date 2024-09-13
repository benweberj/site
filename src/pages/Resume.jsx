import { useEffect } from 'react'
import styled from 'styled-components'

import { Main } from '../components/index'
import { useTheme } from '../extras/ThemeContext'


import { useState } from 'react'




const ResumeContainer = styled.iframe`
    height: 100%;
    width: 100%;
    border: 1px solid red;
`

const Header = styled.div`
    cursor: pointer;
    transition: all 0.35s ease;
    &:hover {
        opacity: 0.5;
    }

    img {
        filter: ${props => props.theme.mode==='dark' ? 'invert(1)' : 'none'};
    }
`


export default function Resume() {
    const [theme, _] = useTheme()
    
    useEffect(() => {

    }, [])

    return (
        <Main frombottom>
            {/* <h1 className='mbm'>Resume</h1> */}
            <a href={process.env.PUBLIC_URL + '/benweber-resume.pdf'} download><Header className='flex align-center end mbs'>
                <img src={process.env.PUBLIC_URL + '/img/download.png'} width={15} className='mrs scale-hover' />
                <h4 className='thin'>Download</h4>
            </Header></a>
            <img src={process.env.PUBLIC_URL + `/img/resume${theme.mode==='dark' ? '-dark' : ''}.png`} width="100%" className='rounded' />


            {/* <p>TODO</p> */}
            {/* <ResumeContainer id='resume-container' src='/resume.pdf' /> */}
            {/* <object data="/resume.pdf" type="application/pdf" width="100%" height="100%" className='rounded'>
                <p>Alternative text - include a link <a href="http://africau.edu/images/default/sample.pdf">to the PDF!</a></p>
            </object> */}
            
        </Main>
    )
}
