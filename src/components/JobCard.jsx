// import { motion } from 'framer-motion'

// import { AnimateHeight } from './index'

// export default function JobCard(props) {
//     const { job: j, idx, onClick, viewing }  = props

//     return (
//         <motion.div
//             initial={{ transform: 'translateX(-100px)' }}
//             animate={{ transform: 'translateX(0px)', transition: { delay: idx*0.1, type: 'spring' }}}
//             key={j.title}
//             className={`card sm trans ${viewing && viewing !== j.id ? 'faded' : ''} ${viewing===j.id && 'selected'}`}
//             style={{ overflow: 'hidden', position: 'relative' }}
//         >

//             <p className='years'>{j.years}</p>
//             <div className='flex split intro'>
//                 <div className='flex center '>
//                     <img className='logo' src={`/img/jobs/${j.id}.png`} />
//                     <div>
//                         <h2>{j.title}</h2>
//                         <h3>{j.company}</h3>
//                     </div>
//                 </div>

//                 <div className='flex center hsep-sm buttons'>
//                     <a href={j.link} target='_blank'><button>Check them out</button></a>
//                     <button onClick={() => setViewing(j.id===viewing ? null : j.id)} className={`center ${j.id===viewing && 'selected'}`}>
//                         <span className='prs'>More</span>
//                         <img src='/img/back.png' className='trans' width={15} style={{ transform: `rotate(${viewing === j.id ? 90 : -90}deg)` }} />
//                     </button>
//                 </div>
//             </div>
//             <AnimateHeight open={tech || viewing===j.id}>
//                     <p>{j.desc}</p>
//                     <h3 className='mtl mbs'>References</h3>
//                     <div className='flex sep-sm'>
//                         {j.references.map((r, i) => (
//                             <div className='card ps iflex'>
//                                 <h4>{r.name}</h4>
//                                 <h5 className='thin'>{r.former && <span className='faded'>Former </span>}{r.title}</h5>
//                             </div>
//                         ))}
//                     </div>
//             </AnimateHeight>
//         </motion.div>
//     )
// }

// // function makeCards(tech=false) {
// //     if (!tech) {
// //         return (
// //             jobs.filter(j => !j.tech).map((j, i) => (
                
// //             ))
// //         )
// //     } else return (
// //         jobs.filter(j => j.tech).map((j, i) => (
// //             <motion.div
// //                 initial={{ transform: 'translateX(-100px)' }}
// //                 animate={{ transform: 'translateX(0px)', transition: {  type: 'spring' }}}
// //                 key={j.title}
// //                 className={`card trans`}
// //                 style={{ overflow: 'hidden', position: 'relative' }}
// //             >

// //                 <p className='years'>{j.years}</p>
// //                 <div className='flex split intro'>
// //                     <div className='flex center '>
// //                         {/* ! TODO: upscale images since they get larger when the screen width shrinks */}
// //                         <img className='logo' src={`/img/jobs/${j.id}.png`} />
// //                         <div>
// //                             <h2>{j.title}</h2>
// //                             <h3>{j.company}</h3>
// //                         </div>
// //                     </div>
// //                 </div>
// //                 <p>{j.desc}</p>
                    
// //                 <Omic />
// //             </motion.div>
// //         ))
// //     )
// // }