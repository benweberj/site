import React, { useState, useEffect, useContext } from 'react'
import P5Wrapper from 'react-p5-wrapper'
import styled from 'styled-components'
import AnimateHeight from 'react-animate-height'
import debounce from 'lodash.debounce'

import { Context } from './App'
import { IProps } from './utils'
import { Div, Button, Text, BoolToggle, Icon, Ham } from './components/index'

import snake, { snakeInfo } from './sketches/snake'
import starfield, { starfieldInfo } from './sketches/starfield'
import matrix, { matrixInfo } from './sketches/matrix'
import life, { lifeInfo } from './sketches/life'
import sino, { sinoInfo } from './sketches/sino'

const sketches = [
   { ...snakeInfo, sketch: snake },
   { ...starfieldInfo, sketch: starfield },
   { ...matrixInfo, sketch: matrix },
   { ...lifeInfo, sketch: life },
   { ...sinoInfo, sketch: sino },
]

interface Props extends IProps {

}

const sketchId = 'sketcharino'

const Sketches: React.FC<Props> = () => {
   const [sketch, setSketch] = useState<any>(sketches[4])
   const [settingsOpen, setSettingsOpen] = useState(false)
   const { theme } = useContext(Context)
   const [descriptionStates, setDescriptionStates] = useState({})

   const debounceTime = 200; // ms

   // for some reason, sketches duplicate when you switch without this
   useEffect(() => {
      let canvases:any = document.querySelectorAll(`canvas`)
      for (let i = 0; i < canvases.length-1; i++) {
         canvases[i].parentNode.removeChild(canvases[i]);
      }
   }, [sketch])

   // const handleKeydown = (e) => {
   //    console.log(e)
   // }

   // useEffect(() => {
   //    document.addEventListener('keyDown', handleKeydown)

   //    return () => document.removeEventListener('keyDown', handleKeydown)
   // }, [])

   useEffect(() => {
      let obj = {}
      Object.keys(sketch.settings).forEach(entry => obj[entry] = false)
      setDescriptionStates(obj)
   }, [sketch])

   const flipSettingBool = (key: string) => {
      setSketch({
         ...sketch,
         settings: {
            ...sketch.settings,
            [key]: {
               ...sketch.settings[key],
               value: !sketch.settings[key].value
            }
         }
      })
   }

   const changeSettingValue = debounce(function(key:string, newValue:any, isString:boolean=false) {
      setSketch({
         ...sketch,
         settings: {
            ...sketch.settings,
            [key]: {
               ...sketch.settings[key],
               value: isString ? newValue : parseFloat(newValue)
            }
         }
      })
   }, debounceTime)

   return (
      <>
         <Div flex mb={20}>{sketches.map(sk => <Button mr={10} onClick={() => setSketch(sk)}>{sk.name}</Button>)}</Div>

         <Div rel contain id={sketchId}>
            <P5Wrapper
               name={sketch.name}
               sketch={sketch.sketch}
               style={{ position: 'relative' }}
               settings={sketch.settings}>
            </P5Wrapper>

            <Div abs t={'0'} b={'0'}
               p={20} pt={55} rad={'0'} bg={`${theme.base}bb`}
               tx={settingsOpen ? 0 : '-100%'}
               style={{ borderRight: '2px solid white' }}
            >
               <Ham scale={.5}
                  open={settingsOpen}
                  accentColor={!settingsOpen ? theme.base : theme.complement}
                  toggle={() => setSettingsOpen(!settingsOpen)}
                  style={{
                     position: 'absolute',
                     top: 10,
                     right: 0,
                     transform: `scale(.5) translateX(${settingsOpen ? '0px' : '180%'}`,
                     transformOrigin: 'top center'
                  }}
               />
               <form>
                  {Object.keys(sketch.settings).map(key => {
                     const setting = sketch.settings[key]; // the obj with value, name, description
                     let input = <input
                        type='number'
                        step={setting.step || 1}
                        defaultValue={setting.value}
                        style={{ maxWidth: 50, fontSize: 15 }}
                        onChange={e => changeSettingValue(key, e.target.value)}
                     />
                     if (setting.color) {
                        input = <input type='color' defaultValue={setting.value} onChange={e => changeSettingValue(key, e.target.value, true)} />
                     } else if (typeof setting.value == 'boolean') {
                        input = <BoolToggle
                           colors
                           val={setting.value}
                           toggle={() => flipSettingBool(key)}
                        />
                     }
                     return <Div w={200}>
                        <Div split pb={5}>
                           <Div align='center' mr={15}>
                              <Text size={15} mr={5}>{setting.name}</Text>
                              {sketch.settings[key].description && <Div circle center w={15} h={15} bg={descriptionStates[key] ? theme.red : '#fff'} style={{ fontSize: 10, fontWeight: 'bold' }} onClick={() => setDescriptionStates({ ...descriptionStates, [key]: !descriptionStates[key] })}>{descriptionStates[key] ? 'x' : 'i'}</Div>}
                           </Div>
                           {input}
                        </Div>
                        <AnimateHeight height={descriptionStates[key] ? 'auto' : '0'}>
                           {setting.description && <Text light o={.7} size={15} pb={10}>{setting.description}</Text>}
                        </AnimateHeight>
                     </Div>
                  })}
               </form>
            </Div>
         </Div>
      </>
   )
}

export default Sketches