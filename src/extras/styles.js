import { createGlobalStyle } from 'styled-components'

const si = 2 // shake intensity for shake-head animation

export const GlobalStyles = createGlobalStyle`
    // css reset
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: none;
        border: none;
        font-family: Mulish, sans-serif;
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
        height: 100dvh;
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

    #sketch-container {
        overflow: hidden;
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

    li {
        line-height: 1.5
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
        transition: background 0.25s ease, color 0.25s ease, opacity 0.25s ease;

        &.inverse {
            background: ${props => props.theme.complement};
            color: ${props => props.theme.base};
            opacity: 0.75;

            &:hover {
                opacity: 1;
                // background: ${props => props.theme.complement}88;
                // color: ${props => props.theme.base}88;
            }
        }

        &.red {
            background: ${props => props.theme.red2}88;
            color: white;

            &:hover {
                background: red;
            }
        }

        &.green {
            background: ${props => props.theme.green}88;
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

        &:hover:not(.inactive) {
            background: ${props => props.theme.complement};
            color: ${props => props.theme.base};

            * {
                color: ${props => props.theme.base};
            }
        }

        &.chip {
            padding: 5px 15px 6px 15px;
        }

        &.chip-sm {
            padding: 2px 10px 3px 10px;
            font-size: 0.8rem;
        }

        
    }

    input, textarea {
        border-radius: ${props => props.theme.corners}rem;
        padding: ${props => `${props.theme.spacing.sm}rem ${props.theme.spacing.md}rem`};
        background: ${props => props.theme.complement}88;
        color: ${props => props.theme.base};
    }

    .card {
        padding: ${props => props.theme.spacing.md}rem;
        background: ${props => props.theme.complement}11;
        border-radius: ${props => props.theme.corners}rem;

        &.lg {
            padding: ${props => props.theme.spacing.lg}rem;
        }

        &.hoverable {
            transition: background 0.25s ease;
            &:hover {
                background: ${props => props.theme.complement}22;
            }
        }
    }

    .task-list {
        padding-left: ${props => props.theme.spacing.lg}rem;
        li {

        }
    }

    .contact-reference {
        // margin-top: 3rem;
        // margin-bottom: -2rem;
        color: ${props => props.theme.complement}66;

        .contact-me {
            cursor: pointer;
            color: ${props => props.theme.complement}aa;

            &:hover {
                color: ${props => props.theme.complement};
            }
        }
    }

    .underline-hover {
        position: relative;
        
        &:after {
            position: absolute;
            content: '';
            width: 0%;
            height: 3px;
            inset: calc(100% + 3px) auto auto 0;
            background: ${props => props.theme.complement};
            transition: all 0.25s ease;
        }

        &:hover {
            &:after {
                width: 93%;
            }
        }
    }

    .scale-hover {
        transition: all 0.25s ease;
        &:hover {
            transform: scale(1.2);
            opacity: 0.75;
        }
    }


    .glow-border {

        button {
            background: #fff1;
            border: 1px solid #fff;
            position: relative;
            overflow: hidden;
            
            color: #fff;
            *, :not(img) { color: #fff; transition: all 0.5s ease; transform: rotateY(0deg); }

            

            &.selected {
                border: 1px solid #fff8;
                color: #fff5;
                * { color: #fff5 }

                img {
                    filter: invert(1) !important;
                    opacity: 0.5;
                }

            }

            &:after {
                z-index: -1;
                content: '';
                transition: all 0.5s ease;
                position: absolute;
                inset: 0;
                transform: scaleY(0);
                // transform-origin: left;
                background: #c19;
                filter: blur(5px);
            }

            &:hover {
                // background: #fff;
                box-shadow: 0 0 20px 5px #c195;
                color: #3a2854;
                *, :not(img) { color: #3a2854; transform: rotateX(360deg); }

                img {
                    filter: invert(0) !important;
                    opacity: 1;
                }

                &:after {
                    background: #fff;
                    filter: none;
                    transform: scaleY(1);
                }
            }
        }

        --border-angle: 0turn;
        
        // --pink: #200d29;
        // --blue: #091426;
        // --purple: #1c162b;
        --pink: #213;
        --blue: #112;
        --purple: #1c162b;

        --main-bg: conic-gradient(
            from var(--border-angle),
            var(--pink),
            var(--purple) 5%,
            var(--blue) 60%,
            var(--pink) 95%
        );

        border: solid 1px transparent;
        border-radius: ${props => props.theme.corners}rem;
        --gradient-border: conic-gradient(
            from var(--border-angle),
            transparent 25%,
            #5b9bea,
            #c19 99%,
            transparent
        );

        background: 
        // padding-box clips this bg everywhere except border
        var(--main-bg) padding-box,
        // border-box extends bg to the border space
        var(--gradient-border) border-box;

        background-position: center center;
        animation: bg-spin 15s linear infinite;

        @keyframes bg-spin {
            to { --border-angle: 1turn }
        }

        @property --border-angle {
            syntax: "<angle>";
            inherits: true;
            initial-value: 0turn;
        }
    }


    .sep-sm, .sep {
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

    .block { display: block; }

    .flex { display: flex; flex-wrap: wrap; }
    .col { display: flex; flex-direction: column; flex-wrap: wrap; }
    :not(p):not(h1):not(h2):not(h3):not(h4).center { display: flex; align-items: center; justify-content: center; flex-wrap: wrap; }
    .split { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; }
    .end { display: flex; justify-content: flex-end; flex-wrap: wrap; }
    .start { display: flex; justify-content: flex-start; flex-wrap: wrap; }
    .nowrap { flex-wrap: nowrap }
    .rel { position: relative }
    .contain { overflow: hidden }

    p.center, h1.center, h2.center, h3.center, h4.center {
        text-align: center;
    }

    .align-center {
        align-items: center;
    }

    .oneline {
        text-wrap: nowrap;
    }

    .full {
        width: 100%;
        height: 100%;
    }

    .highlight {
        color: ${props => props.theme.highlight};
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

    @keyframes shake-head {
        0% {
          transform: rotateY(${si * 0}deg);
        }
        10% {
          transform: rotateY(${si * -10}deg);
        }
        20% {
          transform: rotateY(${si * 10}deg);
        }
        30% {
          transform: rotateY(${si * -10}deg);
        }
        40% {
          transform: rotateY(${si * 10}deg);
        }
        50% {
          transform: rotateY(${si * -5}deg);
        }
        60% {
          transform: rotateY(${si * 5}deg);
        }
        70% {
          transform: rotateY(${si * -2.5}deg);
        }
        80% {
          transform: rotateY(${si * 2.5}deg);
        }
        90% {
          transform: rotateY(${si * -1}deg);
        }
        100% {
          transform: rotateY(${si * 0}deg);
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
                > * {
                    border: 1px dashed ${props => props.theme.complement}22;
                }
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
    accent: '#669f7a',
    green: '#55bb99',
    red: '#ff9090',
    red2: '#BF4A4A'
}

export const lightTheme = {
    ...baseTheme,
    mode: 'light',

    base: '#cccccc',
    complement: '#0f141a',

    bg: '#eeeeee',
    highlight: '#000000'
}

export const darkTheme = {
    ...baseTheme,
    mode: 'dark',
    base: '#333333',
    complement: '#eeeeee',

    bg: '#100f15',
    bg: '#0f141a',
    
    highlight: '#ffffff'
}