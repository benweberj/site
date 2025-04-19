import { useState, useEffect, useRef, useCallback } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'


export default function GameOfLife(props) {
    const [board, setBoard] = useState([[]]) // status of the board
    const [dim, setDim] = useState({ columns: 1, rows: 1 }) // dimensions of the board
    const [cellSize, setCellSize] = useState(40)
    const [paused, setPaused] = useState(true)
    const [rate, setRate] = useState(250) // quarter second tick rate
    const [tickTimer, setTickTimer] = useState(null)
    const [resizeTimer, setResizeTimer] = useState(null)
    const [tickNumber, setTickNumber] = useState(0)
    const [mouseIsDown, setMouseIsDown] = useState(false)
    const initialRender = useRef(true)

    useEffect(() => {
        // setTimeout(initBoard,5000)

        function handleMouseDown() { setMouseIsDown(true) }
        function handleMouseUp() { setMouseIsDown(false) }
        // const handleWindowResize = debounce(() => resizeBoard(), 300)

        initBoard()
        // window.addEventListener('keypress', handleKeyPress)
        // window.addEventListener('resize', handleWindowResize)
        window.addEventListener('mouseup', handleMouseUp)
        window.addEventListener('mousedown', handleMouseDown)
        
        return () => { // cleanup
            // window.removeEventListener('keypress', handleKeyPress)
            // window.removeEventListener('resize', handleWindowResize)
            window.removeEventListener('mouseup', handleMouseUp)
            window.removeEventListener('mousedown', handleMouseDown)
            clearInterval(tickTimer)
        }
    }, [])

    

    useEffect(() => {
        clearInterval(tickTimer)

        if (paused) {
            setTickTimer(null)
        } else {
            setTickTimer(setInterval(tick, rate))
        }
    }, [paused, rate])

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false
        } else resizeBoard()
    }, [cellSize])


    // function handleKeyPress(e) {
    //     e.preventDefault()
    //     if (e.code==='Space') {
    //         setPaused(prevPaused => !prevPaused)
    //     }
    // }

    function handleCellHover(row, col, val) {
        if (mouseIsDown && val == 0) {
            birth(row, col)
        }
    }

    function handleCellClick(row, col, val) {
        // console.log(`clicked ${val} cell at ${col},${row}`)
        // toggle on click
        if (val == 0) {
            birth(row,col)
        } else {
            kill(row,col)
        }
    }

    function initBoard() {
        console.log('initializing board')
        let w = window.innerWidth * 0.8 // board width
        let h = window.innerHeight * 0.7 // board height
        let newCols = Math.floor(w / cellSize)
        let newRows = Math.floor(h / cellSize)

        setDim({
            rows: newRows,
            columns: newCols,
        })
        setBoard( Array.from({length: newRows}, () => Array.from({length: newCols}).fill(0)) )
    }

    function updateBoard(newRows, newCols) {
        let oldRows = dim.rows
        let oldCols = dim.columns

        if (newRows !== oldRows || newCols !== oldCols) {
            console.log(`${newCols < oldCols ? 'removed' : 'added'} ${Math.abs(newCols-oldCols)} cols`)
            console.log(`${newRows < oldRows ? 'removed' : 'added'} ${Math.abs(newRows-oldRows)} rows`)
            setBoard(prevBoard => {
                const newBoard = [];
                for (let i = 0; i < newRows; i++) {
                    if (i < prevBoard.length) {
                        newBoard.push(prevBoard[i].slice(0, newCols));
                        for (let j = 0; j < newCols-oldCols; j++) {
                            newBoard[i].push(0)
                        }
                    } else {
                        newBoard.push(Array.from({ length: newCols }).fill(0));
                    }
                }
                if (newCols < oldCols) {
                    for (let i = 0; i < newRows; i++) {
                        newBoard[i] = newBoard[i].slice(0, newCols);
                    }
                }
                return newBoard;
            });
        }

        // setDim({ rows: newRows, columns: newCols })
    }

    function resizeBoard() {
        console.log('resizing')
        let w = window.innerWidth * 0.8;
        let h = window.innerHeight * 0.7;
        let newCols = Math.floor(w / cellSize);
        let newRows = Math.floor(h / cellSize);

        updateBoard(newRows, newCols)

        setDim({
            rows: newRows,
            columns: newCols,
        });
    }

    useEffect(() => {
        function handleResize() {
            clearTimeout(resizeTimer)
            setResizeTimer(setTimeout(resizeBoard, 500))
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [cellSize, resizeBoard])

    function tick() { // does one step of the game
        setTickNumber(oldTick => oldTick+1)

        let toBeKilled = []
        let toBeBirthed = []

        for (let row = 0; row < board.length; row++) {
            for (let col = 0; col < board[0].length; col++) {
                const alive = board[row][col] == 1
                const aliveNeighbors = countNeighbors(row, col)
                // alive && <2 live neighbors ---> die
                // alive && >3 live neighbors ---> die
                // dead && 3 live neighbors --> birth
                if (alive && (aliveNeighbors < 2 || aliveNeighbors > 3)) toBeKilled.push([row, col])
                if (!alive && aliveNeighbors == 3) toBeBirthed.push([row, col])
            }
        }
        toBeKilled.forEach(([row, col]) => kill(row, col))
        toBeBirthed.forEach(([row, col]) => birth(row, col))
    }

    function countNeighbors(row, col) {
        let aliveNeighbors = 0
        for (let yOffset = -1; yOffset <= 1;  yOffset++) {
            for (let xOffset = -1; xOffset <= 1;  xOffset++) {
                if (yOffset==0 && xOffset==0) continue
                try {
                    let potentialNeighbor = board[row+yOffset][col+xOffset]
                    if (potentialNeighbor == 1) aliveNeighbors++
                } catch (err) {
                    
                }
            }
        }
        return aliveNeighbors
    }


    function kill(row, col) {
        const newBoard = [...board]
        newBoard[row][col] = 0
        setBoard(newBoard)
    }

    function birth(row, col) {
        const newBoard = [...board]
        newBoard[row][col] = 1
        setBoard(newBoard)
    }

    // function incrementSpeed() {

    // }
    
    // function decrementSpeed() {
        
    // }

    return (
        <div className='full col center'>
            <Board $cellSize={cellSize}>
                {board.map((row, i) => (
                    <div className='row' key={`row-${i}`}>
                        {row.map((cell, j) => (
                            <motion.div
                                initial={{ transform: 'scale(0)' }}
                                animate={{ transform: 'scale(1)', transition: { type: 'spring', delay: i * 0.02 } }}
                                key={`cell-${i}-${j}`}
                                className={`cell ${cell == 1 && 'active'}`}
                                onClick={() => handleCellClick(i, j, cell)}
                                onMouseOver={() => handleCellHover(i, j, cell)}
                            />
                        ))}
                    </div>
                ))}
            </Board>

            <Controls $paused={paused}>
                <motion.div
                    className='size-controls'
                    initial={{ transform: 'translateY(20px)', opacity: 0 }}
                    animate={{ transform: 'translateY(0px)', opacity: 1, transition: { type: 'spring', delay: 1 } }}
                >
                    <button className='chip' onClick={() => setCellSize(prev => Math.max(5, prev-5))}>-</button>
                    <p>{cellSize}px</p>
                    <button className='chip' onClick={() => setCellSize(prev => prev+5)}>+</button>
                </motion.div>

                <motion.button
                    className='pause-btn'
                    onClick={() => setPaused(prev => !prev)}
                    initial={{ transform: 'translateY(20px)', opacity: 0 }}
                    animate={{ transform: 'translateY(0px)', opacity: 1, transition: { type: 'spring', delay: 1.1 } }}
                >
                        {paused ? 'play' : 'pause'}
                </motion.button>

                <motion.button
                    onClick={() => { setPaused(true); initBoard() } }
                    initial={{ transform: 'translateY(20px)', opacity: 0 }}
                    animate={{ transform: 'translateY(0px)', opacity: 1, transition: { type: 'spring', delay: 1.2 } }}
                >
                    clear
                </motion.button>


                <motion.div
                    className='speed-controls'
                    initial={{ transform: 'translateY(20px)', opacity: 0 }}
                    animate={{ transform: 'translateY(0px)', opacity: 1, transition: { type: 'spring', delay: 1.3 } }}
                >
                    <button className='chip' onClick={() => setRate(prev => prev + 50)}>-</button>
                    <p>{rate}ms</p>
                    <button className='chip' onClick={() => setRate(prev => Math.max(50, prev - 50))}>+</button>
                </motion.div>

            </Controls>
        </div>
    )
}

const Board = styled.div`
    height: 70vh;
    
    .row {
        display: flex;

        .cell {
            border: 1px solid ${props => props.theme.complement}11;
            width: ${props => props.$cellSize}px;
            height: ${props => props.$cellSize}px;
            position: relative;
            overflow: hidden;

            &:after {
                position: absolute;
                content: '';
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                background: ${props => props.theme.complement};
                transform: scale(0);
                opacity: 0;
                transition: transform .1s ease, opacity .1s ease;
            }

            &.active  {
                &:after {
                    transform: scale(1);
                    opacity: 1;
                }
            }
        }
    }
`

const Controls = styled.div` 
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    width: 70%;
    margin-top: 1vh;


    .pause-btn {
        background: ${props => props.$paused ? props.theme.green : props.theme.red};
    }

    .size-controls, .speed-controls {
        display: flex;
        justify-content: center;
        align-items: center;

        button {
            width: 25px;
            height: 25px;
            padding: 0px;
            margin: 0 5px;
        }
    }

`