// all components have the ability to extend my global props shorthand interface to give them consistent styles via ../utils

// components that utilize styled-components will automatically have access to the theme via their ThemeProvider
// but to import the current theme object, you must import { Context } from ../App

import Button from './Button' // Custom button
import Div from './Div' // Custom div
import Ham from './Ham' // Hamburger SVG icon that transitions into an X when open
import Icon from './Icon' // SVG icons. All icons will be defined within this component so props can be changed. Just give it the name and it handles the rest
import Parallax from './Parallax' // react-paralla-tilt wrapper
import Path from './Path' // Custom SVG path. Works just like regular path, but shorter props and animated on/off status
import SocialMedia from './SocialMedia' // My 4 social media links, with custom SVG animations that are literally too fly, dawg
import Taya from './Taya' // Low-poly SVG artwork of Taya Cerna. Fragments move when hovered over
import Text from './Text' // Custom text
import Tooltip from './Tooltip' // Custom tooltip that shows on the top|bottom|left|right of the child
import ThemeToggler from './ThemeToggler' // Little dot to toggle the theme between light and dark
import TwoFace from './TwoFace' // A classic. Toggle between real and vector me by poking my face

export {
  Button,
  Div,
  Ham,
  Icon,
  Parallax,
  Path,
  SocialMedia,
  Taya,
  Text,
  Tooltip,
  ThemeToggler,
  TwoFace,
}