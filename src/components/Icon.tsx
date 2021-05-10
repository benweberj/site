import React, { useContext } from 'react'
import { IProps } from '../utils'

import { Path } from './index'
import { Context } from '../App'

interface Props extends IProps {
  name?: string | null,
}

// back
{/* <svg width="186" height="268" viewBox="0 0 186 268" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M185 1L1 134L185 267" stroke="black"/>
</svg> */}



// I think you can just store the path's d's in an array?


const icons = {
  back: {
    d: 'M78 4L14 48L78 92',
    viewBox: '0 0 100 96'
  },

}

const Icon: React.FC<Props> = props => {
  const { w=18, h=18, name } = props
  const { theme } = useContext(Context)

  if (!name || !Object.keys(icons).includes(name)) {
    return <span style={{ color: 'red', fontSize: 10 }}>missing/unknown $name</span>
  }

  console.log(name, w, h)
  const icon = icons[name]

  const iconProps = {
    on: true,
    weight: 10,
  }

  return <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox={icon.viewBox} width={w} height={h}>
    <Path {...iconProps} d={icon.d} stroke={theme.primary} />
  </svg>
}

export default Icon