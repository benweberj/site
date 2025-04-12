import { useState } from'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import AnimateHeight from 'react-animate-height'

import { Main, SVG } from '../components/index'

const projects = [
    { name: 'Wordle Solver',    id: 'wordlesolver', desc: 'A solver for the New York Times Wordle.',                    tags: ['react'], code: '' },
    { name: 'Particle Mesh',    id: 'particlemesh', desc: 'A customizable and interactive particle system.',            tags: ['react', 'p5', 'physics'],   code: '' },
    { name: 'Game of Life',     id: 'gameoflife',   desc: 'John Conway\'s zero-player game.',                           tags: ['react', 'automata'],        code: '' },
    { name: 'FireMap',          id: 'firemap',      desc: 'An interactive map to view US wildfires in real-time.',      tags: ['react', 'google maps'],     code: '',       link: 'https://benweberj.github.io/firemap/',  },
    { name: 'Lightning',        id: 'lightning',    desc: 'Rain, thunder, and lightning simulation.',                   tags: ['p5', 'recursion'],          code: '' },
    { name: 'Poly Mesh',        id: 'polymesh',     desc: 'A dynamic mesh of connected polygons with fluid vertices.',  tags: ['p5', 'physics'],            code: '' },
    { name: 'Pixel Snakes',     id: 'pixelsnakes',  desc: 'Snakes moving through a pixel grid.',                        tags: [ 'p5'],                      code: '' },

    { name: 'Birthday Card',    id: 'birthdaycard', desc: 'A digital birthday card for my Dad. (Made in 1 hour, don\'t judge)',                        tags: ['react', 'p5'],              code: '',       link: 'https://thebirthdayboy.vercel.app/',},
    // !TODO: project idea -- audio/singing  -> MIDI
    // might need to use python or somethin
    // record audio of you humming a song or something. Doesnt even need to be a song, it should work with any words
    // assign each second, or each sequential group of similar sounds (holding a note), to a note (EGBDAF...) and durarion (1/8, 1/4,1/2, ...)
    // possible generate sheet music? Or simplisticly, just something like Beatlab, Ableton, ...
    // would be sick
]

export default function Projects(props) {
    const [hovered, setHovered] = useState(null)


    return (
        <Main fromright>
            <Gallery>
                {projects.map((project, i) => (
                    // <Link to={project.link || `/projects/${project.id}`}>
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, transform: 'rotateX(100deg)' }}
                            animate={{ opacity: 1, transform: 'rotateX(0deg)', transition: { type: 'spring', delay: i * 0.05 } }}
                        >
                            <div className='card entry center col rel contain' debug onMouseEnter={() => setHovered(project.id)} onMouseLeave={() => setHovered(null)}>
                                <div className='center'>
                                    <SVG name={project.id} w={50} />
                                    
                                    <div className='flex col pll'>
                                        <h2 className='mbs'>{project.name}</h2>
                                        <div className='flex'>
                                            {project.tags.map((tag, i) => <button className='chip-sm inactive mrs'>{tag}</button>)}
                                        </div>
                                    </div>
                                </div>

                                {/* <AnimateHeight height={(hovered === project.id) ? 'auto' : 0}>
                                    <p className='pym'>{project.desc}</p>
                                </AnimateHeight> */}
                                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: (hovered === project.id) ? 'auto' : 0, opacity: (hovered===project.id) ? 1 : 0 }}>
                                    <p className='pym'>{project.desc}</p>
                                </motion.div>



                                <div className='flex center sep-sm' style={{ position: 'absolute', bottom: 10, right: 10 }}>
                                
                                    <motion.div initial={{ y: 0, opacity: 0 }}  animate={{ opacity: (hovered===project.id) ? 1 : 0, y: (hovered===project.id) ? 0 : 50 }} transition={{ delay: .1, duration: .25 }}>
                                        <Link to={project.code}>
                                            <button className='chip inverse'>Code</button>
                                        </Link>
                                    </motion.div>

                                    <motion.div initial={{ y: 0, opacity: 0 }}  animate={{ opacity: (hovered===project.id) ? 1 : 0, y: (hovered===project.id) ? 0 : 50 }} transition={{ delay: .25, duration: .25 }}>
                                        {project.link ? (
                                            <a href={project.link} target='_blank' rel='noreferrer noopener'>
                                                <button className='chip inverse'>View</button>
                                            </a>
                                        ) : (
                                            <Link to={`/projects/${project.id}`}>
                                                <button className='chip inverse'>View</button>
                                            </Link>
                                        )}
                                        
                                    </motion.div>
                                </div>
                               

                                {/* <p>{project.desc}</p> */}
                            </div>
                        </motion.div>
                    // </Link>
                ))}
            </Gallery>
        </Main>
    )
}

