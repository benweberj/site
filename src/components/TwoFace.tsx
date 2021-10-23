import React, { useState } from 'react'
import styled from 'styled-components'

import { IProps, ease } from '../utils'
import { Parallax } from './index'

interface Props extends IProps {

}

const TwoFace: React.FC<Props> = () => {
  const [real, setReal] = useState(false) // real/vector boolean
  
  const imgStyles: any = cur => ({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: !cur && 'none',
    // opacity: cur ? 1 : 0,
    transition: `all 1s ${ease}`,
    clipPath: `circle(${cur ? '100%' : '0%'} at 50% 50%)`,
  })

  const dim = 300

  return (
    <Parallax>
      <div style={{ display: 'inline-block', position: 'relative', width: dim, height: dim, userSelect: 'none' }}>
        <img onClick={() => setReal(true)} style={imgStyles(real === false)} src={require('../img/vec-t.png').default} />
        <img onClick={() => setReal(false)} style={imgStyles(real === true)} src={require('../img/real.png').default} />
      </div>
    </Parallax>
  )
}

export default TwoFace

// import Text from './Text'

// interface Props {
//   w: number | undefined,
//   h: number | undefined,
//   // id: string,
//   // style: any,
//   // source: any,
//   // onClick: any,
// }

// const Real = styled.img<any>(() => ({
//   cursor: 'pointer',
//   position: 'absolute'
// }))

// // const Vector = styled.img(props => ({
// //   cursor: 'pointer',
// //   background: props.theme.primary,
// //   position: 'relative',
// //   top: 0,
// //   left: 0,
// //   transition: 'all .5s ease !important',
// //   '&:hover': {
// //     background: props.theme.complement,
// //   }
// // }))

// const TwoFace: React.FC<Props> = props => {
//   const { w=250, h=250 } = props
//   const [yep, setYep] = useState(false) // yep
//   const [isReal, setIsReal] = useState(false)
//   const [realStyles, setRealStyles] = useState({})
//   const [vecStyles, setVecStyles] = useState({})

//   const picStyles = {
//     width: w,
//     height: h,
//     borderRadius: '50%',
//     display: 'block',
//     transition: 'transform .5s ease, opacity .5s ease',
//   }

//   function toggleReal() {
//     setIsReal(!isReal)
    
//     console.log(`changing from ${isReal ? 'vector' : 'real'} to ${isReal ? 'real' : 'vector'}`)

//     if (isReal) {
//       setVecStyles({
//         opacity: 0,
//         transform: 'scale(1.2)'
//       })
//       setRealStyles({
//         opacity: 1
//       })

//       setTimeout(_ => {
//         setVecStyles({
//           zIndex: -99,
//           transform: 'scale(1)'
//         })
//       })
//     } else {
//       setVecStyles({
//         opacity: 1,
//         zIndex: 99,
//       })
//       setRealStyles({
//         transform: 'scale(1.2)',
//         opacity: 0
//       })
    
//       setTimeout(_ => setRealStyles({ transform: 'scale(1)' }), 500)
//     }
//   }
// // tog vector

//   return (
//     <div {...props} onMouseOver={_ => setYep(true)} onMouseOut={_ => setYep(false)}>
//       <Real id='real' style={{ ...picStyles, ...realStyles }} src={require('../img/real.png')} onClick={toggleReal} />
//       <div id='vector' style={{ ...picStyles, background: '#fff1', position: 'relative', ...vecStyles }} onClick={toggleReal}>
//         {/* <Vector id='vector' style={picStyles} src={require('../img/vec-t.png')} onClick={showReal}/> */}
//         <img className='inner-element' style={{ transition: 'all 1s ease', transform: yep ? 'translateZ(20px)' : undefined, position: 'absolute', width: '100%', height: '100%' }} id='vector' src={require('../img/dark-hood.png')} onClick={toggleReal} />
//         <img className='inner-element' style={{ transition: 'all 1s ease', transform: yep ? 'translateZ(40px)' : undefined, position: 'absolute', width: '100%', height: '100%' }} id='vector' src={require('../img/neck.png')} onClick={toggleReal} />
//         <img className='inner-element' style={{ transition: 'all 1s ease', transform: yep ? 'translateZ(80px)' : undefined, position: 'absolute', width: '100%', height: '100%' }} id='vector' src={require('../img/t-shirt.png')} onClick={toggleReal} />
//         <img className='inner-element' style={{ transition: 'all 1s ease', transform: yep ? 'translateZ(100px)' : undefined, position: 'absolute', width: '100%', height: '100%' }} id='vector' src={require('../img/sweatshirt.png')} onClick={toggleReal} />
//         <img className='inner-element' style={{ transition: 'all 1s ease', transform: yep ? 'translateZ(120px)' : undefined, position: 'absolute', width: '100%', height: '100%' }} id='vector' src={require('../img/straps.png')} onClick={toggleReal} />
//         <img className='inner-element' style={{ transition: 'all 1s ease', transform: yep ? 'translateZ(150px)' : undefined, position: 'absolute', width: '100%', height: '100%' }} id='vector' src={require('../img/head.png')} onClick={toggleReal} />
//         <img className='inner-element' style={{ transition: 'all 1s ease', transform: yep ? 'translateZ(160px)' : undefined, position: 'absolute', width: '100%', height: '100%' }} id='vector' src={require('../img/features.png')} onClick={toggleReal} />
//         <img className='inner-element' style={{ transition: 'all 1s ease', transform: yep ? 'translateZ(170px)' : undefined, position: 'absolute', width: '100%', height: '100%' }} id='vector' src={require('../img/hair.png')} onClick={toggleReal} />
//       </div>
//       <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//         <Text upper light o={yep ? 1 : 0} style={{ pointerEvents: 'none', userSelect: 'none' }} elevation={yep ? 200 : -100} size={w/8} onClick={() => alert('what')}>Give Me Job</Text>
//       </div>
//     </div>
//   )
// }

// export default TwoFace
