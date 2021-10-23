import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { globalProps, IProps } from '../utils'

interface Props extends IProps {
  rounded?: boolean, // theme-dependent border-radius
  // ref?: any, // ?
  full?: boolean, // width = height = 100%
  // gallery?: boolean, //
  i?: number, // animatable index
  on?: boolean,
}

const DivX = styled.div<any>(props => ({
  ...globalProps(props),
  borderRadius: props.rad ? props.rad : (props.rounded || props.glass) ? props.theme.corners : props.circle ? 99999 : 0,
  opacity: props.on ? 1 : 0,
  // ...(props.gallery && {
  //   display: 'grid', gridTemplateColumns: '' }
  // )

  // '&:hover': {
  //   background: props.glass && '#20283157',
  // },
}))

const Div: React.FC<Props> = React.forwardRef((props, ref) => {
  const [on, setOn] = useState(props.on)
  const { i=0 } = props

  useEffect(() => {
    setTimeout(() => setOn(true), (i*250))
  }, [])

  return (
    <DivX {...props} on={on} ref={ref}>{props.children}</DivX>
  )
})

export default Div

// export default React.forwardRef((props, ref) => (
//   // <Div {...props} ref={ref}>{props.children}</Div>
//   <h1>{props.children}</h1>
// ))
