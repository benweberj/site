import React, { useState } from 'react'
import styled from 'styled-components'

const Toggler = styled.button(props => ({
  opacity: .3,
  padding: props.used ? '.5rem .5rem' : '.5rem 2rem',
  borderRadius: '100px',
  outline: 0,
  border: 0,
  fontWeight: props.theme.regular,
  background: props.theme.complement,
  transition: 'all .5s ease',
  display: 'block',
  margin: 'auto',

  marginTop: 15, // hard-coding right here since toggler will likely always be at the top

  '&:hover': {
    opacity: 1,
    padding: !props.used && '.5rem 2.5rem',
    transform: props.used && 'scale(1.2)'
  },
}))

export default props => {
  const [used, setUsed] = useState(false)

  const handleClick = _ => {
    props.toggleMode()
    setUsed(true)
  }

  return <Toggler onClick={handleClick} used={used} {...props} />
}