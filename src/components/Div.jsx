import React from 'react'
import styled from 'styled-components'

// m, ml, mr, mt, mb: margin left|right|top|bottom
// mx, my: margin X axis, margin Y axis
// p, pl, pr, pt, pb: padding left|right|top|bottom
// px, py: padding X axis, padding Y axis
// flex: Flex bool,
// align: Flex align-items center|end|stretch
// justify: Flex justify-content center|end|around|evenly
// rev: reverse flex direction
// wrap: flex-wrap
// rounded:  use theme's round

// SEE IF THEMEPROVIDER WORKS WITH STYLED-COMPONENTS THEN FINISHING DOCUMNENTING THIS

const _Div = styled.div(props => ({
  transition: `all ${props.time ? props.time : .25}s ease`,

  margin: props.m && props.m,
  marginLeft: props.ml ? props.ml : props.mx && props.mx,
  marginRight: props.mr ? props.mr : props.mx && props.mx,
  marginTop: props.mt ? props.mt : props.my && props.my,
  marginBottom: props.mb ? props.mb : props.my && props.my,

  padding: props.p ? props.p : props.glass && 30,
  paddingLeft: props.pl ? props.pl : props.px && props.px,
  paddingRight: props.pr ? props.pr : props.px && props.px,
  paddingTop: props.pt ? props.pt : props.py && props.py,
  paddingBottom: props.pb ? props.pb : props.py && props.py,

  display: (props.flex || !!props.align || !!props.justify || props.col || props.center || !!props.split) ? (props.iflex ? 'inline-flex' : 'flex') : props.iblock ? 'inline-block' : 'block',
  justifyContent: props.center ? 'center' : props.justify === 'center' ? 'center' : props.justify === 'end' ? 'flex-end' : (props.justify === 'between' || props.split) ? 'space-between' : props.justify === 'evenly' ? 'space-evenly' : 'flex-start',
  alignItems: (props.split || props.center) ? 'center' : props.align === 'center' ? 'center' : props.align === 'end' ? 'flex-end' : props.align === 'stretch' ? 'stretch' : 'flex-start',
  flexDirection: `${props.col ? 'column' : 'row'}${props.rev ? '-reverse' : ''}`,
  flexWrap: props.wrap && 'wrap',

  borderRadius: (props.rounded || props.glass) ? props.theme.corners : props.rad ? props.rad : props.circle ? 99999 : 0,
  width: props.full ? '100%' : props.w && props.w,
  height: props.full ? '100%' : props.h && props.h,
  minWidth: props.minW && props.minW,
  minHeight: props.minH && props.minH,
  maxWidth: props.maxW && props.maxW,
  maxHeight: props.maxH && props.maxH,
  background: props.glass ? '#5b9bea11' : props.bg && props.bg,
  backgroundSize: props.cover && 'cover',
  overflow: props.contain && 'hidden',
  pointerEvents: props.disabled && 'none',
  opacity: props.o ? `${props.o} !important` : props.disabled && .4, 
  cursor: props.pointer && 'pointer',
  transform: props.scale ? `scale(${props.scale})` : props.elevation && `translateZ(${props.elevation}px)`,
  // border: props.glass && '1px solid #0000',
  backdropFilter: props.blur && `blur(${props.blur}px)`,
  cursor: props.onClick && 'pointer',

  '&:hover': {
    background: props.glass && '#20283157',
    // backdropFilter: props.glass && 'blur(4px)',
    // borderColor: '#5b9bea',
  },
}))

export default React.forwardRef((props, ref) => (
  <_Div ref={ref} {...props}>
    {props.children}
  </_Div>
))
