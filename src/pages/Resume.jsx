import { useEffect } from 'react'
import styled from 'styled-components'

import { Main } from '../components/index'

const ResumeContainer = styled.iframe`
    height: 100%;
    width: 100%;
    border: 1px solid red;
`


export default function Resume() {
    
    useEffect(() => {
        // PDFObject.embed("/resume.pdf", "#resume-container")
    }, [])

    return (
        <Main frombottom>
            <h1 className='mbm'>Resume</h1>
            {/* <ResumeContainer id='resume-container' src='/resume.pdf' /> */}
            <object data="/resume.pdf" type="application/pdf" width="100%" height="100%" className='rounded'>
                <p>Alternative text - include a link <a href="http://africau.edu/images/default/sample.pdf">to the PDF!</a></p>
            </object>
            
        </Main>
    )
}