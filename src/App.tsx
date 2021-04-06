import React, { useState, /* useEffect */ } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme, GlobalStyles } from './styles';

import { ThemeToggler, Text, Button } from './components/index'

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(true)

  const toggleMode = () => setDarkMode(!darkMode)

  const t = theme[darkMode ? 'dark' : 'light']
  console.log('theme', t)

  return (
    <ThemeProvider theme={t}>
      <GlobalStyles theme={t} />
      <ThemeToggler toggleMode={toggleMode} />
      <Text>Hey man press this <Button p={5} onClick={toggleMode}>button</Button></Text>
   </ThemeProvider>
  )
}

export default App