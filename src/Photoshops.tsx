import React, { /* useState, useEffect, useContext */ } from 'react'
import styled from 'styled-components'

import { IProps } from './utils'
import { Div, Text } from './components/index'
// import { Context } from './App'

interface Props extends IProps {

}

const Gallery = styled.div(() => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
}))

const shops = [
  { areaName: 'this', title: 'This', description: 'I did this.', img: '' },
  { areaName: 'othr', title: 'Other', description: 'Lorem ipsum dolor sit amet.', img: '' },
  { areaName: 'haha', title: 'Haha', description: 'Aha.', img: '' },
]

const Photoshops: React.FC<Props> = () => {
  return (
    <Gallery>
      {shops.map((shop, i) => {
        return (
          <Div i={i} debug>
            <Text type='h1'>{shop.title}</Text>
          </Div>
        )
      })}
    </Gallery>
  )
}

export default Photoshops