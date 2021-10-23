
/** 
 * Utility interface to allow any component that extends it to pass in these shorthand props, and have them
 * return the corresponding CSS via globalProps() below
 */

export const ease = 'cubic-bezier(0.745, 0.225, 0.215, 1.000)'

// build up the transform string from the props
function transforminator(props) {
  let { scale, tx=0, ty=0, sx=1, sy=1, elevation=0 } = props
  
  if (scale) {
    sx = scale
    sy = scale
  }
  
  if (typeof tx == 'number') tx = `${tx}px`
  if (typeof ty == 'number') ty = `${ty}px`

  return `translate(${tx}, ${ty}) translateZ(${elevation}px) scaleX(${sx}) scaleY(${sy})`
}

export interface IProps {
  // Margin
  m?: string | number,
  ml?: string | number,
  mr?: string | number,
  mt?: string | number,
  mb?: string | number,
  mx?: string | number,
  my?: string | number,

  // Padding
  p?: string | number,
  pl?: string | number,
  pr?: string | number,
  pt?: string | number,
  pb?: string | number,
  px?: string | number,
  py?: string | number,

  // Dimensions
  w?: number | string,
  h?: number | string,
  minW?: number | string,
  minH?: number | string,
  maxW?: number | string,
  maxH?: number | string,

  t?: number | string,
  b?: number | string,
  l?: number | string,
  r?: number | string,

  // Display
  flex?: boolean,
  align?: 'center' | 'start' | 'end' | 'stretch', // align-items
  justify?: 'center' | 'start' | 'end' | 'between' | 'evenly', // justify-content
  col?: boolean, // flex-direction: column
  center?: boolean, // align-items == justify-content == center
  split?: boolean, // justify-content == space=between, // align-items == center
  iflex?: boolean,  // display: inline-flex
  iblock?: boolean,  // display: inline-block
  rev?: boolean, // reverse flex-direction
  wrap?: boolean, // flex wrap

  // Text
  upper?: boolean, // uppercase
  lh?: number | string, // line height
  nowrap?: boolean, // no text wrap
  italic?: boolean,

  active?: any,
  hover?: any,
  locked?: any,

  // Rest (Alphabetical)
  abs?: boolean, // absolute positioning
  rel?: boolean, // relative positioning
  bg?: string,
  circle?: boolean, // full border radius and make dimensions both w || h
  contain?: boolean, // overflow: hidden
  debug?: boolean, // gives self and children a border
  disabled?: boolean,
  elevation?: number, // transform: translateZ(X)
  glass?: boolean, // glass effect
  o?: number | string, // opacity (NOTE: for 0, you should use '0' since 0 is falsey)
  onClick?: () => void,
  onMouseEnter?: () => void,
  onMouseLeave?: () => void,
  onMouseOver?: () => void,
  onMouseOut?: () => void,
  id?: string,
  invert?: boolean, // invert colors filter
  className?: string,
  pointer?: boolean, // cursor: pointer
  ref?: any,
  rad?: number | string, // border-radius
  scale?: number, // transform: scale(X)
  time?: number,
  style?: any, // putting this here because TS gets mad when you sneakily pass style to styled-components via {...props}

  tx?: number | string, // translateX
  ty?: number | string, // translateX

  sx?: number, // scaleX
  sy?: number, // scaleY
}


/**
 * Return styles for all universally-accepted props
 * margin, padding, w/h, min/max width and height
 * 
 * Watch out for the order of the styles. These global ones are always applied first, 
 * so any additional styling that uses the CSS key will be OVERRRIDDEN, NOT combined.
 * Ex: if you use transform:, $elevation will no longer work as expected
 */ 
export const globalProps = props => {
  return ({
    margin: props.m || undefined,
    marginLeft: props.ml || props.mx || undefined,
    marginRight: props.mr || props.mx || undefined,
    marginTop: props.mt || props.my || undefined,
    marginBottom: props.mb || props.my || undefined,

    padding: props.p ? props.p : props.glass ? props.theme.padding : undefined,
    paddingLeft: props.pl || props.px || undefined,
    paddingRight: props.pr || props.px || undefined,
    paddingTop: props.pt || props.py || undefined,
    paddingBottom: props.pb || props.py || undefined,

    width: props.full ? '100%' : props.w && props.w,
    height: props.full ? '100%' : props.h && props.h,
    minWidth: props.minW || undefined,
    minHeight: props.minH || undefined,
    maxWidth: props.maxW || undefined,
    maxHeight: props.maxH || undefined,

    display: (props.flex || !!props.align || !!props.justify || props.col || props.center || props.split) ? (props.iflex ? 'inline-flex' : 'flex') : props.iblock ? 'inline-block' : 'block',
    justifyContent: props.center ? 'center' : props.justify === 'center' ? 'center' : props.justify === 'end' ? 'flex-end' : (props.justify === 'between' || props.split) ? 'space-between' : props.justify === 'evenly' ? 'space-evenly' : 'flex-start',
    alignItems: (props.split || props.center) ? 'center' : props.align === 'center' ? 'center' : props.align === 'end' ? 'flex-end' : props.align === 'stretch' ? 'stretch' : 'flex-start',
    flexDirection: props.col ? 'column' as 'column' : 'row' as 'row', // wtf not sure why the 'as' is needed, + I now can't concatenate the $rev prop for reversing flex direction
    // flexDirection: 'column' as 'column',
    flexWrap: props.wrap && 'wrap',

    borderRadius: props.rad ? props.rad : props.circle ? 99999 : 0,
    cursor: (props.pointer || props.onClick) && 'pointer',
    background: props.glass ? `${props.theme[props.theme.mode === 'dark' ? 'accent' : 'complement']}22` : props.bg && props.bg,
    backdropFilter: props.glass ? 'blur(2px)' : undefined,
    filter: props.invert && 'invert(1)',
    backgroundSize: 'cover',
    overflow: props.contain && 'hidden',
    opacity: props.o || (props.disabled ? .3 : 1),
    textTransform: props.upper && 'uppercase',
    lineHeight: props.lh || undefined,

    whiteSpace: props.nowrap && 'nowrap',
    pointerEvents: (props.disabled || props.locked) && 'none',
    userSelect: (props.disabled || props.locked) && 'none',
    fontStyle: props.italic ? 'italic' : undefined,

    top: props.t ? props.t : undefined,
    bottom: props.b ? props.b : undefined,
    left: props.l ? props.l : undefined,
    right: props.r ? props.r : undefined, 
    
    transition: `all ${props.time ? props.time : .5}s ${ease}`,

    position: props.abs ? 'absolute' as 'absolute' : props.rel ? 'relative' as 'relative' : undefined,

    transform: transforminator(props),

    
    border: props.debug && '1px solid red',
    '& > *': { border: props.debug && '1px solid green' },
    '& > * > *': { border: props.debug && '1px solid blue' },
    '& > * > * > *': { border: props.debug && '1px dashed white' },

    '&:active': {
      ...props.active
    },
    '&:hover': {
      ...props.hover
    }
  })
}