const Gallery = styled.div`
    // border: 1px solid red;
    display: grid;
    grid-gap: 2vmin;
    grid-template-columns: repeat(auto-fit,  minmax(min(400px, 100%), 1fr));

    .entry {
        min-height: 15rem;
        // border: 1px dashed white;
    }
`

// import { useState } from 'react'
// import { ReactP5Wrapper } from 'react-p5-wrapper'
// import styled from 'styled-components'

// import BackButton from './BackButton'
// import AnimatedLogo from './AnimatedLogo'
// import particles from './sketches/particleMesh'
// import matrix from './sketches/rainingCode'
// import WordleSolver from './WordleSolver'

// const projects = {
//     'particles': { type: 'animation', implemented: true, id: 'particles', name: 'Particle Mesh', description: '...', github: 'https://github.com/benweberj/particle_mesh'},
//     'wordle': { type: 'tool', implemented: true, id: 'wordle', name: 'Wordle Solver', description: '...', github: ''},
//     'matrix': { type: 'animation', implemented: true, id: 'matrix', name: 'Raining Code', description: '...', github: 'https://github.com/benweberj/matrix'},
//     // 'orbit': { implemented: false, id: 'orbit', name: 'Orbit', description: '...', github: ''},
//     // 'mech': { implemented: true, id: 'mech', name: 'Mech', description: '...', github: ''},
//     // 'lightning': { implemented: false, id: 'lightning', name: 'Lightning', description: '...', github: 'https://github.com/benweberj/lightning'},
//     // 'snake': { implemented: false, id: 'snake', name: 'Snake', description: '...', github: ''},
//     // 'avoid': { implemented: false, id: 'avoid', name: 'Avoid', description: '...', github: ''},
//     // 'fireworks': { implemented: false, id: 'fireworks', name: 'Fireworks', description: '...', github: ''},
//     // { id: 'lightspeed', name: 'LightSpeed', description: '...', },
// }

// const ProjectsContainer = styled.div`
//     padding: 5vw;
//     z-index: 99;
//     overflow-y: scroll;
//     pointer-events: ${props => !props.ready && 'none'};
//     user-select: ${props => !props.ready && 'none'};
//     transition: opacity 0.5s ease;
//     opacity: ${props => props.ready ? 1 : 0};

//     h1 {
//         transition: all 0.5s ease;
//         transform: translateY(${props => props.ready ? 0 : 30}px);
//         opacity: ${props => props.ready ? 1 : 0};
//         z-index: 99999;
//     }

//     .project-gallery {
//         max-width: 800px;
//         width: 100%;
//         display: grid;
//         grid-gap: 10px;
//         grid-template-columns: repeat(auto-fill, minmax(max(1vw, 150px), 1fr));
//         justify-content: center;
        
//         user-select: ${props => !props.ready && 'none'};
//         pointer-events: ${props => !props.ready && 'none'};

//         .project-card {
//             cursor: pointer;
//             height: 100px;
//             border-radius: 10px;
//             background: #fff;
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             flex-direction: column;
//             transition: none;
//             transform: scale(${props => props.ready ? 1 : 0});
//             position: relative;
//             overflow: hidden;
//             z-index: 999999;
//             .name-and-btns {
//                 transform: translateY(-100px);
//                 transition: all 0.5s ease;
//             }

//             &.hovered {
//                 > .project-preview { transform: translateY(100px) }

//                 &.tool:after {
//                     background: #8d8be6;
//                     color: white;
//                     transform: scale(0.9);
//                     transform-origin: bottom;
//                     font-weight: bold;
//                     bottom: 2px;
//                     left: 0px;
//                 }

//                 &.animation:after {
//                     background: #e9ca24;
//                     transform: scale(0.8);
//                     transform-origin: bottom;
//                     font-weight: bold;
//                     bottom: 2px;
//                     left: -6px;
//                 }

//                 .name-and-btns { transform: translateY(0px) }
//             }

//             > .project-preview {
//                 position: absolute;
//                 transition: all 0.5s ease;
//                 user-select: none;
//                 pointer-events: none;

