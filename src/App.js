import { useState, useEffect } from'react'
import { HashRouter, Routes, Route, Link } from 'react-router-dom'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { AnimatePresence } from "framer-motion"

import { useTheme } from './extras/ThemeContext'
import { GlobalStyles } from './extras/styles'

import Home from './pages/Home'
import Projects from './pages/Projects'
import Work from './pages/Work'
import Resume from './pages/Resume'
// import { C19, OS, Info } from './pages/OmicSites'
import Designs from './pages/Designs'
import AirpactFire from './pages/designs/AirpactFire'
import Avole from './pages/designs/Avole'


import WordleSolver from './pages/projects/WordleSolver'
import ParticleMesh from './pages/projects/ParticleMesh'
import GameOfLife from './pages/projects/GameOfLife'
import PolyMesh from './pages/projects/PolyMesh'
import PixelSnakes from './pages/projects/PixelSnakes'
import Lightning from './pages/projects/Lightning'

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
            <HashRouter hashType='noslash'>
               <div id='modal-root' />
               <div id='aux-root' />
               <Header ready={ready} />
               <AnimatePresence>
                  <Routes>
                     <Route path='/' exact element={<Home />} />
                     
                     {/* need to pass theme to sketches/Class components since they cant use my useTheme() hook */}
                     <Route path='/projects' exact element={<Projects />} />
                     <Route path='/projects/wordlesolver' exact element={<WordleSolver />} />
                     <Route path='/projects/particlemesh' exact element={<ParticleMesh theme={theme} />} />
                     <Route path='/projects/gameoflife' exact element={<GameOfLife />} />
                     <Route path='/projects/polymesh' exact element={<PolyMesh theme={theme} />} />
                     <Route path='/projects/pixelsnakes' exact element={<PixelSnakes theme={theme} />} />
                     <Route path='/projects/lightning' exact element={<Lightning theme={theme} />} />

                     <Route path='/designs' exact element={<Designs />} />
                     <Route path='/designs/airpactfire' exact element={<AirpactFire />} />
                     <Route path='/designs/avole' exact element={<Avole />} />

                     
                     <Route path='/work' exact element={<Work />} />
                     {/* <Route path='/work/omic/os' exact element={<OS />} />
                     <Route path='/work/omic/c19' exact element={<C19 />} />
                     <Route path='/work/omic/info' exact element={<Info />} /> */}
                     
                     <Route path='/resume' exact element={<Resume />} />
                     
                     <Route path='*' element={<UnknownPage />} />
                  </Routes>
               </AnimatePresence>
         </HashRouter>
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
               { link: '/', name: 'Home' },
               { link: '/projects', name: 'Projects' },
               { link: '/work', name: 'Work Experience'},
               { link: '/resume', name: 'Resume'},
            ].map(page => (
               <Link to={page.link}>
                  <button className='chip'>{page.name}</button>
               </Link>
            ))}
         </div>
      </Main>
   )
}