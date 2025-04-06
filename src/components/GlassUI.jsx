import ReactApexChart from 'apexcharts'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { toast, Toaster } from 'react-hot-toast'

import { AnimateHeight } from './index'
import { copyToClipboard, ellipsize } from '../extras/tools'
import { useTheme } from '../extras/ThemeContext'

import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    LineChart,
    Line,
    CartesianGrid,
    Radar,
    RadarChart,
    PolarGrid
} from 'recharts'

const Container = styled.div`
    height: 90vh;

    * {
        font-weight: 100;
        font-family: Poppins;
    }
    
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(6, 1fr);
    grid-gap: 10px;
    
    grid-template-areas: 
        "d1 d1 d1 d4 d6"
        "d2 d2 d2 d4 d6"
        "d2 d2 d2 d5 d6"
        "d2 d2 d2 d5 d6"
        "d3 d3 d3 d5 d6"
        "d3 d3 d3 d5 d6"; 

    @media screen and (max-width: 1100px) {
        .d6 { display: none; }
        grid-template-areas: 
            "d1 d1 d1 d4 d4"
            "d2 d2 d2 d4 d4"
            "d2 d2 d2 d4 d4"
            "d2 d2 d2 d5 d5"
            "d3 d3 d3 d5 d5"
            "d3 d3 d3 d5 d5"; 
    }

    @media screen and (max-width: 800px) {
        .d6, .d3 { display: none; }
        grid-template-areas: 
            "d1 d1 d1 d1 d1"
            "d4 d4 d4 d5 d5"
            "d4 d4 d4 d5 d5"
            "d4 d4 d4 d5 d5"
            "d2 d2 d2 d2 d2"
            "d2 d2 d2 d2 d2"; 
    }

    @media screen and (max-width: 650px) {
        .d6, .d2 { display: none; }
        grid-template-areas: 
            "d1 d1 d1 d1 d1"
            "d4 d4 d4 d4 d4"
            "d4 d4 d4 d4 d4"
            "d4 d4 d4 d4 d4"
            "d5 d5 d5 d5 d5"
            "d5 d5 d5 d5 d5";
    }

    .d1 { grid-area: d1; }
    .d2 { grid-area: d2; }
    .d3 { grid-area: d3; }
    .d4 { grid-area: d4; }
    .d5 { grid-area: d5; }
    .d6 { grid-area: d6; }

    // glass
    > div {
        background: #5b9bea11;
        border: 1px solid transparent;
        border-radius: 8px;
        transition: all 0.2s ease;
        padding: 15px;

        scrollbar-color: #5b9bea88 #0000;
        scrollbar-width: 2px;


        &:hover {
            border: 1px solid #5b9bea33;
            backdrop-filter: blur(8px);
            background: #5b9bea16;
        }
    }

    .copy-btn {
        font-weight: 400;
        font-size: 0.9rem;
        padding: 0.3rem 0.9rem;
        position: relative;

        background: none;
        border: 1px solid white;
        border-radius: 4px;
        overflow: hidden;
        transition: all 0.25s ease;
        opacity: 0.75;

        &.blue {
            border: 1px solid #5b9bea;
            color: #5b9bea;

            &:hover {
                color: white; 
            }

            &:after {
                background: #5b9bea;
            }
        }

        &:hover {
            color: black;
            opacity: 1;

            &:after {
                top: 0px;
            }
        }

        // hover sliding frame
        &:after {
            transition: all 0.25s ease;
            content: "";
            position: absolute;
            background: white;
            width: 100%;
            height: 100%;
            z-index: -1;
            left: 0px;
            top: 100%;
        }

    }


    .chat-msg {
        transition: all 0.2s ease;
        background: #5b9bea11;
        border: 1px solid #5b9bea00;
        margin-bottom: 5px;
        border-radius: 8px;
        padding: 10px;
        cursor: pointer;


        > div { // sender header
            display: flex;
            align-items: center;
            margin-bottom: 5px;

            img {
                width: 15px;
                margin-right: 10px;
            }
            h4 {
                font-size: 1rem;
                // margin: none;
                // padding: none;
            }
        }
        
        p {
            line-height: 1.2;
            font-size: 0.85rem;
        }

        &:hover, &.selected {
            background: #5b9bea16;
            border: 1px solid #5b9bea33;
        }
    }

`

