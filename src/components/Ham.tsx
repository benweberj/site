import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'

import { IProps } from '../utils'
import { Context } from '../App'
// import { Div } from './index'

interface Props extends IProps {
  open: boolean,
  toggle: () => void,
  style?: any,
  accentColor?: string
}

const Ham: React.FC<Props> = props => {
  const { theme } = useContext(Context)
  const { open, toggle, style, accentColor=theme.complement } = props

  const dur = .6

  useEffect(() => {
    console.log(theme)
  }, [])
  
  return (
    <Icon style={style} open={open} onClick={toggle} dur={dur} color={accentColor} id="hamburger" className={`hamburglar ${open ? 'is-open' : 'is-closed'}`}>
      <div className="burger-icon">
        <div className="burger-container">
          <span className="burger-bun-top"></span>
          <span className="burger-filling"></span>
          <span className="burger-bun-bot"></span>
        </div>
      </div>

      {/* svg ring containter */}
      <div className="burger-ring">
        <svg className="svg-ring">
          <path className="path" fill="none" stroke={theme.red} stroke-miterlimit="10" stroke-width="4" d="M 34 2 C 16.3 2 2 16.3 2 34 s 14.3 32 32 32 s 32 -14.3 32 -32 S 51.7 2 34 2" />
        </svg>
      </div>
      
      {/* the masked path that animates the fill to the ring */}
      <svg width="0" height="0">
        <mask id="mask">
      <path xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#ff0000" stroke-miterlimit="10" stroke-width="4" d="M 34 2 c 11.6 0 21.8 6.2 27.4 15.5 c 2.9 4.8 5 16.5 -9.4 16.5 h -4" />
        </mask>
      </svg>

      <div className="path-burger">
        <div className="animate-path">
          <div className="path-rotation"></div>
        </div>
      </div>

    </Icon>
  )
  // return <h1 style={{ fontSize: 100, color: 'white', fontWeight: 'bold' }}onClick={() => setOpen(!open)} >{open ? 'x' : '='}</h1>
}

export default Ham

