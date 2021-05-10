import React, { useState, useEffect } from 'react'
// import styled from 'styled-components'

import { Div, Path, Text, Parallax } from './index'
import { IProps } from '../utils'

interface Props extends IProps {
  name?: string,
}

const SocialMedia: React.FC<Props> = () => {
  const [onStatus, setOnStatus] = useState([false, false, false, false]) // the 'on' status of each icon
  const [hovStatus, setHovStatus] = useState([false, false, false, false])
  const scale = .1

  // function toggle(i: number) {
  //   let s = onStatus.slice(0)
  //   s[i] = !onStatus[i]
  //   setOnStatus(s)
  // }
  function turnOn(i: number) {
    let s = onStatus.slice(0)
    s[i] = true
    setOnStatus(s)
  }
  function turnOff(i: number) {
    let s = onStatus.slice(0)
    s[i] = false
    setOnStatus(s)
  }
  function setHov(i: number, bool: boolean) {
    bool ? turnOff(i) : turnOn(i)
    let h = hovStatus.slice(0)
    h[i] = bool
    setHovStatus(h)
  }

  useEffect(() => {
    for (let i = 0; i < onStatus.length; i++) {
      let s = onStatus.slice(0)
      for (let j = 0; j <= i; j++) {
        s[j] = true
      }
      setTimeout(() => setOnStatus(s), 700*i)
    }
  }, [])

  useEffect(() => {
    // console.log(onStatus)
  }, [onStatus])

  // you should really look into how to copy and use defined html elements so that you can pass props to them programatically.
  const icons = {
    'GitHub':
    <svg width={313*scale} height={349*scale} viewBox="0 0 313 349" fill="none" xmlns="http://www.w3.org/2000/svg">
      // delay for the tail
      <Path on={onStatus[0]} style={{ transition: 'all .75s ease', transitionDelay: '.25s' }} d="M107 285.111C93.8319 289.82 64.2035 294.086 51.0354 273.476C34.5752 247.713 40.3363 244.388 14 234" />
      <Path on={onStatus[0]} d="M119.5 335C111.167 305.5 101.1 242.7 127.5 227.5C105.667 226.333 57.6 215 40 179C18 134 40.5 81.5 53 69.5C47.6667 58.5 40.2 31.8 53 13C61.5 13.1667 85.8 18.6 115 39C129.667 31 170.8 19.8 218 39C225.667 31.5 248.2 15.8 277 13C282.667 22.6667 290.6 47.5 277 69.5C289 84.1667 309.4 123.4 295 163C277 212.5 234 223 206 227.5C215.333 237 229.4 271.8 211 335" />
    </svg>,

    'LinkedIn':
    <svg width={266*scale} height={286*scale} viewBox="0 0 266 286" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path on={onStatus[1]} d="M33 250V118" />
      <Path on={onStatus[1]} d="M115.5 181.992C122 159 150.5 126.5 181.5 122.5C222.19 117.25 235.5 147.492 235.5 181.992C235.5 209.592 235.5 234.994 235.5 254.994" />
      <Path on={onStatus[1]} d="M115 117V182.492V255.494" />
      <Path on={onStatus[1]} circle cx="33" cy="33" r="33" />
    </svg>,


    'Email':
    <svg width={407*scale} height={260*scale} viewBox="0 0 407 260" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path on={onStatus[2]} d="M15 224.5V35.5C15 24.4543 23.9543 15.5 35 15.5H371.5C382.546 15.5 391.5 24.4543 391.5 35.5V224.5C391.5 235.546 382.546 244.5 371.5 244.5H35C23.9543 244.5 15 235.546 15 224.5Z" />
      <Path on={onStatus[2]} d="M33.5 32L195.113 159.036C202.512 164.851 212.964 164.722 220.216 158.726L373.5 32" />
    </svg>,


    'Resume':
    <svg width={281*scale} height={268*scale} viewBox="0 0 281 268" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path on={onStatus[3]} rect sq y="1" width="111" height="111" rx="20"/>
      <Path on={onStatus[3]} styles={{ transitionDelay: '.15s' }} d="M18 251H264" />
      <Path on={onStatus[3]} styles={{ transitionDelay: '.3s' }} d="M18 173H264" />
      <Path on={onStatus[3]} styles={{ transitionDelay: '.45s' }} d="M161 95H264" />
      <Path on={onStatus[3]} styles={{ transitionDelay: '.6s' }} d="M161 17H264" />
    </svg>
  }

  // you should create a ton more shorthand props: like translateX -> tx

  // return (
  //   <div onClick={() => setOn(!on)}>
      
  //   </div>
  // )
  return (<Div flex align='stretch'>
    {Object.keys(icons).map((name, i) => {
      const hov = hovStatus[i]
      return (
        <Parallax
          perspective={100}
          // tiltMaxAngleX={30}
          // tiltMaxAngleY={30}
          style={{ overflow: 'hidden' }}
        >
          <Div iflex col
            h='100%' p={20}
            align='center' justify='end'
            onMouseOver={() => setHov(i, true)}
            onMouseLeave={() => setHov(i, false)}
          >
            <Div
              style={{ transform: `translateY(${hov ? -25 : 0}px) scale(${hov ? .9 : 1}) translateZ(${hov ? 50 : 0}px)`}}
              o={hov ? .5 : 1} time={1}
              >
                {icons[name]}
            </Div>
            <Text size={13} light upper
              o={hov ? 1 : '0'} disabled time={1}
              style={{ transform: `translateY(${hov ? `calc(-100% - ${scale*50}px)` : '0px'}) translateZ(${hov ? 50 : 0}px)` }}
            >
              {name}
            </Text>
          </Div>
        </Parallax>
      )
    })}
  </Div>)
}

// const Container = styled.div<Props>`
//   display: flex;
//   justify-content: center;
// `
// // background-image: url('${props => require('../img/social/' + props.name + '.png').default}');
// const Site = styled.a<Props>(props => ({
//   ...globalProps(props),
//   filter: props.theme.mode === 'light' ? 'invert(1)' : undefined,
//   backgroundSize: 'cover',
//   width: 30,
//   height: 30,
//   borderRadius: '50%',
//   margin: '0 .5rem',
//   transition: 'all .25s ease',
//   opacity: .6,

//   '&:after': {
//     color: '#fff',
//   },

//   '&:hover': {
//     opacity: 1,
//     transform: 'scale(1.1)',
//     /* animation: ${props => props.theme.mode === 'dark' ? 'pulseLight' : 'pulseDark'} 1s ease; */
//   },
// }))

// const SocialMedia: React.FC<Props> = props => {
//   return (
//     <Container {...props}>
//       <Site name='github' href='' />
//       <Site name='linkedin' href='' />
//       <Site name='mail' href='' />
//       <Site name='resume' href='' />
//     </Container>
//   )
// }

export default SocialMedia