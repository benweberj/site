import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
    // css reset
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: none;
        border: none;
        font-family: Chivo Mono, sans-serif;
        color: ${props => props.theme.complement+'bb'};

        scrollbar-width: thin;
        scrollbar-color: ${props => props.theme.accent} #0000;
    }

    *::-webkit-scrollbar {
        width: 5px;
    }

    *::-webkit-scrollbar-track {
        background: #0000;
    }

    *::-webkit-scrollbar-thumb {
        background-color: ${props => props.theme.accent};
        border-radius: 20px;
    }

    html {
        font-size: calc(13px + 0.1vh + 0.2vw);
    }

    html, body, #root {
        height: 100%;
        overflow-x: hidden;
    }

    #root {
        display: flex;
        flex-direction: column;
        
        main {
            flex-grow: 1;
            overflow-x: hidden;
        }
    }


    body {
        background: ${props => props.theme.bg};
        transition: background 0.25s ease;
    }

    h1, h2, h3, h4, h5, h6, p {
        color: ${props => props.theme.mode==='light' ? props.theme.complement+'bb' : props.theme.complement+'bb'};
        
        &:not(p) {
            line-height: 1;
        }

        &:is(p) {
            line-height: 1.5;
        }
        
        // &.xl {
        //     font-size: 200%;
        // }
        // &.xxl {
        //     font-size: 300%;
        // }
    }

    h1 {
        font-size: 2rem;
    }
    
    h2 {
        font-size: 1.618rem;
    }
    
    h3 {
        font-size: 1.272rem;
    }
    
    h4 {   
        font-size: 1.1rem;
    }
     
    p {
        font-size: 1rem;
        color: ${props => props.theme.complement}99;
    }

    .thin { font-weight: 100 }
    .normal { font-weight: 400 }
    .bold { font-weight: 700 }

    code {
        padding: 0px 6px;
        background: ${props => props.theme.complement}33;
        color: ${props => props.theme.complement};
        border-radius:  ${props => props.theme.corners/4}rem;
    }

    a {
        text-decoration: none;
    }
    
    b {
        color: ${props => props.theme.complement};
        // filter: invert(1);
    }

    h1, h2, h3, h4, h5, h6, p, b {
        transition: color 0.25s ease;
    }

    main {
        padding: 10vmin;
        padding-top: 5vmin;
        transition: padding 0.25s ease;

        @media (max-width: 900px) {
            padding: 5vmin;
        }
    }

    
    button {
        padding: ${props => `${props.theme.spacing.sm}rem ${props.theme.spacing.md}rem`};
        border-radius: ${props => props.theme.corners}rem;
        background: ${props => props.theme.base};
        font-size: 0.9rem;
        color: ${props => props.theme.complement};
        border-radius: 99px;
        transition: background 0.25s ease, color 0.25s ease;

        &.red {
            background: coral;
            color: white;

            &:hover {
                background: red;
            }
        }
        
        &.selected {
            background: ${props => props.theme.complement};
            color: ${props => props.theme.base};

            * {
                color: ${props => props.theme.base};
            }
        }

        * {
            color: ${props => props.theme.complement};
        }

        &:hover {
            background: ${props => props.theme.complement};
            color: ${props => props.theme.base};

            * {
                color: ${props => props.theme.base};
            }
        }

        &.chip {
            padding: 5px 15px;
        }
    }

    .card {
        padding: ${props => props.theme.spacing.md}rem;
        background: ${props => props.theme.complement}11;
        border-radius: ${props => props.theme.corners}rem;

        &.lg {
            padding: ${props => props.theme.spacing.lg}rem;
        }
    }


    .sep-sm {
        > * {
            margin: ${props => props.theme.spacing.sm/2}rem;
        }
    }

    .sep-md {
        > * {
            margin: ${props => props.theme.spacing.md/2}rem;
        }
    }

    .sep-lg {
        > * {
            margin: ${props => props.theme.spacing.lg/2}rem;
        }
    }

    .hsep-sm {
        > * {
            margin-left: ${props => props.theme.spacing.sm/2}rem;
            margin-right: ${props => props.theme.spacing.sm/2}rem;
            &:first-child { margin-left: 0 }
            &:last-child { margin-right: 0 }
        }
    }

    .hsep-md {
        > * {
            margin-left: ${props => props.theme.spacing.md/2}rem;
            margin-right: ${props => props.theme.spacing.md/2}rem;
            &:first-child { margin-left: 0 }
            &:last-child { margin-right: 0 }
        }
    }

    .hsep-lg {
        > * {
            margin-left: ${props => props.theme.spacing.lg/2}rem;
            margin-right: ${props => props.theme.spacing.lg/2}rem;
            &:first-child { margin-left: 0 }
            &:last-child { margin-right: 0 }
        }
    }

    // extra small padding
    .p_xs { padding: ${props => props.theme.spacing.sm/2}rem }
    .pxxs { padding-left: ${props => props.theme.spacing.sm/2}rem; padding-right: ${props => props.theme.spacing.sm/2}rem }
    .pyxs { padding-top: ${props => props.theme.spacing.sm/2}rem; padding-bottom: ${props => props.theme.spacing.sm/2}rem }
    .ptxs { padding-top: ${props => props.theme.spacing.sm/2}rem }
    .pbxs { padding-bottom: ${props => props.theme.spacing.sm/2}rem }
    .plxs { padding-left: ${props => props.theme.spacing.sm/2}rem }
    .prxs { padding-right: ${props => props.theme.spacing.sm/2}rem }

    // small padding
    .ps { padding: ${props => props.theme.spacing.sm}rem }
    .pxs { padding-left: ${props => props.theme.spacing.sm}rem; padding-right: ${props => props.theme.spacing.sm}rem }
    .pys { padding-top: ${props => props.theme.spacing.sm}rem; padding-bottom: ${props => props.theme.spacing.sm}rem }
    .pts { padding-top: ${props => props.theme.spacing.sm}rem }
    .pbs { padding-bottom: ${props => props.theme.spacing.sm}rem }
    .pls { padding-left: ${props => props.theme.spacing.sm}rem }
    .prs { padding-right: ${props => props.theme.spacing.sm}rem }

    // medium padding
    .pm { padding: ${props => props.theme.spacing.md}rem }
    .pxm { padding-left: ${props => props.theme.spacing.md}rem; padding-right: ${props => props.theme.spacing.md}rem }
    .pym { padding-top: ${props => props.theme.spacing.md}rem; padding-bottom: ${props => props.theme.spacing.md}rem }
    .ptm { padding-top: ${props => props.theme.spacing.md}rem }
    .pbm { padding-bottom: ${props => props.theme.spacing.md}rem }
    .plm { padding-left: ${props => props.theme.spacing.md}rem }
    .prm { padding-right: ${props => props.theme.spacing.md}rem }

    // large padding
    .pl { padding: ${props => props.theme.spacing.lg}rem }
    .pxl { padding-left: ${props => props.theme.spacing.lg}rem; padding-right: ${props => props.theme.spacing.lg}rem }
    .pyl { padding-top: ${props => props.theme.spacing.lg}rem; padding-bottom: ${props => props.theme.spacing.lg}rem }
    .ptl { padding-top: ${props => props.theme.spacing.lg}rem }
    .pbl { padding-bottom: ${props => props.theme.spacing.lg}rem }
    .pll { padding-left: ${props => props.theme.spacing.lg}rem }
    .prl { padding-right: ${props => props.theme.spacing.lg}rem }

    // extra small margin
    .mxs { margin: ${props => props.theme.spacing.sm/2}rem }
    .mxxs { margin-left: ${props => props.theme.spacing.sm/2}rem; margin-right: ${props => props.theme.spacing.sm/2}rem }
    .myxs { margin-top: ${props => props.theme.spacing.sm/2}rem; margin-bottom: ${props => props.theme.spacing.sm/2}rem }
    .mtxs { margin-top: ${props => props.theme.spacing.sm/2}rem }
    .mbxs { margin-bottom: ${props => props.theme.spacing.sm/2}rem }
    .mlxs { margin-left: ${props => props.theme.spacing.sm/2}rem }
    .mrxs { margin-right: ${props => props.theme.spacing.sm/2}rem }

    // small margin
    .ms { margin: ${props => props.theme.spacing.sm}rem }
    .mxs { margin-left: ${props => props.theme.spacing.sm}rem; margin-right: ${props => props.theme.spacing.sm}rem }
    .mys { margin-top: ${props => props.theme.spacing.sm}rem; margin-bottom: ${props => props.theme.spacing.sm}rem }
    .mts { margin-top: ${props => props.theme.spacing.sm}rem }
    .mbs { margin-bottom: ${props => props.theme.spacing.sm}rem }
    .mls { margin-left: ${props => props.theme.spacing.sm}rem }
    .mrs { margin-right: ${props => props.theme.spacing.sm}rem }

    // medium margin
    .mm { margin: ${props => props.theme.spacing.md}rem }
    .mxm { margin-left: ${props => props.theme.spacing.md}rem; margin-right: ${props => props.theme.spacing.md}rem }
    .mym { margin-top: ${props => props.theme.spacing.md}rem; margin-bottom: ${props => props.theme.spacing.md}rem }
    .mtm { margin-top: ${props => props.theme.spacing.md}rem }
    .mbm { margin-bottom: ${props => props.theme.spacing.md}rem }
    .mlm { margin-left: ${props => props.theme.spacing.md}rem }
    .mrm { margin-right: ${props => props.theme.spacing.md}rem }

    // large margin
    .ml { margin: ${props => props.theme.spacing.lg}rem }
    .mxl { margin-left: ${props => props.theme.spacing.lg}rem; margin-right: ${props => props.theme.spacing.lg}rem }
    .myl { margin-top: ${props => props.theme.spacing.lg}rem; margin-bottom: ${props => props.theme.spacing.lg}rem }
    .mtl { margin-top: ${props => props.theme.spacing.lg}rem }
    .mbl { margin-bottom: ${props => props.theme.spacing.lg}rem }
    .mll { margin-left: ${props => props.theme.spacing.lg}rem }
    .mrl { margin-right: ${props => props.theme.spacing.lg}rem }

    .hidden { opacity: 0; user-select: none; pointer-events: none }
    .locked { opacity: 0.5; user-select: none; pointer-events: none }
    .faded { opacity: 0.5 }

    .flex { display: flex; flex-wrap: wrap; }
    .col { display: flex; flex-direction: column; flex-wrap: wrap; }
    .center { display: flex; align-items: center; justify-content: center; flex-wrap: wrap; }
    .split { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; }
    .end { display: flex; justify-content: flex-end; flex-wrap: wrap; }
    .start { display: flex; justify-content: flex-start; flex-wrap: wrap; }
    .nowrap { flex-wrap: nowrap }

    .oneline {
        text-wrap: nowrap;
    }

    // #omic-beacon:hover::before {
    #omic-beacon {

        // content: "";
        // position: absolute;
        // top: 50%;
        // left: 50%;
        // transform: translate(-50%, -50%);
        // width: 100%;
        // height: 100%;
        // border-radius: 50%;
        // background-color: red;
        border-radius: 99px;
        &:hover {
            animation: pulse 2s infinite;
        }
    }

    @keyframes pulse {
        0% {
            box-shadow: 0px 0px 0px 0px ${props => '#000000'}55;
        }

        50% {
            box-shadow: 0px 0px 0px 25px ${props => '#000000'}00;
        }

        100% {
            box-shadow: 0px 0px 0px 50px ${props => '#000000'}00;
        }
    }

    // @keyframes pulse {
    //     0% {
    //       transform: scale(5);
    //       opacity: 0.5;
    //     }
    //     50% {
    //       transform: scale(1);
    //       opacity: 0;
    //     }
    //     100% {
    //       transform: scale(1.5);
    //       opacity: 0;
    //     }
    // }

    .trans { transition: all 0.25s ease }

    .rounded { border-radius: ${props => props.theme.corners}rem }


    .debug {
        border: 2px dashed ${props => props.theme.complement};
        > * {
            border: 1px dashed ${props => props.theme.complement}88;
            > * {
                border: 1px dashed ${props => props.theme.complement}44;
            }
        }
    }

`
const baseTheme = {
    corners: 0.75,
    spacing: {
        sm: 0.5,
        md: 1.3,
        lg: 2.3,
    },
    font: '',
    codeFont: 'monospace',
    accent: '#623131'
}

export const lightTheme = {
    ...baseTheme,
    mode: 'light',
    base: '#dddddd',
    bg: '#ffffff',
    complement: '#333333',
}

export const darkTheme = {
    ...baseTheme,
    mode: 'dark',
    base: '#333333',
    bg: '#111111',
    complement: '#eeeeee',
}