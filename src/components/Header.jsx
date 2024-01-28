import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useLocation, useNavigate, Link } from 'react-router-dom'

import { ThemeToggler } from './index'


const _Header = styled.header`
    transition: opacity 1s ease;
    opacity: ${props => props.$ready ? 1 : 0};

    box-shadow: ${props => (props.$ready && props.$shadow) ? `10px 10px 20px ${props.theme.bg}, 10px 10px 30px ${props.theme.bg}` : 'none'};
    z-index: 2;
    transition: box-shadow 0.25s ease;

    .breadcrumbs {
        .wrapper {
            font-size: 1.1rem;
            display: flex;
        }
        li {
            list-style-type: none;
            a {
                margin: 0 2px;
                text-decoration: none;
                opacity: 0.5;
                font-weight: bold;
                transition: all 0.25s ease;
            }
            &:last-child a { opacity: 1 }
            &:hover a { opacity: 1 }
        }

        @keyframes breathe {
            0% { opacity: 0.5; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.01); }
            100% { opacity: 0.5; transform: scale(1); }
        }

        @keyframes rock {
            0% { transform: rotate(0deg); }
            25% { transform: rotate(0.5deg); }
            50% { transform: rotate(-1.5deg); }
            75% { transform: rotate(0.5deg); }
            100% { transform: rotate(0deg); }
        }

        @keyframes rise {
            0% { transform: translateY(0px); opacity: 0.6 }
            10% { opacity: 0.6 }
            30% { opacity: 0 }
            100% { transform: translateY(-100px) }
        }

        &.breathe {
            animation: breathe 2s linear infinite, rock 2s ease infinite 4s;
            .wrapper {
                animation: rise 20s linear infinite 3s;
            }
        }
    }


`

export default function Header(props) {
    // when the user navigates to home, keep the last path in the header for a few seconds
    const [persistPathTimer, setPersistPathTimer] = useState(null)
    const [transparentHeader, setTransparentHeader] = useState(false)
    
    const location = useLocation()
    const { ready } = props
    console.log(location.pathname)

    const onHome = location.pathname === '/site'
    const lastPath = localStorage.getItem('lastPath')

    function getWholePath(path) {
        // let lastPath = localStorage.getItem('lastPath')
        let referencedLocation = (persistPathTimer && lastPath) ? lastPath : location.pathname
        let spot = referencedLocation.indexOf(path)
        return referencedLocation.substring(0, spot + path.length)
    }

    useEffect(() => {
        const savePath = () => localStorage.setItem('lastPath', location.pathname)
        window.addEventListener('beforeunload', savePath);

        if (location.pathname !== '/site') {
            localStorage.setItem('lastPath', location.pathname)
            clearTimeout(persistPathTimer)
            setPersistPathTimer(false)
        } else if (lastPath && lastPath !== '/site') {
            clearTimeout(persistPathTimer)
            setPersistPathTimer(setTimeout(() =>  {
                setPersistPathTimer(false)
                savePath()
            }, 15000))
        }

        if (location.pathname.includes('particlemesh') || location.pathname.includes('polymesh')) {
            setTransparentHeader(true)
        } else {
            setTransparentHeader(false)
        }
        
        return () => window.removeEventListener('beforeunload', savePath)
    }, [location])

    let paths = (persistPathTimer ? localStorage.getItem('lastPath') : location.pathname).split('/').filter(path => path.length>=1)
    paths.shift()
    console.log(paths)

    return (
        <_Header className='pm split' $ready={ready} $shadow={!transparentHeader}>
            <div className={`breadcrumbs ${persistPathTimer && 'breathe'}`}>
                <div className='wrapper'>
                {(!onHome || persistPathTimer) && <li><Link to='/site'>home</Link></li> }
                {paths.map((path, i) => (
                    <li key={`path-${i}`}>/<Link to={getWholePath(path)}>{path}</Link></li>
                    ))}
                </div>
            </div>
            {/* <p>{JSON.stringify(location.pathname)}</p> */}
            
            <ThemeToggler />
        </_Header>
    )
}