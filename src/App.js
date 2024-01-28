import { useState, useEffect } from'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { AnimatePresence } from "framer-motion"

import { useTheme } from './extras/ThemeContext'
import { GlobalStyles } from './extras/styles'

import Home from './pages/Home'
import Projects from './pages/Projects'
import Work from './pages/Work'
import Resume from './pages/Resume'
// import { C19, OS, Info } from './pages/OmicSites'

import WordleSolver from './pages/WordleSolver'
import ParticleMesh from './pages/ParticleMesh'
import GameOfLife from './pages/GameOfLife'
import PolyMesh from './pages/PolyMesh'
import PixelSnakes from './pages/PixelSnakes'

import { Header, Main, Modal } from './components/index'

export default function App() {
   const [theme, _] = useTheme()
   const [ready, setReady] = useState(false)

   useEffect(() => {
      setReady(true)
   }, [])
   

   return (
      <StyledThemeProvider theme={theme}>
         <GlobalStyles theme={theme} />
         {/* TODO: use hash router so you can navigate to nested pages via the URL search bar */}
            <Router>
               <div id='modal-root' />
               <div id='aux-root' />
               <Header ready={ready} />
               <AnimatePresence>
                  <Routes>
                     <Route path='/site' exact element={<Home />} />
                     
                     {/* need to pass theme to sketches/Class components since they cant use my useTheme() hook */}
                     <Route path='site/projects' exact element={<Projects />} />
                     <Route path='site/projects/wordlesolver' exact element={<WordleSolver />} />
                     <Route path='site/projects/particlemesh' exact element={<ParticleMesh theme={theme} />} />
                     <Route path='site/projects/gameoflife' exact element={<GameOfLife />} />
                     <Route path='site/projects/polymesh' exact element={<PolyMesh theme={theme} />} />
                     <Route path='site/projects/pixelsnakes' exact element={<PixelSnakes theme={theme} />} />
                     
                     <Route path='site/work' exact element={<Work />} />
                     {/* <Route path='/work/omic/os' exact element={<OS />} />
                     <Route path='/work/omic/c19' exact element={<C19 />} />
                     <Route path='/work/omic/info' exact element={<Info />} /> */}
                     
                     <Route path='site/resume' exact element={<Resume />} />
                     
                     <Route path='*' element={<UnknownPage />} />
                  </Routes>
               </AnimatePresence>
         </Router>
      </StyledThemeProvider>
   )
}

const UnknownPage = () => {
   return (
      <Main className='center col'>
         <h1 style={{ fontSize: '4rem' }}>404</h1>
         <p className='mbl'>This page doesn't exist</p>
         <p>Go here instead?</p>
         <div className='flex sep-sm'>
            {[
               { link: 'site/', name: 'Home' },
               { link: 'site/projects', name: 'Projects' },
               { link: 'site/work', name: 'Work Experience'},
               { link: 'site/resume', name: 'Resume'},
            ].map(page => (
               <Link to={page.link}>
                  <button className='chip'>{page.name}</button>
               </Link>
            ))}
         </div>
      </Main>
   )
}