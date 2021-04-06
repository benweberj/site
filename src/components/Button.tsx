import React from 'react'
import styled from 'styled-components'

import { marginPadding, MPInterface } from '../utils'

interface Props extends MPInterface {
  w?: string | number;
  h?: string | number;
  block?: boolean; // display: block
  selected?: boolean;
  noborder?: boolean; // no border + elevates on hover
  inverse?: boolean; // swap fg and bg
  size?: string | number; // font size
  rad?: string | number; // border-radius
  silent?: boolean; // still unsure if silent should be fully opaque on hover
  onClick: () => void;
}

const Btn = styled.button<Props>(props => ({
  ...marginPadding({ p: '.25rem 1.25rem', ...props }),
  width: props.w || undefined,
  height: props.h || undefined,
  display: props.block ? 'block' : undefined,
  transition: 'all .25s ease',
  cursor: 'pointer',
  position: 'relative',
  color: props.theme.complement,
  outline: 0,
  background: props.selected ? props.theme.complement : 'none',
  border: props.noborder ? 'none' : `1px solid ${props.theme[props.inverse ? 'base' : 'complement']}`,
  fontSize: props.size || undefined,
  borderRadius: props.rad || 9999,
  fontWeight: props.theme.regular,
  opacity: props.silent ? '.3' : 1,
  overflow: 'hidden',
  boxSizing: 'border-box',

  '& p': { transition: 'all .25s ease' },

  '&:hover': props.noborder ? {
    opacity: 1,
    '&:after': { transform: 'translateY(100%) scale(.7)' },
    '&:before': { transform: 'scaleY(1)' },
    '& p': { transform: 'translateY(5px)', opacity: .5 }
  } : {
    background: props.theme.complement,
    color: props.theme.base,
  }
}))

const Button: React.FC<Props> =  props => {
  return <Btn {...props}><p>{props.children}</p></Btn>
}

export default Button