const Icon = styled.div<any>`

  border-radius: 999px;
  &:hover {
    background: ${props => props.open && `${props.theme.red}99`};
    opacity: ${props => props.open ? 1 : .5};
    
  }

  transition: all .5s ease;
  position: relative;
  display: block;
  width: 68px;
  height: 68px;
  // background: $blue;
  -webkit-touch-callout: none;
  user-select: none;

  // transition mask
  .path-burger {
    position: absolute;
    top: 0;
    left: 0;
    height: 68px;
    width: 68px;
    // two masks because... browser support.
    mask: url(#mask);
    -webkit-mask-box-image: url(https://raygun.io/upload/mask.svg);
  }

  .animate-path {
    position: absolute;
    top: 0;
    left: 0;
    width: 68px;
    height: 68px;
  }

  // what this does is create a small square that I then rotate behind an svg mask, giving the apparence of the line animating
  .path-rotation {
    height: 34px;
    width: 34px;
    margin: 34px 34px 0 0;
    transform: rotate(0deg);
    transform-origin: 100% 0;
    &:before {
      content: '';
      display: block;
      width: 30px;
      height: 34px;
      margin: 0 4px 0 0;
      background: ${props => props.color};
    }
  }

  // box rotation animation
  @keyframes rotate-out {
    0% { transform: rotate(0deg) }
    40% { transform: rotate(180deg) }
    100% { transform: rotate(360deg) }
  }

  @keyframes rotate-in {
    0% { transform: rotate(360deg) }
    40% { transform: rotate(180deg) }
    100% { transform: rotate(0deg) }
  }

  // offset moves
  // dasharray is the dash size
  // need to be able to control dash space size.

  &.is-open {
    .path {
      animation: dash-in ${props => props.dur}s linear normal;
      animation-fill-mode:forwards;
    }
    .animate-path {
      animation: rotate-in ${props => props.dur}s linear normal;
      animation-fill-mode:forwards;
    }
  }

  &.is-closed {
    .path {
      animation: dash-out ${props => props.dur}s linear normal;
      animation-fill-mode:forwards;
    }
    .animate-path {
      animation: rotate-out ${props => props.dur}s linear normal;
      animation-fill-mode:forwards;
    }
  }

  .path {
    stroke-dasharray: 240;
    stroke-dashoffset: 240;
    stroke-linejoin: round;
  }

  @keyframes dash-in {
    0% { stroke-dashoffset: 240 }
    40% { stroke-dashoffset: 240 }
    100% { stroke-dashoffset: 0 }
  }

  @keyframes dash-out {
    0% { stroke-dashoffset: 0 }
    40% { stroke-dashoffset: 240 }
    100% { stroke-dashoffset: 240 }
  }

  .burger-icon {
    position: absolute;
    padding: 20px 16px;
    height: 68px;
    width: 68px;
  }

  .burger-container {
    position: relative;
    height: 28px;
    width: 36px;
  }

  .burger-bun-top,
  .burger-bun-bot,
  .burger-filling {
    position: absolute;
    display: block;
    height: 4px;
    width: 36px;
    border-radius: 2px;
    background: ${props => props.color};
  }

  .burger-bun-top {
    top: 0;
    transform-origin: 34px 2px;
  }

  .burger-bun-bot {
    bottom: 0;
    transform-origin: 34px 2px;
  }

  .burger-filling { top: 12px }

  // burger ring container
  .burger-ring {
    position: absolute;
    top: 0;
    left: 0;
    width: 68px;
    height: 68px;
  }

  .svg-ring { width: 68px; height: 68px }

  // bun animations 
  &.is-open {
    .burger-bun-top {
      animation: bun-top-out ${props => props.dur}s linear normal;
      animation-fill-mode:forwards;
    }
    .burger-bun-bot {
      animation: bun-bot-out ${props => props.dur}s linear normal;
      animation-fill-mode:forwards;
    }
  }

  &.is-closed {
    .burger-bun-top {
      animation: bun-top-in ${props => props.dur}s linear normal;
      animation-fill-mode:forwards;
    }
    .burger-bun-bot {
      animation: bun-bot-in ${props => props.dur}s linear normal;
      animation-fill-mode:forwards;
    }
  }

  @keyframes bun-top-out {
    0% { left: 0; top: 0; transform: rotate(0deg) }
    20% { left: 0; top: 0; transform: rotate(15deg) }
    80% { left: -5px; top: 0; transform: rotate(-60deg) }
    100% { left: -5px; top: 1px; transform: rotate(-45deg) }
  }

  @keyframes bun-bot-out {
    0% { left: 0; transform: rotate(0deg) }
    20% { left: 0; transform: rotate(-15deg) }
    80% { left: -5px; transform: rotate(60deg) }
    100% { left: -5px; transform: rotate(45deg) }
  }


  @keyframes bun-top-in {
    0% { left: -5px; bot: 0; transform: rotate(-45deg) }
    20% { left: -5px; bot: 0; transform: rotate(-60deg) }
    80% { left: 0; bot: 0; transform: rotate(15deg) }
    100% { left: 0; bot: 1px; transform: rotate(0deg) }
  }

  @keyframes bun-bot-in {
    0% { left: -5px; transform: rotate(45deg) }
    20% { left: -5px; bot: 0; transform: rotate(60deg) }
    80% { left: 0; bot: 0; transform: rotate(-15deg) }
    100% { left: 0; transform: rotate(0deg) }
  }

  // burger filling
  &.is-open {
    .burger-filling {
      animation: burger-fill-out ${props => props.dur}s linear normal;
      animation-fill-mode:forwards;
    }
  }

  &.is-closed {
    .burger-filling {
      animation: burger-fill-in ${props => props.dur}s linear normal;
      animation-fill-mode:forwards;
    }
  }

  @keyframes burger-fill-in {
    0% { width: 0; left: 36px }
    40% { width: 0; left: 40px }
    80% { width: 36px; left: -6px }
    100% { width: 36px; left: 0px }
  }

  @keyframes burger-fill-out {
    0% { width: 36px; left: 0px }
    20% { width: 42px; left: -6px }
    40% { width: 0; left: 40px }
    100% { width: 0; left: 36px }
  }
`