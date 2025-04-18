import { useState, useEffect, useRef } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { Toaster, toast } from 'react-hot-toast'

import { useTheme } from '../../extras/ThemeContext'
import { WORD_LIST, commonWords } from './words'
import { Modal } from '../../components/index'


const colors = { right: '#618654', wrong: '#616466', maybe: '#9f9151', empty: '#222' }
const modes = Object.keys(colors)

emailjs.init({ publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY })

const GlobalStyle = createGlobalStyle`html { overflow: hidden; }`

export default function WordleSolver(props) {
    const [possibleWords, setPossibleWords] = useState([])
    const [stagedChar, setStagedChar] = useState(null)
    const [viewingAllWords, setViewingAllWords] = useState(false)
    const goingBack = useRef(false)
    const [theme, _] = useTheme()
    const [showingFeedback, setShowingFeedback] = useState(false)
    const userToggled = useRef(null)
    const [showingFeedbackModal, setShowingFeedbackModal] = useState(false)

    function getGuesses() {
        let words = []
        for (let i = 0; i < 25; i+=5) {
            let word = ''
            for (let j = 0; j < 5; j++) {
                let char = getInput(i+j).value || '.'
                word += char
            }
            words.push(word)
        }
        return words
    }

    
    const $ = (q) => document.querySelector(q)

    async function sendFeedbackEmail() {
        const correctWord = $('#correctword')
        const numGuesses = $('#numguesses')
        const feedback = $('#feedback')
        const guessList = getGuesses()
        const validGuesses = guessList.filter(g => g.split('').filter(x => x != '.').length === 5).length

        let body= ''

        const cw = correctWord.value || ''

        if (showingFeedbackModal === 'good') {
            const ng = numGuesses.value || null
            body = `Somebody used the solver for ${cw ? `"${cw}"` : '-----'} and got it in ${ng || '-'} guesses.`
        } else if (showingFeedbackModal === 'bad') {
            alert('')
            const fb = feedback.value
            body = fb ? `Somebody had an issue using the solver${cw && ` for the word "${cw}"`}. They said: "${fb}". END.` : 'They had nothing to say'
        }
        body += '\n' + validGuesses > 0 ? ` Their guesses were: [${guessList.toString()}].` : ' They had no complete guesses on the board.'
        

        try {
            await emailjs.send(
              process.env.REACT_APP_EMAIL_SERVICE_ID,
              process.env.REACT_APP_EMAIL_TEMPLATE_ID,
              {
                message: body,
              },
              process.env.REACT_APP_PUBLIC_KEY,
            );
            console.log('Email sent successfully. Body:', body);
            toast('Thanks for the feedback!', {
                duration: 1500,
                style: { fontSize: '0.8rem' }
            })
        } catch (error) {
            console.error('Failed to send email:', error, 'Body:', body);
        }

        setShowingFeedback(false)
    

    }
    
    const wordLimit = 10
    const limitedWords = possibleWords.slice(0, wordLimit)

    useEffect(() => {
        if (showingFeedback) userToggled.current = true
    }, [showingFeedback])

    function showFeedback() {
        if (!userToggled.current) {
            // user hasnt interacted with feedback btn, so auto show it
            setShowingFeedback(true)
        }
    }

    useEffect(() => {

        setTimeout(showFeedback, 15000)

        clearBoard()
    }, [])

    useEffect(() => {
        if (possibleWords.length <= wordLimit) {
            setViewingAllWords(false)
        } 
    }, [possibleWords])


    function getLetters() {
        let i = 0
        const letters = []
        while (i < 25) {
            const input = getInput(i)
            const cell = getCell(i)

            if (!input.value || input.value.length != 1) break
            const classes = cell.className.split(' ')

            let status = 'empty'

            if (classes.includes('right')) { status = 'right' }
            else if (classes.includes('maybe')) { status = 'maybe' }
            else if (classes.includes('wrong')) { status = 'wrong' }

            if (status === 'empty') break

            letters.push([input.value.toLowerCase(), status])
            i++
        }
        return letters
    }

    // ! Fix logic -- sometimes a letter can be marked missing but suggested words contain that letter
    function evaluate() {
        const letters = getLetters()
        const states = {}

        // determine the indices that each guessed letter can appear
        letters.forEach(([letter, status], i) => {
            const idx = i % 5
            const indices = states[letter]

            if (typeof indices === 'object') { // we have information about this characters position
                if (status === 'right') {
                    if (indices.length === 1 && typeof indices[0] !== 'object' && indices[0] != idx) {
                        states[letter] = [[indices[0], idx]]
                    } else {
                        states[letter] = [idx]
                    }
                }
                if (status === 'maybe' && indices.length > 1) {
                    states[letter] = indices.filter(x => x != idx)
                }
            } else {
                if (status === 'wrong') states[letter] = []
                else if (status === 'right') states[letter] = [idx]
                else if (status === 'maybe') states[letter] = [0, 1, 2, 3, 4].filter(x => x != idx)
            }
        })

        const rights = {}
        const maybes = []
        for (let i = 0; i < 25; i++) {
            const cell = getCell(i)
            const idx = i % 5
            if (cell.className.includes('right')) {
                rights[idx] = getInput(i).value.toLowerCase()
            } else if (cell.className.includes('maybe')) {
                maybes.push(getInput(i).value.toLowerCase())
            }
        }

        Object.keys(states).forEach(letter => {
            if (states[letter].length > 1) {
                Object.keys(rights).forEach(i => {
                    i = parseInt(i)
                    if (states[letter].includes(i)) {
                        states[letter] = states[letter].filter(x => x != i)
                    }
                })
            }
        })

        const spotsFilter = word => {
            for (let i = 0; i < 5; i++) {
                const curChar = word[i]
                if (Object.keys(rights).includes(`${i}`) && rights[`${i}`] !== curChar) return false
                let charState = states[curChar]
                if (charState) {
                    if (charState.length === 0) return false
                    if (charState.length === 1) {
                        if (typeof charState[0] === 'object') {
                            const spot1 = charState[0][0]
                            const spot2 = charState[0][1]
                            if (!(word[spot1] === curChar && word[spot2] === curChar)) return false
                        }
                    } else if (!charState.includes(i)) return false
                } else if (Object.keys(rights).includes(`${i}`)) return false
            }

            for (let i = 0; i < maybes.length; i++) {
                if (!word.includes(maybes[i])) return false
            }
            return true
        }
        setPossibleWords(WORD_LIST.filter(spotsFilter))
    }

    function getCell(i) { return document.getElementById(`wordle-cell-${i}`) }
    function getInput(i) { return document.getElementById(`wordle-cell-input-${i}`) }

    function clearBoard() {
        setPossibleWords('Try me out. Open up Wordle in another tab.'.split(' '))
        for (let i = 0; i < 25; i++) {
            getInput(i).value = ''
            getCell(i).className = 'cell empty'
        }
    }

    function toggleMode(idx, mode) {
        const cell = getCell(idx)
        cell.className = `cell ${mode}`
        if (mode === 'empty') {
            getInput(idx).value = ''
        }
    }

    function handlePress(e, idx) {
        const ch = e.target.value
        if (ch.length === 1) {
            toggleMode(idx, 'wrong')
            focusOn(idx + 1)
        }
    }

    function focusOn(idx) {
        if (idx < 0) idx = 0
        if (idx > 24) idx = 24
        const input = getInput(idx)
        input.focus()
    }

    function handleFocus(e, idx) {
        setStagedChar(e.target.value)
        getInput(idx).value = ''
    }

    function handleBlur(e, idx) {
        if (!e.target.value) {
            if (goingBack.current) {
                toggleMode(idx, 'empty')
            } else {
                getInput(idx).value = stagedChar
            }
        }
        setStagedChar(null)
        goingBack.current = false
    }

    function handleKeydown(e, idx) {
        if (e.code === 'Backspace') {
            goingBack.current = true
            setStagedChar(null)
            focusOn(idx - 1)
        }
    }

    function addToBoard(word) {
        if (word.length !== 5) return
    
        // Find the next available row
        let row = 0
        while (getInput(row * 5) && getInput(row * 5).value && row < 5) {
            row++
        }
    
        // If all rows are filled, replace the first guess
        if (row === 5) row=0
    
        for (let i = 0; i < 5; i++) {
            const input = getInput(row * 5 + i)
            input.value = word[i]
            toggleMode(row * 5 + i, 'wrong')
        }
    
        // Focus on the first input of the next row
        if (row < 4) {
            focusOn((row + 1) * 5)
        }
    }


    return (
        <WordleContainer theme={theme}>
            <GlobalStyle />

            <Toaster />

            <Modal ready={showingFeedbackModal} onClose={() =>  setShowingFeedbackModal(null) }>
            
                {showingFeedbackModal === 'good' ? <>
                    <h2 className='mbm'>Awesome!</h2>
                    <p>What was the final word?</p>
                    <input id='correctword' className='mbs' />

                    <p>In how many guesses?</p>
                    <input id='numguesses' type='number' className='' />

                </> : showingFeedbackModal==='bad' ? <>
                    <h2 className='mbm'>Dang.</h2>
                    <p>What was the correct word?</p>
                    <p className='faded'>(blank if unknown)</p>
                    <input id='correctword' className='mbs' />

                    <p>What went wrong?</p>
                    <textarea id='feedback' className='' />
                </> : <></>
                }
                <button className='green block mtl' onClick={() => { sendFeedbackEmail(); setShowingFeedbackModal(false) }}>Send</button>
            </Modal>

            <div className='col center'>
                <div className='board'>
                    {[...Array(25).keys()].map(i => (
                        <motion.div
                            id={`wordle-cell-${i}`} className='cell'
                            initial={{ transform: 'scale(0)' }}
                            animate={{ transform: 'scale(1)', transition: { type: 'spring', delay: i * 0.02 } }}
                        >
                            <input
                                id={`wordle-cell-input-${i}`}
                                onKeyDown={e => handleKeydown(e, i)}
                                maxLength={1}
                                placeholder={(document.activeElement == getInput(i)) && stagedChar}
                                onFocus={e => handleFocus(e, i)}
                                onBlur={e => handleBlur(e, i)}
                                onChange={e => handlePress(e, i)}
                                style={{ padding: '0', }}
                            />

                            <div className='toggler'>
                                {modes.map(m => (
                                    <div onClick={() => toggleMode(i, m)} style={{ background: colors[m] }} />
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className='wordle-buttons flex hsep-sm mts mbm'>
                    <motion.button className='solve' initial={{ transform: 'translateY(50px)', opacity: 0 }} animate={{ transform: 'translateY(0px)', opacity: 1 }} transition={{ type: 'spring', delay: 0.5 }} onClick={evaluate}>Solve</motion.button>
                    <motion.button className='clear' initial={{ transform: 'translateY(50px)', opacity: 0 }} animate={{ transform: 'translateY(0px)', opacity: 1 }} transition={{ type: 'spring', delay: 0.6}} onClick={clearBoard}>Clear</motion.button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <motion.p initial={{ transform: 'translateX(50px)', opacity: 0 }} animate={{ transform: 'translateX(0px)', opacity: 1, transition: { type: 'spring', delay: 0.7 } }}>Possible words: <b>{possibleWords.length}</b></motion.p>
                    <motion.button
                        className='center red chip'
                        initial={{ scale: 0 }}
                        animate={{ scale: viewingAllWords ? 1 : 0 }}
                        transition={{ type: 'spring' }}
                        onClick={() => setViewingAllWords(false)}
                    >
                        X
                    </motion.button>
                </div>
                <motion.div
                    className='word-list flex sep-sm'
                    initial={{ opacity: 0, transform: 'translateY(50px)' }}
                    animate={{ opacity: 1, transform: 'translateY(0px)' }}
                    transition={{ type: 'spring', delay: 0.6 }}
                >
                    {(viewingAllWords ? possibleWords : limitedWords).map((word, i) => (
                        <button
                            key={word}
                            onClick={word === 'Wordle' ? () => window.open('https://www.nytimes.com/games/wordle/index.html', '_blank') : () => addToBoard(word)}
                            className={`chip word-option ${word == 'Wordle' && 'wrdl'} ${commonWords.includes(word) && 'common'}`}
                        >
                            {word}
                        </button>
                    ))}
                    {possibleWords.length > wordLimit && !viewingAllWords && <button className='word-option view-all chip' onClick={() => setViewingAllWords(true)}>See all <b>{' ' + possibleWords.length}</b></button>}
                    {viewingAllWords && <button className='word-option view-all chip' onClick={() => setViewingAllWords(false)}>See less</button>}
                </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, top: 100 }} animate={{ opacity: showingFeedback ? 1 : 0, top: showingFeedback ? 0 : 100 }}>
                <Feedback>
                    <div className='prm'>
                        <h4>Did it work?</h4>
                        <p>Share the results with me</p>
                    </div>
                    <div className='sep-sm'>
                        <button className='chip green' onClick={() => setShowingFeedbackModal('good')}>Yes</button>
                        <button className='chip red' onClick={() => setShowingFeedbackModal('bad')}>No</button>
                    </div>

                    <button style={{ position: 'absolute', top: 5, right: 5 }} className='chip-sm' onClick={() => setShowingFeedback(false)}>X</button>
                </Feedback>
            </motion.div>

            <motion.button animate={{ y: !showingFeedback ? 0 : 100, opacity: !showingFeedback ? 1 : 0 }} onClick={() => setShowingFeedback(true)} style={{ position: 'absolute', bottom: 20, right: 20 }}>feedback</motion.button>
        </WordleContainer>
    )
}

const Feedback = styled.div`
    position: absolute;
    background: blue;
    padding: 2rem;
    bottom: 5vmin;
    right: 5vmin;
    background: ${props => props.theme.base}88;
    border-radius: ${props => props.theme.corners}rem;
    // width: 80vmin;
    // padding: 5vmin;
    // padding-top: 0;

    display: flex;
    align-items: center;
    // justify-content: space-between;

    p {
        // line-height: 2;
    }

    button {
        display: inline-block;
    }

`

const WordleContainer = styled.main`
    padding: 5vh;

    .board {
        width: clamp(300px, 50vh, calc(100vw - 10vh));
        height: clamp(300px, 50vh, calc(100vw - 10vh));
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-gap: 1vw;

        .cell {
            display: flex;
            flex-direction: column;
            border-radius: 10px;
            overflow: hidden;
            transition: background 0.2s ease;
            background: ${props => props.theme.complement + '15'};

            &.right { background: #618654 }
            &.wrong { background: #616466 }
            &.maybe { background: #9f9151 }

            &.right, &.wrong, &.maybe {
                .toggler {
                    box-shadow: 0 0 10px #000a;
                }
            }

            input {
                cursor: pointer;
                border-radius: 0;
                width: 100%;
                height: 100%;
                text-align: center;
                font-size: 1.5rem;
                text-transform: uppercase;
                color: white;
                background: transparent;
                transition: background 0.2s ease;

                &:hover {
                    background: ${props => props.theme.complement + '22'};
                }

                &:focus {
                    background: ${props => props.theme.complement + '33'};
                }
            }

            .toggler {
                height: 20px;
                width: 100%;
                display: flex;
                transition: all 0.25s ease;

                filter: ${props => props.theme.mode==='light' && 'brightness(1.3)'};
                opacity: ${props => props.theme.mode==='light' ? 0.7 : 1};

                > div {
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }   

    .wordle-buttons {
        button {
            &.solve {
                background: #5b95;
                &:hover { background: #5b9 }
            }

            &.clear {
                background: #d7555555;
                &:hover { background: #d75555 }
            }
        }
    }


    .word-list {
        display: flex;
        width: 100%;

        .word-option {

            &.wrdl {
                color: white;
                background: #618654;

                &:hover { background: #9f9151 }
            }

            &.view-all {
                background:${props => props.theme.complement}88;
            }

            &.common {
                border: 2px solid ${props => props.theme.accent};
            }
        }
    }

`