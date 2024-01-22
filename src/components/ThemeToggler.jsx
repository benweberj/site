import styled from 'styled-components'

import { useTheme } from '../extras/ThemeContext'

const _ThemeToggler = styled.div`
    position: relative;
    background: ${props => props.theme.mode==='dark' ? props.theme.complement : props.theme.complement };
    width: ${props => props.dim}px;
    height: ${props => props.dim}px;
    border-radius: 99px;
    transform: scale(${props => props.theme.mode==='dark' ? 1.4 : 1}) rotate(${props => props.theme.dark ? 180 : 0}deg);
    transition: all 0.25s ease;
    opacity: 0.3;


    &:hover {
        opacity: 1;
        box-shadow: ${props => props.theme.mode === 'dark' ? '0 0 20px 0 rgba(173, 216, 230, 0.7)' : 'none'};


        ${props => props.theme.mode==='light' && `background: ${props.theme.accent};`}
        > div {
            ${props => props.theme.mode==='light' && `background: ${props.theme.accent} !important;`}
        }
    }

    > div {
        position: absolute;
        width: ${props => props.dotwidth}px;
        height: ${props => props.dotwidth}px;
        border-radius: 99px;
        transition: all 0.25s ease;

        &:nth-child(5) { transition-delay: ${1*50}ms }
        &:nth-child(1) { transition-delay: ${2*50}ms }
        &:nth-child(7) { transition-delay: ${3*50}ms }
        &:nth-child(2) { transition-delay: ${4*50}ms }
        &:nth-child(8) { transition-delay: ${5*50}ms }
        &:nth-child(4) { transition-delay: ${6*50}ms }
        &:nth-child(6) { transition-delay: ${7*50}ms }
        &:nth-child(3) { transition-delay: ${8*50}ms }
    }
`


export default function ThemeToggler(props) {
    const [theme, toggle] = useTheme()

    const dark = theme.mode === 'dark'
    let s = 0.707 // sin(45) ratio for corner dots
    let ww = props.w || 20 // width of moon/sun
    let d = ww * 0.75 // distance from dots to center
    let w = 4 // size of dots

    return (
        <_ThemeToggler dim={ww} dotwidth={w} dist={w * 0.75} theme={theme} onClick={toggle}>
            <div style={{
                background: theme.complement,
                opacity: 0.7,
                left: '50%',
                top: '50%',
                transform: `translate(calc(-50% + ${s*d}px), calc(-50% - ${s*d}px)) scale(${dark ? 0 : ww/20})`
            }}/>
            <div style={{
                background: theme.complement,
                opacity: 0.7,
                left: '50%',
                top: '50%',
                transform: `translate(calc(-50% + ${s*d}px), calc(-50% + ${s*d}px)) scale(${dark ? 0 : ww/20})`
            }}/>
            <div style={{
                background: theme.complement,
                opacity: 0.7,
                left: '50%',
                top: '50%',
                transform: `translate(calc(-50% - ${s*d}px), calc(-50% - ${s*d}px)) scale(${dark ? 0 : ww/20})`
            }}/>
            <div style={{
                background: theme.complement,
                opacity: 0.7,
                left: '50%',
                top: '50%',
                transform: `translate(calc(-50% - ${s*d}px), calc(-50% + ${s*d}px)) scale(${dark ? 0 : ww/20})`
            }}/>

            {/* moon dots */}
            <div style={{
                background: dark ? theme.base : theme.complement,
                opacity: dark ? 0.3 : 0.7,
                left: '50%',
                top: '50%',
                transform: dark ? `translate(calc(-50% + ${ww/5}px), calc(-50% + ${ww/5}px)) scale(${ww/20})` : `translate(calc(-50% + ${0}px), calc(-50% - ${d}px)) scale(${ww/20})`,
            }}/>
            <div style={{
                background: dark ? theme.base : theme.complement,
                opacity: dark ? 0.4 : 0.7,
                left: '50%',
                top: '50%',
                transform: dark ? `translate(calc(-50% + ${ww/6}px), calc(-50% - ${ww/8}px)) scale(${1.6*(ww/20)})` : `translate(calc(-50% - ${d}px), calc(-50% - ${0}px)) scale(${ww/20})`,
            }}/>
            <div style={{
                background: dark ? theme.base : theme.complement,
                opacity: dark ? 0.3 : 0.7,
                left: '50%',
                top: '50%',
                transform: dark ? `translate(calc(-50% - ${ww/5}px), calc(-50% - ${ww/5}px)) scale(${0.8*(ww/20)})` : `translate(calc(-50% + ${d}px), calc(-50% - ${0}px)) scale(${ww/20})`,
            }}/>
            <div style={{
                background: dark ? theme.base : theme.complement,
                opacity: dark ? 0.2 : 0.7,
                left: '50%',
                top: '50%',
                transform: dark ? `translate(calc(-50% - ${ww/8}px), calc(-50% + ${ww/8}px)) scale(${0.6*(ww/20)})` : `translate(calc(-50% + ${0}px), calc(-50% + ${d}px)) scale(${ww/20})`,
            }}/>
        </_ThemeToggler>
    )
}