import React, { useState } from 'react'
import styled from 'styled-components'

interface Props {
  toggleMode: () => void;
  used?: boolean;
}

const Toggler = styled.button<Props>(props => ({
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
    padding: !props.used ? '.5rem 2.5rem' : undefined,
    transform: props.used ? 'scale(1.2)' : undefined,
  },
}))

const ThemeToggler: React.FC<Props> = props => {
  const [used, setUsed] = useState(false)
  const { toggleMode } = props

  const handleClick = _ => {
    toggleMode()
    setUsed(true)
  }

  return <Toggler onClick={handleClick} used={used} {...props} />
}

export default ThemeToggler