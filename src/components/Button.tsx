import React, { useState, useEffect, useRef, useContext } from 'react'
import styled from 'styled-components'

import { IProps } from '../utils'
import { Context } from '../App'
import { Text, Div, Icon } from './index'

interface Props extends IProps {
  action?: string, // intent (just don't like that word bc Luke/Omic)
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

const Rect = styled.rect<any>(props => ({
  stroke: props.theme.mode === 'dark' ? props.theme.accent : props.theme.complement,
  strokeWidth: props.hov ? props.stroke : 0,
  fill: (props.hov || props.action) ? `${props.theme.complement}00` : `${props.theme.complement}15`,
}))

const Button: React.FC<Props> = props => {
  const [hov, setHov] = useState(false)
  const [on, setOn] = useState(false)
  const [len, setLen] = useState(1)
  const [dim, setDim] = useState({ w: 120, h: 20 })
  const textRef = useRef() // to calculate original text dimensions
  const svgRef = useRef<any>()
  const {  } = useContext(Context)

  const { i=0, children, action } = props

  const px = 30
  const py = 10
  const time = .8 // animation duration
  const stroke = 2
  const { w, h } = dim
  const ww = w + (px*2) + stroke
  const hh = h + (py*2) + stroke

  const pathStyles = {
    style: { transition: `all ${time}s ease` },
    strokeDasharray: len,
    strokeDashoffset: hov ? 0 : len,
    on: true,
    hov,
  }
  
  useEffect(() => {
    setTimeout(() => setOn(true), (i*500))
  }, [])

  useEffect(() => {
    const tRef: any = textRef?.current
    const sRef: any = svgRef?.current
    const n = { w: tRef.clientWidth, h: tRef.clientHeight }
    
    if (Math.abs(w - n.w) > 2 || Math.abs(h - n.h) > 2) setDim({ w: n.w, h: n.h })
    if (sRef) setLen(sRef.getTotalLength())
  })

  const content = action ? <>
    <Div h={hh} full center ty={hov ? -hh-(stroke/2) : 0}><Icon name={action} /></Div>
    <Div h={hh} full center ty={hov ? -hh-(stroke/2) : 0}><Text>{children}</Text></Div>
  </> : <Div h={hh} full center><Text>{children}</Text></Div>

  return <>
    {/* hidden reference text */}
    <Text nowrap ref={textRef} disabled o={'0'} style={{ position: 'absolute' }}>{props.children}</Text>

    <Div active={{ transform: 'scale(.95)' }} time={.1} rel w={ww+stroke/2} h={hh+stroke/2} minW={ww} minH={hh} {...props} onClick={() => setOn(!on)} onMouseOver={() => setHov(true)} onMouseOut={() => setHov(false)}>
      <svg width={ww} height={hh} style={{ transition: `all ${time}s ease` }} viewBox={`0 0 ${ww+stroke/2} ${hh+stroke/2}`}>
        <Rect x={stroke/2} y={stroke/2} stroke={stroke} ref={svgRef} width={ww} height={hh} rx={hh/2} ry={hh/2} {...pathStyles} action={action} />
      </svg>
      <Div full circle contain h={hh} ty={-hh-2} style={{ userSelect: 'none' }}>
        {content}
      </Div>
    </Div>
  </>
}

export default Button