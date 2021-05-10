import React, { useState } from 'react'


import { Text, Div } from './index'

interface Props {
  msg?: string,
  children?: any,
  size?: number | string,

  bottom?: boolean,
  left?: boolean,
  right?: boolean,
}

const Tooltip: React.FC<Props> = props => {
  const [hov, setHov] = useState(false)
  const { bottom, left, right, msg, children, size=14 } = props
  
  const gap = o => {
    return `calc(${o < 0 ? '-' : ''}100% + ${10*o}px)`
  }

  
  let pos: any = { t: '0', ty: hov ? gap(-1) : '-80%', justify: 'center' }
  
  pos = bottom ? { b: '0', ty: hov ? gap(1) : '80%', justify: 'center',
  } : left ? { t: '50%', l: '0', tx: hov ? gap(-1) : '-80%', ty: '-50%', justify: 'end',
  } : right ? { t: '50%', r: '0', tx: hov ? gap(1) : '80%', ty: '-50%' } : pos

  return (
    <Div rel>
      <Div o={hov ? 1 : '0'} abs {...pos} w='100%'>
        <Div iblock glass p={10}>
          <Text center size={size}>{msg}</Text>
        </Div>
      </Div>
      <span onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>{children}</span>
    </Div>
  )
}

export default Tooltip