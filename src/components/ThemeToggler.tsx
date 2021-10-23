import React, { useContext, useState } from 'react'
import styled from 'styled-components'

import { Context } from '../App'
import { IProps} from '../utils'
import { Div, Text, BoolToggle } from './index'

interface Props extends IProps {
  toggle: () => void,
  used?: boolean,
}




// const Toggler = styled.button<Props>(props => ({
//   opacity: .3,
//   padding: props.used ? '.5rem .5rem' : '.5rem 2rem',
//   borderRadius: '100px',
//   outline: 0,
//   border: 0,
//   fontWeight: props.theme.regular,
//   background: props.theme.complement,
//   transition: 'all .5s ease',
//   display: 'block',
//   margin: 'auto',

//   marginTop: 15, // hard-coding right here since toggler will likely always be at the top

//   '&:hover': {
//     opacity: 1,
//     padding: !props.used ? '.5rem 2.5rem' : undefined,
//     transform: props.used ? 'scale(1.2)' : undefined,
//   },
// }))

const ThemeToggler: React.FC<Props> = props => {
  const [hov, setHov] = useState(false)
  const { toggle } = props
  const { theme } = useContext(Context)
 
  // const handleClick = _ => {
  //   toggleMode()
  //   setUsed(true)
  // }


  return (
    <Div center m={10} {...props} onMouseOver={() => setHov(true)} onMouseOut={() => setHov(false)}>
      <Text o={hov ? (theme.mode === 'light' ? 1 :.3) : '0'} locked size={14}>LIGHT</Text>

      <BoolToggle mx={15} toggle={toggle} val={theme.mode == 'dark'} />

      <Text o={hov ? (theme.mode === 'dark' ? 1 :.3) : '0'} locked size={14}>DARK</Text>
    </Div>
  )

  // return <Tooltip bottom msg={`Switch to ${theme.mode === 'dark' ? 'light' : 'dark'} mode`}><Toggler onClick={handleClick} used={used} {...props} /></Tooltip>
}

export default ThemeToggler