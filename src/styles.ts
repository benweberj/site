import { createGlobalStyle } from 'styled-components'

// for some reason you can't css import fonts so you'll just need to keep here and index.html in sync
const fam = 'Assistant'
const codeFam = 'Ubuntu Mono'
const rem = 18

const darkColor = '#2B2F32'
const lightColor = '#EDE6D1' // E0D6B7 is a little darker

const baseStyles = {
  primary: '#60b389',
  accent: '#97cfb3',

  darkColor: darkColor,
  lightColor: lightColor,

  red: '#f5877f', // DB5461
  purple: '#7678ED',
  blue: '#91C4F2',
  green: '#83E8BA',
  wine: '#912F40',
  brown: '#A49E8D',
  orange: '#ED9B40',
  
  green2: '#7FB685',
  green3: '#61C9A8',
  green4: '#97cfb3',


  light: 200,
  regular: 400,
  bold: 700,
  corners: 8,
  cornersSm: 4,
  padding: 30,
  paddingSm: 15,
  rem,

  font: fam,
  codeFont: codeFam,
}

// just learned ts. Not sure this needs to be updated, but it felt like a hack to 
// add the '<any>' -->
export const GlobalStyles = createGlobalStyle<any>`
  html {
    height: 100%;
    display: flex;
  }
  
  body {
    background: ${props => props.theme.base};
    backgroundSize: cover;
    transition: background .5s ease;
    height: 100%;
    flex: 0 0 1;
    width: 100%;
  }

  *, *:after, *:before {
    margin: 0;
    padding: 0;
    font-family: ${fam}, sans-serif;
    box-sizing: border-box;
    font-size: ${rem}px;
    line-height: 1; // this seems 1right, but I don't know the full extent of its changes
  }

  ::-webkit-scrollbar {
    width: 10px;
    display: none;
  }
  
  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888;
  }
  
  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  svg {
    overflow: visible;
    transform-origin: center;
  }

  .parallax-effect { transform-style: preserve-3d }
  // .glare-wrapper { border-radius: 20px; } // don't think this is ever used

  @keyframes pulsedark {
    0% { box-shadow: 0 0 0 0 rgba(255, 255, 255, .15) }
    100% { box-shadow: 0 0 0 60px rgba(255, 255, 255, 0) }
  }

  @keyframes pulselight {
    0% { box-shadow: 0 0 0 0 rgba(0, 0, 0, .05) }
    100% { box-shadow: 0 0 0 60px rgba(0, 0, 0, 0) }
  }

  canvas {
    display: block;
  }

  input {
    border: none;
    outline: none;
    border-radius: ${baseStyles.cornersSm}px;
    padding: 2px 5px;
  }
`



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