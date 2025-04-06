import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import styled from 'styled-components'

import { useTheme }  from '../extras/ThemeContext'
import { Main, AnimateHeight, Omic, ReferenceCard, Test, Parallax } from '../components/index'

const _Work = styled.section`

    // margin-bottom: 20vw;

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

const jobs = [
    {
        id: 'omic',
        title: 'Lead Web Developer',
        company: 'Omic MD',
        years: '(2020-2021)',
        desc: <>At Omic, I revamped the website for our biology API, replacing verbose Material UI code with my own suite of highly customizable components, allowing for a cleaner and faster design prototyping process. I introduced <span className='oneline highlight'>Glass UI</span>, a minimalist aesthetic with translucent components and custom icons. The result was a futuristic and sleek user experience, evoking a sense of effortless interaction with complex data.</>,
        tech: true,
        link: 'https://www.omic.ai/',
        references: [
            {  name: 'Gabriel Richman', title: 'Founder & CEO', former: false, linkedIn: 'https://www.linkedin.com/in/gabrielrichman/' },
            {  name: 'Luke Weber', title: 'CTO', former: true, github: 'https://github.com/lkwbr' },
        ]
    },
    {
        id: 'wsu',
        title: 'Athletics Videographer',
        company: 'Washington State University',
        years: '(2023-Present)',
        tasks: [
            'Operated high-definition cameras in fast-paced environments to deliver live footage for college sporting events, including baseball and basketball',
            'Directed on-screen graphics for WSU basketball games streamed to ESPN'
        ],
        tech: true,
        link: 'https://events.wsu.edu/',
        references: [
            { name: 'Jared Prenguber', title: 'Associate Producer', former: false, linkedIn: 'https://www.linkedin.com/in/jared-prenguber-934baa35/' },
            { name: 'Bob Gibson', title: 'Producer', former: false, linkedIn: 'https://www.linkedin.com/in/bob-gibson-21682633/' },
            { name: 'Spencer Tull', title: 'CougVision Director', former: false, linkedIn: 'https://www.linkedin.com/in/spencer-tull/'  },
        ]
    },
    {
        id: 'wsu2',
        title: 'Campus Events Staff',
        company: 'Washington State University',
        years: '(2022-Present)',
        tasks: [
            'Setup and tore down for events all across the WSU campus, anything from Club Fairs to Commencement',
            'Played butler at high-end dinners & luncheons at the Chancellor\'s Residence, giving guests a glimpse of royalty',
            'Coordinated the digital displays for prominent events, such as slideshows for awards banquets and the reading/displaying of names for WSU Commencement ceremonies',
            
//             , making sure the Chancellor's guests were well taken care of.
// Set up and served a smooth three-course meal, handling everything from apps to dessert.
// Collected plates and drinks during open houses, keeping things running smoothly.
// Took charge of the bar, serving up drinks with a smile.
// Managed setup and teardown for each event, keeping it all seamless.
//             '',
//             ''
        ],
        tech: false,
        link: 'https://events.wsu.edu/',
        references: [
            { name: 'Sarah Mahaffy', title: 'Director of Events', former: false, linkedIn: 'https://www.linkedin.com/in/sarah-mahaffy-9b4686197/' },
            { name: 'Jason Abrams', title: 'Assistant Director of Events', former: true, linkedIn: 'https://www.linkedin.com/in/jason-abrams-4857517b/' },
            { name: 'Ashlynn Phillips', title: 'Event Coordinator', former: false, linkedIn: 'https://www.linkedin.com/in/ashlynn-phillips-2a0253225/' },
            { name: 'Jennifer Willis', title: 'Event Coordinator', former: false, linkedIn: 'https://www.linkedin.com/in/jennifer-n-willis/' }
        ],

    },
    // {
    //     id: 'avole',
    //     title: 'Barista',
    //     company: 'Avole Coffee',
    //     years: '2019',
    //     tasks: [
    //         '1',
    //         '2'
    //     ],
    //     tech: false,
    //     link: 'https://www.avolecoffee.com/',
    //     references: [
    //         { name: 'Gavin Amos', title: 'Executive of Business Development', former: false, linkedIn: 'https://www.linkedin.com/in/gavin-amos-4b6b1a112/' },
    //     ]
    // },
    // {
    //     id: 'super1',
    //     title: 'Deli Clerk',
    //     company: 'Super 1 Foods',
    //     years: '2018',
    //     tasks: [
    //         '1',
    //         '2'
    //     ],
    //     tech: false,
    //     link: 'https://www.super1foods.com/',
    //     references: [
    //         { name: 'Esteban Sevilla-nava Jr.', title: 'Deli Lead', former: true, linkedIn: 'https://www.linkedin.com/in/esteban-sevilla-9a490988/' }
    //     ]
    // },
    {
        id: 'charltonfarms',
        title: 'Farm Equipment Technician',
        company: 'Charlton Farms',
        years: '(2016-2018)',
        tasks: [
            'Operated and maintained a range of farm equipment, including balers, fluffers, and rakes, to optimize crop production and harvest efficiency',
            'Performed routine inspections, repairs, and maintenance on equipment to ensure peak performance and longevity'
        ],
        tech: false,
        link: 'https://wagrown.com/wagrown-farms/farms/item/charlton-farms',
        references: [
            { name: 'Mark Charlton', title: 'President', former: false },
            { name: 'Kevin Tostenson', title: 'Foreman', former: true }
        ]
    },
]

export default function Work(props) {
    const [viewing, setViewing] = useState(null)
    // const [hovering, setHovering] = useState(null)

    const [theme, _] = useTheme()

    // styles the jobs array into JSX cards
    // tech=omic for now
    function makeCards() {
        const dark = theme.mode === 'dark'
        const cards = jobs.map((j, i) => (
            <motion.div
                initial={{ transform: 'translateX(-100px)' }}
                animate={{ transform: 'translateX(0px)', transition: { delay: i*0.1, type: 'spring' } }}
                key={j.title}
                className={`card pl contain ${viewing && (viewing !== j.id)  ? 'faded' : ''} ${viewing===j.id && 'selected'} ${j.id==='omic' && dark && 'glow-border'}`}
                style={{ position: 'relative', transition: 'opacity 0.25s ease' }}
            >
                {console.log(j.id)}

                <div className='flex split intro' onClick={() => setViewing(j.id===viewing ? null : j.id)}>
                    <div className='flex center ps title'>
                        <img className='logo' id={j.id=='omic' && 'omic-beacon'} src={`${process.env.PUBLIC_URL}/img/jobs/${j.id}.png`} />
                        <div>
                            <h3>{j.title}</h3>
                            <h4 className='thin mts'>{j.company}</h4>
                        </div>
                    </div>

                    <div className='flex center sep-sm buttons ps'>
                        <a href={j.link} target='_blank'><button>Check them out</button></a>
                        <button onClick={() => setViewing(j.id===viewing ? null : j.id)} className={`center ${j.id===viewing && 'selected'}`}>
                            <span className='prs'>{j.id===viewing ? 'Less' : 'More'}</span>
                            <img src={process.env.PUBLIC_URL + '/img/back.png'} className='trans' width={15} style={{ transform: `rotate(${viewing === j.id ? 90 : -90}deg)` }} />
                        </button>
                    </div>
                </div>
                <AnimateHeight open={viewing===j.id}>
                    {/* Just for Omic */}
                    {j.desc && <p className='mym'>{j.desc}</p>}
                    
                    {/* For all non-tech jobs */}
                    {j.tasks && <ul className='task-list pts pll'>
                        {j.tasks.map((task, i) => (
                            <li key={`task-${j.id}-${i}`} className='ptm'>
                                {task}
                            </li>
                        ))}
                        
                    </ul>}

                    {j.id === 'omic' && <Omic />}
                    <h3 className='mbs mtl'>References</h3>
                    <div className='flex sep-sm'>
                        {j.references.map((r, i) => <ReferenceCard reference={r} key={i} />)}
                    </div>
                </AnimateHeight>
            </motion.div>
        ))

        return cards
    }

    return (
        <Main fromleft>
            <_Work>
                {makeCards()}
            </_Work>
        </Main>
    )
}