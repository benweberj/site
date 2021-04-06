import React from 'react'
import styled from 'styled-components'

import { marginPadding } from '../utils'

interface Props {
  type?: string, // h1, h2, h3
  color?: string,
  inverse?: boolean,
  size?: number | string,
  scale?: number, // transform: scale(x)
  o?: number, // opacity
  w?: number | string,
  h?: number | string,
  minW?: number | string,
  minH?: number | string,
  maxW?: number | string,
  maxH?: number | string,
  lh?: string | number, // line height
  nowrap?: boolean,
  inline?: boolean,
  center?: boolean,
  bold?: boolean,
  light?: boolean,
  regular?: boolean,
  italic?: boolean,
  upper?: boolean,
  code?: boolean, // monospace font (need to keep track of that font)
  accent?: boolean, // accent color
  primary?: boolean, // primary color
  noAccent?: boolean, // think this is just leftover from Omic
  elevation?: number, // the z-translation for parallax effect
}

const _Text = styled.p<Props>(props => ({
  ...marginPadding(props),
  fontSize: props.type === 'h1' ? 50 : props.type === 'h2' ? 40 : props.type === 'h3' ? 25 : props.size ? props.size : props.inline ? 'inherit' : props.theme.rem,
  width: props.w && props.w,
  height: props.h && props.h,
  minWidth: props.minW && props.minW,
  minHeight: props.minH && props.minH,
  maxWidth: props.maxW && props.maxW,
  maxHeight: props.maxH && props.maxH,
  whiteSpace: props.nowrap ? 'nowrap' : undefined,
  fontWeight: props.bold ? props.theme.bold : props.light ? props.theme.light : props.regular ? props.theme.regular : props.inline ? 'inherit' : props.theme.regular,
  color: props.accent ? props.theme.primary : props.color ? props.color : props.inverse ? props.theme.base : props.theme.complement,
  opacity: props.o || 1,
  fontStyle: props.italic ? 'italic' : undefined,
  display: props.inline ? 'inline !important' : undefined,
  textAlign: props.center ? 'center' : undefined,
  lineHeight: props.lh && props.lh,
  transition: 'all .5s ease',
  // textTransform: props.upper && 'uppercase',
  fontFamily: props.code ? `${props.theme.codeFont}, monospace` : props.inline ? 'inherit' : props.theme.font,
  // transform: `${props.scale ? `scale(${props.scale})` : ''} ${props.elevation ? `translateZ(${props.elevation}px)` : ''}`,
  '& a': {
    fontSize: 'inherit',
    color: props.noAccent ? props.theme.complement : props.theme.accent,
    textDecoration: 'none',
    transition: 'all .5s ease',
    '&:hover': {
      color: props.theme.complement,
    }
  }
}))

export const Text: React.FC<Props> = props => {
  const { children } = props
  
  return (
    <_Text {...props}>{children}</_Text>
  )
}


export default Text

// const Text = styled.p(props => (




// }))

// export default React.forwardRef((props, ref) => props.href ?
//   <Text ref={ref} {...props}><a href={props.href}>{props.children}</a></Text>
// :
//   <Text ref={ref} {...props}>{props.children}</Text>
// )