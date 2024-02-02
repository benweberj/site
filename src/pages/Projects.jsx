import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

import { Main } from '../components/index'

const projects = [
    { name: 'Wordle Solver', id: 'wordlesolver', desc: 'A solver for the game Wordle that generates all possible words based on the current state of your Wordle game.' },
    { name: 'Particle Mesh', id: 'particlemesh', desc: 'A particle system where particles are attracted to each other and to your cursor.' },
    { name: 'Game of Life', id: 'gameoflife', desc: 'A clone of John Conway\'s zero-player game, Game of Life.' },
    { name: 'Poly Mesh', id: 'polymesh', desc: 'A dynamic mesh of connected polygons with fluid vertices.' },
    { name: 'Pixel Snakes', id: 'pixelsnakes', desc: 'A grid of pixels with snakes moving throughout the cells.' },
    { name: 'Lightning', id: 'lightning', desc: '...' },
    // !TODO: project idea -- audio/singing  -> MIDI
    // might need to use python or somethin
    // record audio of you humming a song or something. Doesnt even need to be a song, it should work with any words
    // assign each second, or each sequential group of similar sounds (holding a note), to a note (EGBDAF...) and durarion (1/8, 1/4,1/2, ...)
    // possible generate sheet music? Or simplisticly, just something like Beatlab, Ableton, ...
    // would be sick
]

export default function Projects(props) {
    return (
        <Main fromright>
            {projects.map((project, i) => (
                <Link to={`/site/projects/${project.id}`}>
                    <motion.div
                        className='mbm'
                        key={project.id}
                        initial={{ opacity: 0, transform: 'translateX(50px)' }}
                        animate={{ opacity: 1, transform: 'translateX(0px)', transition: { type: 'spring', delay: i * 0.1 } }}
                    >
                        <div className='card'>
                            <h3 className='mbs'>{project.name}</h3>
                            <p>{project.desc}</p>
                        </div>
                    </motion.div>
                </Link>
            ))}
        </Main>
    )
}

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