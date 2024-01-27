import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import styled from 'styled-components'

import { useTheme }  from '../extras/ThemeContext'
import { Main, AnimateHeight, Omic, ReferenceCard } from '../components/index'

const _Work = styled.section`

    > .card {
        margin-bottom: 1rem;
        
        &:hover {
            opacity: 1;
        }
        
        .logo {
            width : 40px;
            margin-right: 20px;
            filter: ${props => props.theme.mode==='dark' && 'invert()'};
            opacity: ${props => props.theme.mode==='dark' ? 1 : 0.7};
            transition: opacity 0.25s ease;
        }
        
        .buttons {
            button img {
                filter: ${props => props.theme.mode=='dark' ? 'invert()' : 'none'};
            }
            button:hover, button.selected {
                img {
                    filter: ${props => props.theme.mode==='light' ? 'invert()' : 'none'}
                }
            }
        }

        @media (max-width: 800px) {
            .intro {
                flex-direction: column;
                
                h1,h2,h3, h4 {
                    text-align: center;
                }

                .logo {
                    display: none;
                }

                .title {
                    padding-bottom: 0;
                }

                .buttons {
                    margin: none;
                    padding: none;
                    
                    button {
                        padding: 8px 20px;
                    }
                }
            }
        }
    }
`
const lorem = 'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidid unt ut labore et dolore magna aliqua. Ut enim ad minim veniam'
const jobs = [
    {
        id: 'omic',
        title: 'Lead Web Developer',
        company: 'Omic MD',
        years: '(2020-2021)',
        desc: <>At Omic, I revamped the website for our biology API, replacing verbose MUI components with my own suite of highly customizable components, allowing for a cleaner and  faster design prototyping process. I introduced <span className='oneline highlight'>Glass UI</span>, a minimalist aesthetic with translucent components and custom icons. The result was a futuristic and sleek user experience, evoking a sense of effortless interaction with complex data.</>,
        tech: true,
        link: 'https://www.omic.ai/',
        references: [
            {  name: 'Gabriel Richman', title: 'Founder & CEO', former: false, linkedIn: 'https://www.linkedin.com/in/gabrielrichman/', email: 'richman@gmail.com', number: '(415)690-9654' },
            {  name: 'Luke Weber', title: 'CTO', former: true, github: 'https://github.com/lkwbr', email: 'lkgwbr@gmail.com' },
        ]
    },
    {
        id: 'wsu',
        title: 'Events Worker',
        company: 'Washington State University',
        years: '(2022-Present)',
        desc: lorem,
        tech: false,
        link: 'https://events.wsu.edu/',
        references: [
            { name: 'Sarah Mahaffy', title: 'Director of Events', former: false, linkedIn: 'https://www.linkedin.com/in/sarah-mahaffy-9b4686197/' },
            { name: 'Jason Abrams', title: '...', former: true, linkedIn: 'https://www.linkedin.com/in/jason-abrams-4857517b/' },
        ]
    },
    {
        id: 'avole',
        title: 'Barista',
        company: 'Avole Coffee',
        years: '2019',
        desc: lorem,
        tech: false,
        link: 'https://www.avolecoffee.com/',
        references: [
            { name: 'Gavin Amos', title: 'Shop Manager', former: false, linkedIn: 'https://www.linkedin.com/in/gavin-amos-4b6b1a112/', number: '(661) 873-5440' },
        ]
    },
    {
        id: 'super1',
        title: 'Deli Clerk',
        company: 'Super 1 Foods',
        years: '2018',
        desc: lorem,
        tech: false,
        link: 'https://www.super1foods.com/',
        references: [
            { name: 'Esteban Sevilla-nava Jr.', title: 'Deli Lead', former: true, linkedIn: 'https://www.linkedin.com/in/esteban-sevilla-9a490988/' }
        ]
    },
    {
        id: 'charltonfarms',
        title: 'Farm Equipment Technician',
        company: 'Charlton Farms',
        years: '(2016-2018)',
        desc: lorem,
        tech: false,
        link: 'https://wagrown.com/wagrown-farms/farms/item/charlton-farms',
        references: [
            { name: 'Kevin Tostenson', title: '', former: '' }
        ]
    },
]

export default function Work(props) {
    const [viewing, setViewing] = useState('omic')
    // const [hovering, setHovering] = useState(null)

    const [theme, _] = useTheme()

    function makeCards(tech=false) { // tech = omic
        return jobs.filter(j => j.tech==tech).map((j, i) => (
            <motion.div
                initial={{ transform: 'translateX(-100px)' }}
                animate={{ transform: 'translateX(0px)', transition: { delay: i*0.1, type: 'spring' }}}
                key={j.title}
                className={`card ${viewing && (viewing !== j.id) && !j.tech ? 'faded' : ''} ${viewing===j.id && 'selected'} ${j.tech && 'pl'}`}
                style={{ position: 'relative', transition: 'opacity 0.25s ease' }}
            >

                <div className='flex split intro' onClick={() => setViewing(j.id===viewing ? null : j.id)}>
                    <div className='flex center ps title'>
                        <img className='logo' id={j.id=='omic' && 'omic-beacon'} src={`/img/jobs/${j.id}.png`} />
                        <div>
                            <h3>{j.title}</h3>
                            <h4 className='thin'>{j.company}</h4>
                        </div>
                    </div>

                    <div className='flex center sep-sm buttons ps'>
                        <a href={j.link} target='_blank'><button>Check them out</button></a>
                        <button onClick={() => setViewing(j.id===viewing ? null : j.id)} className={`center ${j.id===viewing && 'selected'}`}>
                            <span className='prs'>{j.id===viewing ? 'Less' : 'More'}</span>
                            <img src='/img/back.png' className='trans' width={15} style={{ transform: `rotate(${viewing === j.id ? 90 : -90}deg)` }} />
                        </button>
                    </div>
                </div>
                <AnimateHeight open={viewing===j.id}>
                        <p className='mym'>{j.desc}</p>
                        {j.tech===true && <Omic />}
                        <h3 className='mbs mtl'>References</h3>
                        <div className='flex sep-sm'>
                            {j.references.map((r, i) => <ReferenceCard reference={r} key={i} />)}
                        </div>
                </AnimateHeight>
            </motion.div>
        ))
    }

    return (
        <Main fromleft>
            <_Work>
                <motion.h2 className='mbs'
                    initial={{ transform: 'translateY(50px)' }}
                    animate={{ transform: 'translateY(0px)', transition: { type: 'spring' } }}
                >Tech Work
                </motion.h2>
                {makeCards(true)}

                <motion.h2 className='mbs mtl'
                    initial={{ transform: 'translateY(50px)' }}
                    animate={{ transform: 'translateY(0px)', transition: { type: 'spring' } }}
                >Other Jobs
                </motion.h2>
                {makeCards(false)}
            </_Work>
        </Main>
    )
}