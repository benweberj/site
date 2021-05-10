import React, { useState, useEffect, useRef, useContext } from 'react'

import { IProps } from '../utils'
import { Context }  from '../App'

interface Props extends IProps {
  circle?: boolean,
  rect?: boolean,
  on?: boolean,
  d?: string,
  width?: any,
  height?: any,
  x?: any,
  y?: any,
  rx?: any,
  fill?: any,
  stroke?: any,
  cx?: any,
  cy?: any,
  r?: any,
  sq?: any,
  styles?: any,
  theme?: any,
  weight?: number,
}

const Path: React.FC<Props> = props => {
  const [offset, setOffset] = useState<any>({})
  const [len, setLen] = useState(1)
  const ref = useRef<any>(null)
  const { circle, rect, on, sq, styles, weight } = props
  
  const app = useContext(Context)
  const { theme } = app

  useEffect(() => {
    const l = ref?.current
    if (l) {
      setLen(l.getTotalLength())
      setOffset(l.getBBox())  
    }
  }, [ref])

  const pathStyles = {
    strokeDasharray: len,
    // opacity: on ? 1 : 0,
    strokeDashoffset: on ? 0 : len,
    stroke: on ? theme.complement : `${theme.accent}00` ,
    strokeWidth: on ? (weight || 20) : 0,
    strokeLinecap: 'round' as 'round',
    strokeLinejoin: 'round' as 'round',
    style: {
      transition: 'all .5s ease-in-out',
      ...styles,
    },
  }
  const rectStyles = {
    fill: on ? theme.complement : `${theme.accent}00`,
    opacity: on ? 1 : 0,
    strokeWidth: props.weight || 0,
    style: {
      transition: 'all 1s ease, opacity .5s ease',
      transform: sq ? (!on ? 'rotate(90deg)' : undefined) : (on ? 'scaleY(1)' : 'scaleY(0)'),
      transformOrigin: 'bottom left',
      ...styles,
    },
  }
  const circleStyles = {
    fill: on ? theme.complement : `${theme.accent}00`,
    opacity: on ? 1 : 0,
    style: {
      transition: 'all 1s ease',
      transform: on ? 'scale(1)' : ` scale(0) translate(${offset.width*3}px, ${offset.height*5}px)`,
      ...styles,
    },
  }


  if (circle) return <circle onClick={() => console.log(offset)} ref={ref} {...circleStyles} {...props} />
  if (rect) return <rect ref={ref} {...rectStyles} {...props} />
  return <path ref={ref} {...pathStyles} {...props} />
}

export default Path