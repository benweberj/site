import React, { useContext } from 'react'
import { IProps } from '../utils'

import { Path } from './index'
import { Context } from '../App'

interface Props extends IProps {
  name?: string,
  on?: boolean,
}

// back
{/* <svg width="186" height="268" viewBox="0 0 186 268" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M185 1L1 134L185 267" stroke="black"/>
</svg> */}



// I think you can just store the path's d's in an array?

// icons must have their d value fit to a 100 x 100 viewBox

const icons = {
  back: {
    d: 'M82 4L15 50L82 96',
    viewBox: '0 0 100 100'
  },
  forward: {
    d: 'M18 96L85 50L18 3.99999',
    viewBox: '0 0 100 100'
  },
  up: {
    d: 'M96 70L50 28L4 70',
    viewBox: '0 0 100 100'
  },
  down: {
    d: 'M4.00001 30L50 72L96 30',
    viewBox: '0 0 100 100'
  },

}

const Icon: React.FC<Props> = props => {
  const { w=18, h=18, name, on=true } = props
  const { theme} = useContext(Context)

  if (!name || !Object.keys(icons).includes(name)) {
    return <span style={{ color: 'red', fontSize: 10 }}>missing/unknown $name</span>
  }

  console.log(name, w, h)
  const icon = icons[name]

  const iconProps = {
    on,
    weight: 10,
  }

  return <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox={icon.viewBox} width={w} height={h}>
    <Path {...iconProps} d={icon.d} stroke={theme.primary} />
  </svg>
}

export default Icon