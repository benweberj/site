import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

import { Main, Socials, TwoFace } from '../components/index'
import { useTheme } from '../extras/ThemeContext'

export default function Home(props) {
    const [ready, setReady] = useState(false)

    useEffect(() => {
        setReady(true)
    }, [])
    
    return (
        <Main className='flex col center' style={{ padding: 0 }}>
            <TwoFace ready={ready} />
            
            <div className='col center'>
                <motion.h1 className='xxl normal mts'
                    initial={{ transform: 'translateX(80px)', opacity: 0 }}
                    animate={ready && { transform: 'translateX(0px)', opacity: 1, transition: { type: 'spring'} }}
                >
                    Ben Weber
                </motion.h1>
                
                <motion.h3 className='xl faded thin mbm'
                    initial={{ transform: 'translateX(-80px)', opacity: 0 }}
                    animate={ready && { transform: 'translateX(0px)', opacity: 0.5, transition: { type: 'spring'} }}
                >
                    Web Developer
                </motion.h3>
            </div>
            
            <div className='col center'>
                <Socials ready={ready} />
                
                <Links className='flex sep-md' style={{ marginTop: '8vh' }}>
                    <Link to='/work'>
                        <motion.div
                            className='card quiet'
                            initial={{ y: 40, opacity: 0 }}
                            animate={{ y: 0, opacity: .7 }}
                            transition={{ type: 'spring', duration: 0.25, delay: 0.4 }}
                        >
                            <h4>Work</h4>
                        </motion.div>
                    </Link>

                    <Link to='/designs'>
                        <motion.div
                            className='card quiet'
                            initial={{ y: 40, opacity: 0 }}
                            animate={{ y: 0, opacity: .7 }}
                            transition={{ type: 'spring', duration: 0.25, delay: 0.5 }}
                        >
                            <h4>Designs</h4>
                        </motion.div>
                    </Link>

                    <Link to='/projects'>
                        <motion.div
                            className='card quiet'
                            initial={{ y: 40, opacity: 0 }}
                            animate={{ y: 0, opacity: .7 }}
                            transition={{ type: 'spring', duration: 0.25, delay: 0.6 }}
                        >
                            <h4>Projects</h4>
                        </motion.div>
                    </Link>

                </Links>
            </div>
        </Main>
    )
}


const Links = styled.div`
    div {
        padding: .75rem 1.5rem;
        border-radius: 0.5rem;
        &:hover {
            opacity: 1 !important;
        }

        h4 {
            font-weight: 400;
        }
    }
`