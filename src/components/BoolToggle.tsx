import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'

import { IProps } from '../utils'
import { Context } from '../App'
import { Text, Div, Icon } from './index'


const Dot = styled.div<any>(props => {
  const dx = props.w - props.dot*2
  const dur = .5
  return ({
    '@keyframes true': {
      from: {
        transform: `translateX(0px)`
      },
      to: {
        transform: `translateX(${dx}px)`
      },
    },
  
    '@keyframes false': {
      from: {
        transform: `translateX(${dx}px)`
      },
      to: {
        transform: `translateX(0px)`
      },
    },
  
    // transform: `translateX(${props.theme.mode === 'dark' ? (2*props.dim - props.dim/2) : 0}px)`,
    background: props.colors ? '#ffF' : props.theme.base,
    borderRadius: 999,
    width: props.dot,
    height: props.dot,
    animation: `${props.val ? 'true' : 'false'} ${dur}s ease-out`,
    animationFillMode: 'forwards'
  })
})

interface Props extends IProps {
  val: boolean,
  toggle: () => void,
  colors?: boolean,
}

const BoolToggle: React.FC<Props> = props => {
  const { val, toggle, colors } = props
  const { theme } = useContext(Context)

  const dot = 10
  const w = 50
  const c = colors ? (val ? theme.green : theme.red) : theme.complement

  return (
    <Div {...props} bg={c} circle p={dot/2} w={w} onClick={toggle}>
      <Dot colors={colors} val={val} dot={dot} w={w} />
    </Div>
  )
}

export default BoolToggle