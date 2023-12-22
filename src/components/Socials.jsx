import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'
import { motion } from 'framer-motion'
import { toast, Toaster } from 'react-hot-toast'

import { useTheme } from '../extras/ThemeContext'

const _Socials = styled.section`
    div.icon-wrapper {
        position: relative;
        margin-right: min(5vw, 40px);
        pointer-events: auto;
        
        &:last-child {
            margin-right: 0;
        }

        button {
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%) scale(0);
            padding: 0;
            width: 25px;
            height: 25px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            transition: all 0.25s ease;

            img {
                width: 15px;
                height: 15px;
                display: block;
                filter: ${props => props.theme.mode==='light' && 'invert(1)'};
                transform: rotate(180deg);
            }
        }

        p {
            position: absolute;
            transition: all 0.25s ease;
            top: 200%;
            left: 50%;
            transform: translateX(-50%);
            opacity: 0;
            pointer-events: none;
            font-size: 0.8rem;
        }

        &.hovered {
            button {
                top: 50%;
                transform: translate(-50%, -50%) scale(1);
            }

            p {
                top: 125%;
                opacity: 1;
            }
        }

    }
    
`

export default function Socials({ ready }) {
    const [hovered, setHovered] = useState(null)
    const [canBeReady, setCanBeReady] = useState(-1)
    const [theme, _] = useTheme()
    const navigate = useNavigate()

    function onClick(id) {
        if (id==='email') {
            const email = 'ben.weberj@gmail.com'
            if (navigator.clipboard) {
                navigator.clipboard.writeText(email)
            } else {
                const textarea = document.createElement('textarea')
                textarea.value = email
                document.body.appendChild(textarea)
                textarea.select()
                document.execCommand('copy')
                document.body.removeChild(textarea)
            }

            toast('Email copied', {
                style: {
                    background: theme.complement,
                    color: theme.base,
                    fontSize: '0.8rem',
                    padding: '5px 15px'
                }
            })
        }

        if (id==='github') {
            window.open('https://github.com/benweberj', '_blank')
        }

        if (id==='linkedin') {
            window.open('https://www.linkedin.com/in/benjweber/', '_blank')
        }

        if (id==='resume') {
            navigate('/resume')
        }
    }

    useEffect(() => {
        if (canBeReady < 3) {
            const timer = setTimeout(() => {
                setCanBeReady(canBeReady+1)
            }, 100)
            return () => clearTimeout(timer)
        }
    }, [canBeReady])

    const scale = 0.25
    let variants = {
        pathVariants: {
            initial: {
                pathLength: 0,
                strokeWidth: 0,
                transition: {
                    duration: 0.25,
                },
            },
            animate: {
                pathLength: 1,
                strokeWidth: 6,
                transition: {
                    duration: 0.5,
                },
            }
    
        },
    
        rectVariants: {
            initial: {
                scale: 0,
                rotate: 30
            },
            animate: {
                scale: 1,
                rotate: 0
            }
        },
    
        circleVariants: {
            initial: {
                scale: 0,
                translateY: 30
            },
            animate: {
                scale: 1,
                translateY: 0
            }
        }
    }
    let { pathVariants, circleVariants, rectVariants } = variants
    
    let defaults = {
        pathDefaults: {
            stroke: theme.complement,
            strokeWidth: 10,
            strokeLinecap: 'round',
            variants: pathVariants,
            initial: 'initial'
        },
        circleDefaults: {
            fill: theme.complement,
            variants: circleVariants,
            initial: 'initial'
        },
        rectDefaults: {
            fill: theme.complement,
            variants: rectVariants,
            initial: 'initial'
        }
    }
    let { pathDefaults, circleDefaults, rectDefaults } = defaults


    const socials = [
        {
            id: 'github',
            name: 'Github',
            viewbox: '0 0 84 98',
            paths: ['M26.0587 95C27.3178 94.1911 29.8016 91.0826 29.6643 85.1198C29.4926 77.6664 28.1762 75.0086 31.2667 66.6884C25.8488 66.5344 13.3418 63.4297 6.65718 52.2438C-1.69863 38.2613 6.19932 22.43 11.1785 20.2921C9.7286 17.5765 7.69879 10.3311 11.1785 3.07409C14.7268 2.86223 23.0712 4.12566 28.0618 10.8742C31.591 8.98678 42.0606 6.34438 55.7046 10.8742C57.2308 7.94676 62.8013 2.28831 72.8741 3.07409C74.5338 5.13486 77.0863 11.4636 74.0187 20.2921C76.5941 22.7959 81.5847 29.8718 80.9437 38.1458C80.1425 48.4881 76.1362 61.4306 54.9034 66.9773C55.6855 70.0781 57.1697 77.4699 56.8492 82.2309C56.4486 88.1821 57.1354 92.5155 59.5391 95', 'M31 79.3695C27.0702 80.4632 18.1731 80.9122 14.0232 73.9585C8.83579 65.2664 6.65474 64.9786 3 64'],
            circles: [], rectangles: [],
            scale: 1.1
        },

        {
            id: 'linkedin',
            name: 'LinkedIn',
            viewbox: '0 0 89 96',
            paths: ['M12 42V92', 'M41 42V92', 'M41 62.6937C45.1554 56.2119 53.5501 47.3628 63.8879 46.1475C76.8102 44.6283 86 55.1482 86 63.7873C86 69.4994 86 83.1761 86 93'],
            circles: [{ cx: 12, cy:12, r: 12 }],
            rectangles: []
        },

        {
            id: 'resume',
            name: 'Resume',
            viewbox: '0 0 75 70',
            paths: ['M4 46H47.9547H71', 'M43 25L61.3691 25L71 25', 'M43 4L61.3691 4L71 4', 'M4 66H47.9547H71'],
            circles: [],
            rectangles: [{ width: 29, height: 29, rx: 7 }]
        },

        {
            id: 'email',
            name: 'Email',
            viewbox: '0 0 95 60',
            paths: ['M3 54V6C3 4.34315 4.34315 3 6 3H89C90.6569 3 92 4.34315 92 6V54C92 55.6569 90.6569 57 89 57H6C4.34315 57 3 55.6569 3 54Z','M91 5L53.1726 37.0512C49.8056 39.9042 44.8665 39.8948 41.5104 37.029L4 5'],
            circles: [], rectangles: [],
            scale: 1.3,
        },
    ]

    return (
        <_Socials className='center' theme={theme}>
            <Toaster />
            {socials.map((social, idx) => (
                <div
                    key={'social' + idx}
                    className={`icon-wrapper ${hovered===social.id && 'hovered'}`}
                    onMouseEnter={() => setHovered(social.id)}
                    onMouseLeave={() => setHovered(null)}    
                >
                    <motion.svg
                        xmlns='http://www.w3.org/2000/svg'
                        width={100*scale*(social.scale||1)}
                        height={100*scale*(social.scale||1)}
                        fill='none'
                        key={social.id + '-svg'}
                        viewBox={social.viewbox}
                    >
                        {social.paths.map((path, i) => (
                            <motion.path {...pathDefaults}
                                key={social.id + i + '-path'}
                                d={path}
                                animate={((idx > canBeReady) || (hovered===social.id)) ? 'initial' : 'animate'}
                            />
                        ))}
                        {social.circles.map((circle, i) => (
                            <motion.circle {...circleDefaults} {...circle}
                                key={social.id + i + '-circle'}
                                animate={((idx > canBeReady) || (hovered===social.id)) ? 'initial' : 'animate'}
                            />
                        ))}
                        {social.rectangles.map((rect, i) => (
                            <motion.rect {...rectDefaults} {...rect}
                                key={social.id + i + '-rect'}
                                animate={((idx > canBeReady) || (hovered===social.id)) ? 'initial' : 'animate'}
                            />
                        ))}
                    </motion.svg>
                    <button onClick={() => onClick(social.id)}>
                        <img src='img/back.png' alt='go' />
                    </button>
                    <p>{social.name}</p>
                </div>
            ))}
        </_Socials>
    )
}