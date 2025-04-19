import styled from 'styled-components'
import { Main } from '../components/index'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

import Header, { designInfo } from './designs/Header'

export default function Designs() {

    const [expanded, setExpanded] = useState(null)

    return (
        <Main frombottom>
            <div className='hsep-sm'>
           {designInfo.map((d, i) => (
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', duration: 0.5,  delay: i*0.25 }}>
                <Link to={d.id}>
                    <div className='card pl quiet'>
                        <Header id={d.id} />
                    </div>
                </Link>
            </motion.div>
           ))}
           </div>
        </Main>
    )
}

const Gallery = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 200px;
    gap: 10px;
    transition: grid-column 0.3s, grid-row 0.3s;

    > div {
        background: gray;
        transition: all 0.3s ease;
        grid-column: span 1;
        grid-row: span 1;
    }
    
    > div.expanded {
        grid-column: span 2;
        grid-row: span 2;
        z-index: 10;
    }
    
`