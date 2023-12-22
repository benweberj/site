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
                
                <Links className='flex sep-md' style={{ marginTop: '5vh' }}>
                    <Link to='/work'>
                        <motion.div
                            className='center sep-sm work'
                            initial={{ transform: 'translateX(60px)', opacity: 0 }}
                            animate={{ transform: 'translateX(10px)', opacity: 0.7 }}
                            transition={{ type: 'spring', duration: 0.5, delay: 0.7 }}
                        >
                            <img src='/img/back.png' />
                            <h4>Work</h4>
                        </motion.div>
                    </Link>

                    <Link to='/projects'>
                        <motion.div
                            className='center sep-sm projects'
                            initial={{ transform: 'translateX(-40px)', opacity: 0 }}
                            animate={{ transform: 'translateX(10px)', opacity: 0.7 }}
                            transition={{ type: 'spring', duration: 0.5, delay: 0.8 }}
                        >
                            <h4>Projects</h4>
                            <img src='/img/back.png' />
                        </motion.div>
                    </Link>
                </Links>
            </div>
        </Main>
    )
}


const Links = styled.div`
    div {

        img {
            width: 15px;
            transition: all 0.25s ease;
            filter: ${props => props.theme.mode==='dark' && 'invert()'};
        }

        &.projects {
            img {
                transform: rotate(180deg);
            }
        }

        &:hover {
            opacity: 1 !important;
            img {
                transform: translateX(-10px);
            }

            &.projects {
                img {
                    transform: translateX(10px) rotate(180deg);
                }
            }
        }
    }
`