export default function GlassUI(props) {
    const { ready } = props
    const [theme, toggle] = useTheme()
    const [lastMode, setLastMode] = useState(null)
    
    useEffect(() => {
        if (ready) {
            setLastMode(theme.mode)
            if (theme.mode === 'light') toggle()
        } else {
            if (lastMode === 'light') toggle()
        }
    }, [ready])

    return (
        <Container className=''>
            {ready && <>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', duration: 0.25, delay: 0 }} className='d1 rel contain' style={{ padding: 0 }}>
                    <div style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/img/waves.png)`, backgroundSize: 'cover', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.3 }}>
                        
                    </div>
                    <Intro ready={ready} />
                </motion.div>

                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', duration: 0.25, delay: 0.1 }} className='d2'>
                    <Main />
                </motion.div>

                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', duration: 0.25, delay: 0.2 }} className='d3'>
                    <Footer />
                </motion.div>

                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', duration: 0.25, delay: 0.3 }} className='d4'>
                    <Viz1 />
                </motion.div>

                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', duration: 0.25, delay: 0.4 }} className='d5' style={{ overflow: 'scroll' }}>
                    <Info />
                </motion.div>

                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', duration: 0.25, delay: 0.5 }} className='d6'>
                    <Chat ready={ready} />
                </motion.div>
            </>}
        </Container>
    )
}

function Viz1(props) {
    const [data, setData] = useState([])

    useEffect(() => {
        randomizeData()
        const randomize = setInterval(randomizeData, 3000)
        return () => {
            clearInterval(randomize)
        }
    }, [])

    function randomizeData() {
        setData(
            Array.from({ length: 6 }, () => ({ A: Math.random() * 120, B: Math.random() * 120 }))
        )
    }

    return (
        <ResponsiveContainer width={'100%'} height={'100%'}>
            <RadarChart  outerRadius="80%" data={data}>
                <PolarGrid stroke='#fff1' />
                <Radar dataKey="A" stroke="#5b9bea" fill="#5b9bea" fillOpacity={0.2} />
                <Radar dataKey="B" stroke="#5b9bea88" fill="#5b9bea" fillOpacity={0.1} />
            </RadarChart>
        </ResponsiveContainer>
    );
}

function Chat(props) {
    const [expanded, setExpanded] = useState([])
    const chats = [
        { sender: 'Austin', message: 'Dude that particle simulation you made is sick!' },
        { sender: 'Logan', message: 'Yeah this site is cool and all but wheres all the machine learning?' },
        { sender: 'Mom', message: 'Hey honey, heres your daily reminder that you are my favorite child :)' },
        { sender: 'Gas Man', message: 'Can you spot me a few thousand? I\'m not very liquid right now.' },
        { sender: 'Elon', message: 'Could really use your help on this whole stock market thing.' },
        // { sender: 'S', }
    ]

    useEffect(() => {
        setExpanded(Array.from({ length: chats.length }, () => false))
    }, [])

    function toggleExpand(i) {
        let e = [...expanded]
        e[i] = !e[i]
        setExpanded(e)
    }

    return (
        <div>
            <h4 className='mbm mts'>Very Real Messages</h4>
            {chats.map((chat, i) => (
                <motion.div
                    initial={{ transform: 'scaleY(0)', opacity: 0, transformOrigin: 'top' }}
                    animate={{ transform: 'scaleY(1)', opacity: 1 }}
                    transition={{ delay: (i+5)*0.15, type: 'ease' }}
                    className={`chat-msg ${expanded[i] && 'selected'}`}
                    onClick={() => toggleExpand(i)}
                >
                    <div>
                        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png' />
                        <h4>{chat.sender}</h4>
                    </div>
                    <p>{expanded[i] ? chat.message : ellipsize(chat.message, 20)}</p>
                </motion.div>
            ))}
        </div>
    )
}

function Intro(props) {
    return <div className='full col center pl rel contain' style={{ padding: 15 }}>
        <motion.h2 className='thin center' initial={{ opacity: 0, transform: 'translateX(50px)' }} animate={{ opacity: 1, transform: 'translateX(0px)', marginRight: '1rem' }} transition={{ type: 'spring', delay: 1, duration: 0.5 }} >This is Glass UI</motion.h2>
        <motion.p className='thin center' initial={{ opacity: 0, transform: 'translateX(-50px)' }} animate={{ opacity: 1, transform: 'translateX(0px)' }} transition={{ type: 'spring', delay: 1, duration: 0.5 }} >A minimal, futuristic theme for your data interactions</motion.p>
        
    </div>
}

function Footer(props) {
    return (
        <div className='full flex' style={{ flexWrap: 'nowrap' }}>
            <div className='full ps'><RandomPie /></div>
            <div className='full ps'><RandomPie /></div>
            <div className='full ps'><RandomPie /></div>
        </div>
    )
}

function RandomPie(props) {
    const [data, setData] = useState([])

    useEffect(() => {
        randomizeData()
        const randomize = setInterval(randomizeData, 3000)
        return () => {
            clearInterval(randomize)
        }
    }, [])

    function randomizeData() {
        setData(
            Array.from({ length: 5 }, () => ({ name: 'group'+Math.random(), value: Math.floor(Math.random() * 400) }))
        )
    }

    const COLORS = ['#5b9bea22', '#5b9bea44', '#5b9bea66', '#5b9bea88', '#5b9beaaa', '#5b9beacc']

    return (
        <ResponsiveContainer width='100%' height='100%'>
            <PieChart onClick={randomizeData}>
                <Pie
                data={data}
                innerRadius={window.innerWidth/28}
                outerRadius={window.innerWidth/24}
                stroke='none'
                paddingAngle={5}
                dataKey="value"
                >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    )
}

function Main(props) {
    const [data, setData] = useState([])

    useEffect(() => {
        randomizeData()
        const randomize = setInterval(randomizeData, 3000)
        return () => clearInterval(randomize)
    }, [])

    function randomizeData() {
        setData(
            Array.from({ length: 7 }, () => ({ uv: Math.random() * 2000, pv: Math.random() * 2000 }))
        )
    }
    // return <p>{JSON.stringify(data, null, 2)}</p>

    return (
        <ResponsiveContainer width='100%' height='100%'>
            <LineChart
                data={data}
                width={500}
                height={500}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke='#fff1' />
                {/* <XAxis dataKey="name"  /> */}
                {/* <YAxis /> */}
                <Line type="monotone" dataKey="pv" stroke="#5b9bea" dot={{ r:0 }} />
                <Line type="monotone" dataKey="uv" stroke="#5b9bea88" strokeDasharray='5 5' dot={{ r:0 }} />
            </LineChart>
        </ResponsiveContainer>
    )
}

function Info(props) {
    const [typingIndex, setTypingIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setTypingIndex(prev => prev+1)
        }, 10)

        if (typingIndex >= glassStyles.length) {
            clearInterval(interval)
        }

        return () => clearInterval(interval)
    }, [typingIndex])

    const glassStyles = JSON.stringify({
        background: '#5b9bea11',
        border: '1px solid transparent',
        'border-radius': '8px',
        transition: 'all 0.2s ease',
        padding: '15px',

        '&:hover': {
            border: '1px solid #5b9bea33',
            'backdrop-filter': 'blur(8px)',
            background: '#5b9bea16'
        }
    }, null, 2).split('').map(c => c == '"' ? '' : c === ',' ? ';' : c).join('')

    function copyColor() {
        copyToClipboard('#5b9bea')
        toast('Color copied', { style: { fontSize: '0.8rem' }, duration: 750 })
    }

    function copyStyles() {
        copyToClipboard(glassStyles)
        toast('Styles copied', { style: { fontSize: '0.8rem' }, duration: 750 })
    }

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <h4 className='mrs'>Accent</h4>
                <button onClick={copyColor} className='copy-btn blue'>#5b9bea</button>
            </div>
            <div className='mtm mbs' style={{ display: 'flex', alignItems: 'center' }}>
                <h4 className='mrs'>Glass Styles</h4>
                <button onClick={copyStyles} className='copy-btn'>Copy</button>
            </div>
            <pre style={{ fontSize: '0.7rem', fontFamily: 'Chivo Mono', lineHeight: 1.5 }}>
                {glassStyles.substring(0, typingIndex)}
            </pre>
        </div>
    )
}

