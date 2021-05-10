import React from 'react'
import styled from 'styled-components'
import { globalProps, IProps } from '../utils'

interface Props extends IProps {
  rounded?: boolean, // theme-dependent border-radius
  // ref?: any, // ?
  full?: boolean, // width = height = 100%
}

const DivX = styled.div<Props>(props => ({
  ...globalProps(props),
  borderRadius: (props.rounded || props.glass) ? props.theme.corners : props.rad ? props.rad : props.circle ? 99999 : 0,


  // '&:hover': {
  //   background: props.glass && '#20283157',
  // },
}))

const Div: React.FC<Props> = React.forwardRef((props, ref) => {
  return (
    <DivX {...props} ref={ref}>{props.children}</DivX>
  )
})

export default Div

// export default React.forwardRef((props, ref) => (
//   // <Div {...props} ref={ref}>{props.children}</Div>
//   <h1>{props.children}</h1>
// ))
