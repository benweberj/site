import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

import { IProps } from '../utils'
import { Text, Div } from './index'

interface Props extends IProps {
  w?: string | number;
  h?: string | number;
  block?: boolean; // display: block
  selected?: boolean;
  noborder?: boolean; // no border + elevates on hover
  inverse?: boolean; // swap fg and bg
  upper?: boolean; // uppercase
  size?: string | number; // font size
  rad?: string | number; // border-radius
  silent?: boolean; // still unsure if silent should be fully opaque on hover
  onClick: () => void;
  ref?: any,
  i?: number, // index to determine transition delay (for an gradual displalying of group of buttons)
}

// const Btn = styled.button<Props>(props => ({
//   ...globalProps({ p: '.4rem 2rem', ...props }),
//   display: props.block ? 'block' : undefined,
//   cursor: 'pointer',
//   position: 'relative',
//   color: props.theme.complement,
//   outline: 0,
//   background: props.selected ? props.theme.complement : 'none',
//   border: props.noborder ? 'none' : `1px solid ${props.theme[props.inverse ? 'base' : 'complement']}`,
//   fontSize: props.size || undefined,
//   borderRadius: props.rad || 9999,
//   fontWeight: props.theme.regular,
//   opacity: props.silent ? '.3' : 1,
//   overflow: 'hidden',
//   // boxSizing: 'border-box',
//   '& p': { transition: `all ${props.time || .25}s ease` },

//   '&:hover': props.noborder ? {
//     opacity: 1,
//     '&:after': { transform: 'translateY(100%) scale(.7)' },
//     '&:before': { transform: 'scaleY(1)' },
//     '& p': { transform: 'translateY(5px)', opacity: .5 }
//   } : {
//     background: props.theme.complement,
//     color: props.theme.base,
//   }
// }))

const Rect = styled.rect<any>(props => ({
  stroke: props.theme.mode === 'dark' ? props.theme.accent : props.theme.complement,
}))

const Button: React.FC<Props> = props => {
  const textRef = useRef() // to calculate original text dimensions
  const svgRef = useRef<any>()

  const [hov, setHov] = useState(false)
  const [on, setOn] = useState(false)
  const [len, setLen] = useState(1)
  const [dim, setDim] = useState({ w: 120, h: 20 })
  const px = 30
  const py = 10
  const { i=0 } = props
  const time = .5 // animation duration
  
  
  useEffect(() => { setTimeout(() => setOn(true), (i*500)) }, [])
  
  useEffect(() => {
    const tRef: any = textRef?.current
    const sRef: any = svgRef?.current
    // console.log(el)
    // setDim(dim)
    const n = { w: tRef.clientWidth, h: tRef.clientHeight }
    if (Math.abs(w - n.w) > 2 || Math.abs(h - n.h) > 2) {
      setDim({ w: n.w, h: n.h })
    }
    if (sRef) setLen(sRef.getTotalLength())
  })

  useEffect(() => {
    console.log(`${props.children} --> ${len.toFixed()}px`)
  }, [len])

  // useEffect(() => {
  //   setOn(!hov)
  // }, [hov])
  
  const pathStyles = {
    style: {
      transition: `all ${time}s ease`,
      transform: hov && 'translateY(100%) scaleY(.1)',
    },
    strokeWidth: on && !hov ? 1 : 0,
    fill: hov ? '#000' : '#0000',

    // opacity: on ? 1 : 0,
    strokeDasharray: len,
    strokeDashoffset: on && !hov ? 0 : len,
  }

  const { w, h } = dim
  const ww = w + (px*2)
  const hh = h + (py*2)
  // const dot = hov ? 8 : 3

  return <>
    {/* hidden reference text */}
    <Text ref={textRef} locked o={'0'} style={{ position: 'absolute' }}>{props.children}</Text>

    {/* <Div style={{ position: 'absolute', transform: `translate(${((props.i||1)-1)*270}px, -300px)` }}>
      <Text type='h3'>Props</Text>
      {Object.keys(props).map(key => <Text bold>{key}: <Text inline>{props[key]}</Text></Text>)}

      <Text bold>on: <Text inline>{on.toString()}</Text></Text>
      <Text bold>len: <Text inline>{len}</Text></Text>
      <Text bold>w -- ww: <Text inline>{w} -- {ww}</Text></Text>
      <Text bold>h -- hh: <Text inline>{h} -- {hh}</Text></Text>
      <Text bold>dim: <Text inline>{JSON.stringify(dim)}</Text></Text>
    </Div> */}

    <Div rel w={ww} h={hh} minW={ww} minH={hh} {...props} onClick={() => setOn(!on)} onMouseOver={() => setHov(true)} onMouseOut={() => setHov(false)}>
      {/* <Div abs w={dot} h={dot} rounded bg='#fff3' l='50%' tx={'-50%'} ty={hov ? '-300%' : 0} o={hov ? 1 : '0'} time={time*.8} /> */}
      <svg width={ww} height={hh} style={{ filter: `blur(${hov ? 12 : 0}px)`, transition: `all ${time}s ease` }}>
        <Rect ref={svgRef} width={ww} height={hh} rx={hh/2} ry={hh/2} {...pathStyles} />
      </svg>
      <Text nowrap light locked center time={time*.8} lh={`${hh}px`} ty={-hh-2 - (hov?10:0)} o={on ? 1 : .2}>
        {props.children}
      </Text>
    </Div>
  </>
  // return <Btn {...props}><p>{props.children}</p></Btn>
}

export default Button