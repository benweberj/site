import React, { useState, useEffect } from 'react'
import { ThemeProvider } from 'styled-components'

import { theme, GlobalStyles } from './styles'
import { ThemeToggler, Div, Button, SocialMedia, Ham } from './components/index'
import Sketches from './p5/Sketches'

export const Context = React.createContext({ theme: theme.dark })

// Lil helpers

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(true)
  const [a, setA] = useState(false)

  useEffect(() => {
    const dm = localStorage.getItem('darkMode')
    if (dm) setDarkMode(dm == 'true')
    // alert('take that monline drawing and just fucking trace it in figma so theres separate lines and only only one line per side')
  }, [])

  useEffect(() => { return () => localStorage.setItem('darkMode', (!darkMode).toString()) })

  const toggleMode = () => setDarkMode(!darkMode)

  const t = theme[darkMode ? 'dark' : 'light']


  // Okay good idea here
  // For all components, have an onLoad animation
  // for Text, it could maybe have each of the characters quickly pop in with a typing-esque animation like:
  //    - start char translated down like 10 pixels, and be invisible
  //    - successively make each character visible (does this require each character to be a custom little comp? Oh, you don't even need to return an HTML tag so this could be no hiccup)
  //    - NOTE: I think the characters should start out visible so that the layout doesn't glitch out when it initially loads and grows
  // for Buttons, animate the border if thats possible, like an SVG

  return (
    <Context.Provider value={{ theme: t }}> { /* for manually importing */}
      <ThemeProvider theme={t}> { /* for easy access in styled-components */}
        <GlobalStyles theme={t} />
        <ThemeToggler toggleMode={toggleMode} />

        {/* theme key */}
        {/* <Div style={{ position: 'absolute', top: 10, left: 10 }}>
          {Object.keys(t).map(key => (typeof t[key] == 'string' && t[key][0] == '#') && <Div p={4} mb={5} w={130} center ml={20} circle bg={t[key]}><Text size={14} color={t[key]} invert>{key}</Text></Div> )}
        </Div> */}

        <Ham open={a} toggle={() => setA(!a)} />
        
        <Div full col center pt={100}>
          <Div w='100%' center>
            <Div mx={20} circle minW={400} minH={400} bg='#fff' />
          </Div>

          <SocialMedia />
          <Sketches />
          
          <Div split mt={50}>
            <Button action='back' i={1} m={10} onClick={() => {}}>Back</Button>
            <Button i={2} m={10} onClick={() => {}}>Btn 2 haha</Button>
            <Button i={3} m={10} onClick={() => {}}>What the fuck did you just say</Button>
          </Div>
        </Div>
      </ThemeProvider>
    </Context.Provider>
  )
}

export default App