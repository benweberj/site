import { createGlobalStyle } from 'styled-components'

// just learned ts. Not sure this needs to be updated, but it felt like a hack to 
// add the '<any>' -->

// for some reason you can't css import fonts so you'll just need to keep here and index.html in sync
const fam = 'DM Sans'
const codeFam = 'Ubuntu Mono'
const rem = 18

export const GlobalStyles = createGlobalStyle<any>`

  html { height: 100% }
  
  body {
    background: ${props => props.theme.base};
    backgrounSize: cover;
    transition: background .5s ease;
    height: 100%;
  }

  * {
    margin: 0;
    padding: 0;
    font-family: ${fam}, sans-serif;
    box-sizing: border-box;
    font-size: ${rem}px;
    line-height: 1; // this seems right, but I don't know the full extent of its changes
  }

  .parallax-effect { transform-style: preserve-3d }

  // .glare-wrapper { border-radius: 20px; }

  @keyframes pulsedark {
    0% { box-shadow: 0 0 0 0 rgba(255, 255, 255, .15) }
    100% { box-shadow: 0 0 0 60px rgba(255, 255, 255, 0) }
  }

  @keyframes pulselight {
    0% { box-shadow: 0 0 0 0 rgba(0, 0, 0, .05) }
    100% { box-shadow: 0 0 0 60px rgba(0, 0, 0, 0) }
  }
`

const darkColor = '#222733'
const lightColor = '#e0d6b7'

const baseStyles = {
  primary: '#60b389',
  accent: '#97cfb3',

  light: 100,
  regular: 400,
  bold: 700,
  corners: 10,
  cornersSm: 4,
  rem,

  font: fam,
  codeFont: codeFam,
}

export const theme = {
  dark: {
    mode: 'dark',
    base: darkColor,
    complement: lightColor,
    ...baseStyles
  },

  light: {
    mode: 'light',
    base: lightColor,
    complement: darkColor,
    ...baseStyles
  }
}