import React from 'react'
import styled from 'styled-components'

import { globalProps, IProps } from '../utils'

interface Props extends IProps {
  type?: string, // h1, h2, h3
  color?: string,
  inverse?: boolean,
  size?: number | string,
  scale?: number, // transform: scale(x)
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
}

const TextX = styled.p<Props>(props => ({
  ...globalProps(props),
  fontSize: props.type === 'h1' ? 50 : props.type === 'h2' ? 40 : props.type === 'h3' ? 25 : props.size ? props.size : props.inline ? 'inherit' : props.theme.rem,
  fontWeight: props.bold ? props.theme.bold : props.light ? props.theme.light : props.regular ? props.theme.regular : props.inline ? 'inherit' : props.theme.regular,
  color: props.accent ? props.theme.primary : props.color ? props.color : props.inverse ? props.theme.base : props.theme.complement,
  display: props.inline ? 'inline !important' : undefined,
  textAlign: props.center ? 'center' : undefined,
  fontFamily: props.code ? `${props.theme.codeFont}, monospace` : props.inline ? 'inherit' : props.theme.font,
  
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

export const Text: React.FC<Props> = React.forwardRef((props, ref) => {
  const { children } = props
  
  return (
    <TextX {...props} ref={ref}>{children}</TextX>
  )
})

export default Text