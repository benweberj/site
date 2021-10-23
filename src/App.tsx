import React, { useState, useEffect } from 'react'
import { ThemeProvider } from 'styled-components'

import { theme, GlobalStyles } from './styles'
import { Div, Text, Button, SocialMedia, ThemeToggler, TwoFace } from './components/index'
import Sketches from './Sketches'
import Photoshops from './Photoshops'
import Taya from './components/Taya'


export const Context = React.createContext({ theme: theme.dark })

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(true)
  const [showing, setShowing] = useState<string|null>(null)
  
  const toggleMode = () => setDarkMode(!darkMode)

  const t = theme[darkMode ? 'dark' : 'light']

  const sections = {
    'p5': { name: 'P5', color: t.red, comp: <Sketches /> },
    'ps': { name: 'Photoshop', color: t.blue, comp:  <Photoshops /> },
    'ui': { name: 'UI Design', color: t.green, comp: null },
    'pc': { name: 'Procreate', color: t.orange, comp: null },
  }

  useEffect(() => {
    // const dm = localStorage.getItem('darkMode')
    // if (dm) setDarkMode(dm == 'true')

    console.log(Button, Text)

    // alert('take that monline drawing and just fucking trace it in figma so theres separate lines and only only one line per side')
  }, [])

  useEffect(() => { return () => localStorage.setItem('darkMode', (!darkMode).toString()) })

  // Okay good idea here
  // For all components, have an onLoad animation
  // for Text, it could maybe have each of the characters quickly pop in with a typing-esque animation like:
  //    - start char translated down like 10 pixels, and be invisible
  //    - successively make each character visible (does this require each character to be a custom little comp? Oh, you don't even need to return an HTML tag so this could be no hiccup)
  //    - NOTE: I think the characters should start out visible so that the layout doesn't glitch out when it initially loads and grows
  // for Buttons, animate the border if thats possible, like an SVG

  // return <Context.Provider value={{ theme: t }}> { /* for manually importing */}
  // <ThemeProvider theme={t}> { /* for easy access in styled-components */}
  //   <GlobalStyles theme={t} />
  //   </ThemeProvider>
  //   </Context.Provider>

  return (
    <Context.Provider value={{ theme: t }}> { /* for manually importing */}
      <ThemeProvider theme={t}> { /* for easy access in styled-components */}
        <GlobalStyles theme={t} />
        <ThemeToggler toggle={toggleMode} />
        {/* <Text type='h1'>Here's what I do</Text> */}
        <Div col center>
          {/* <TwoFace /> */}
          {/* <Taya /> */}
          <Sketches />
        </Div>

        {/* theme key */}
        {/* <Div flex style={{ position: 'absolute', top: 10, left: 10 }}>
          {Object.keys(t).map(key => (typeof t[key] == 'string' && t[key][0] == '#') && <Div w={30} h={30} bg={t[key]} /> )}
        </Div> */}


        {/* <Div flex m={50}>
          {Object.keys(sections).map((key, i) => {
            const section = sections[key]
            const cur = key === showing
            return <Button color={section.color} i={i} selected={cur} onClick={() => setShowing(key)}>{section.name}</Button>
            // return <Div glass style={cur ? { border: '3px solid white' } : {} } p={20} m={20} bg={section.color} onClick={() => setShowing(section.id)}>{section.id}</Div>
          })}
        </Div>
        <SocialMedia /> */}
        
        {/* {showing ? sections[showing].comp : 'nullio'} */}



        {/* <Ham open={a} toggle={() => setA(!a)} /> */}
        
        {/* <Div full col center pt={100}> */}
          {/* <Div w='100%' center>
            <Div mx={20} circle minW={400} minH={400} bg='#fff' />
          </Div> */}
          {/* <Text type='h1'>Ben Weber <Text inline pl={10} light accent o={.5}>Web Developer</Text></Text> */}
          {/* <Div center w='100%'>
            <Div justify='end' w='100%'><Text type='h1'>Ben Weber</Text></Div>
            <Div active={{ transform: 'rotate(180deg)' }} circle bg={t.primary} style={{ border: '3px solid white' }} minW={50} minH={50} m={15} />
            <Div w='100%'><Text type='h1' light accent>Web Developer</Text></Div>
          </Div> */}

          {/* <SocialMedia />
          <Sketches />
          
          <Div split mt={50}>
            <Button action='down' i={1} m={10} onClick={() => {}}>About Me</Button>
          </Div>
        </Div> */}
      </ThemeProvider>
    </Context.Provider>
  )
}

export default App