//                 transform: translateY(0px);
                
//             }

//             p {
//                 color: black;
//                 transition: all 0.1s ease;
//                 height: 1.1rem;
//             }
//             .btns {
//                 display: flex;
//                 margin-top: 1vw;

//                 button {
//                     filter: invert(1);
//                     padding: 5px 15px;
//                     margin: 3px;
//                 }
//             }
//         }
//     }
// `

// const ParticlesInstructions = styled.div`
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     transition: all 0.5s ease;
//     pointer-events: none;
//     user-select: none;

//     ul {
//         margin-top: 1rem;
        
//         li {
//             margin-left: 2rem;
//             margin-bottom: 1rem;
//         }
//     }

//     &.hidden { opacity: 0 }
// `

// export default function Projects(props) {
//     const { ready, setPage } = props
//     const [curProject, setCurProject] = useState(null)
//     const [hoveredProject, setHoveredProject] = useState(null)
//     const viewing = !!curProject

//     return (
//         <>
//             <ProjectsContainer ready={ready && !viewing} className='abs full col center'>
//                 <BackButton ready={ready && !viewing} onClick={() => setPage('landing')} />
//                 <h1>Coding Projects</h1>
                
//                 <div className='project-gallery'>
//                     {Object.keys(projects).map((id, i) => {
//                         const p = projects[id]
//                         const hov = hoveredProject == id
                        
//                         return (
//                             <div
//                                 className={`project-card ${p.type} ${hov && 'hovered'}`}
//                                 style={{ transition: `all 0.5s ease, transform 0.5s ease ${i*.1}s` }}
//                                 onMouseOver={() => setHoveredProject(id)}
//                                 onMouseOut={() => setHoveredProject(null)}
//                             >
//                                 <div className='name-and-btns col center'>
//                                     <p>{p.name}</p>
//                                     <div className='btns'>
//                                         <button onClick={() => window.open(p.github, '_blank')}>Code</button>
//                                         <button onClick={() => setCurProject(p.id)}>View</button>
//                                     </div>
//                                 </div>
//                                 <div className='project-preview'>
//                                     <AnimatedLogo project={id} ready={ready} hovered={hov} />
//                                 </div>

//                             </div>
//                         )
//                     })}
//                     <div
//                         className='project-card col center'
//                         style={{
//                             color: 'black',
//                             padding: '2vw',
//                             textAlign: 'center',
//                             opacity: 0.5,
//                             transition: 'all 0.5s ease, transform 0.5s ease 0.5s'
//                         }}
//                     >
//                         Many more coming soon
//                     </div>
//                 </div>
//             </ProjectsContainer>
            
//             <WordleSolver ready={curProject == 'wordle'} />

//             {curProject=='particles' && <ReactP5Wrapper sketch={particles} />}
//             {curProject=='matrix' && <ReactP5Wrapper sketch={matrix} />}

//             <ParticlesInstructions id='particles-instructions' className={(curProject != 'particles') && 'hidden'}>
//                 <p>Particles are attracted to eachother and to your cursor</p>
//                 <ul>
//                     <li><b>Click</b> to add a particle</li>
//                     <li><b>Click and hold</b> to repel particles</li>
//                     <li>Press <code>g</code> to toggle particle interactions</li>
//                     <li>Press <code>c</code> to toggle connection lines</li>
//                     <li>Press <code>b</code> to toggle screen boundary</li>
//                     <li>Increase/decrease attraction strength with <code>{'['}</code> and <code>{']'}</code></li>
//                     <li>Press <code>x</code> to clear all particles</li>
//                 </ul>
//             </ParticlesInstructions>

//             <BackButton ready={viewing} onClick={() => setCurProject(null)} />

//             {/* hacky way to add the title for now */}
//             <Title ready={curProject == 'particles'}>Particle Mesh</Title>
//             <Title ready={curProject == 'matrix'}>Raining Code</Title>
//         </>
//     )
// }

// const Title = styled.h1`
//     transition: all 0.5s ease;
//     user-select: none;
//     pointer-events: none;
//     position: fixed;
//     top: 1vw;
//     left: 1vw;
//     transform: translateX(${props => props.ready ? 0 : -30}px);
//     opacity: ${props => props.ready ? 1 : 0};
//     z-index: 9999999999999;
//     font-size: 2rem;
// `