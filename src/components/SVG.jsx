import { useTheme }  from '../extras/ThemeContext'

export default (props) => {
    const [theme, _] = useTheme()
    const { name, w=20 } = props
    // const h = w

    const svgProps = {
        width: w,
        // height: w,
        // height: h,
        fill: theme.complement,
        ...props
    }

    // social media icons
    if (name.toLowerCase() == 'linkedin') return (
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" {...svgProps}>
            <path fill-rule="evenodd" d="M7.979 5v1.586a3.5 3.5 0 0 1 3.082-1.574C14.3 5.012 15 7.03 15 9.655V15h-3v-4.738c0-1.13-.229-2.584-1.995-2.584-1.713 0-2.005 1.23-2.005 2.5V15H5.009V5h2.97ZM3 2.487a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" clip-rule="evenodd"/>
            <path d="M3 5.012H0V15h3V5.012Z"/>
        </svg>
    )

    if (name.toLowerCase() == 'email') return (
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 16" {...svgProps}>
            <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
            <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
        </svg>
    )

    if (name.toLowerCase() == 'github') return (
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" {...svgProps}>
            <path fill-rule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clip-rule="evenodd"/>
        </svg>
    )

    if (name.toLowerCase() == 'number') return (
        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" {...svgProps}>
            <path fill={theme.complement} stroke-linecap="round" stroke-linejoin="round" d="m16.344 12.168-1.4-1.4a1.98 1.98 0 0 0-2.8 0l-.7.7a1.98 1.98 0 0 1-2.8 0l-2.1-2.1a1.98 1.98 0 0 1 0-2.8l.7-.7a1.981 1.981 0 0 0 0-2.8l-1.4-1.4a1.828 1.828 0 0 0-2.8 0C-.638 5.323 1.1 9.542 4.78 13.22c3.68 3.678 7.9 5.418 11.564 1.752a1.828 1.828 0 0 0 0-2.804Z"/>
        </svg>
    )



    // project/sketch icons

    if (name.toLowerCase() === 'wordlesolver') return (
        <svg viewBox="0 0 245 243" fill="none" xmlns="http://www.w3.org/2000/svg" {...svgProps}>
            <rect width="71" height="71" fill={theme.complemnt} fill-opacity="0.25"/>
            <rect x="87" width="71" height="71" fill={theme.complemnt} fill-opacity="0.25"/>
            <rect x="174" width="71" height="71" fill={theme.complemnt} fill-opacity="0.25"/>
            <rect y="86" width="71" height="71" fill={theme.complemnt} fill-opacity="0.25"/>
            <rect x="87" y="86" width="71" height="71" fill={theme.complemnt} fill-opacity="0.5"/>
            <rect x="174" y="86" width="71" height="71" fill={theme.complemnt}/>
            <rect y="172" width="71" height="71" fill={theme.complemnt}/>
            <rect x="87" y="172" width="71" height="71" fill={theme.complemnt}/>
            <rect x="174" y="172" width="71" height="71" fill={theme.complemnt}/>
        </svg>
    )

    if (name.toLowerCase() === 'particlemesh') return (
        <svg viewBox="0 0 225 267" fill="none" xmlns="http://www.w3.org/2000/svg" {...svgProps} width={svgProps.width * 0.9}>
            <circle cx="45" cy="77" r="45" fill={theme.complement}/>
            <circle cx="172.5" cy="214.5" r="52.5" fill={theme.complement}/>
            <circle cx="192.5" cy="32.5" r="32.5" fill={theme.complement}/>
            <path d="M173 213L194 29" stroke={theme.complement} stroke-width="11"/>
            <path d="M175 217L46 79" stroke={theme.complement} stroke-width="11"/>
            <path d="M43 77L194 33" stroke={theme.complement} stroke-width="11"/>
        </svg>
    )

    if (name.toLowerCase() === 'gameoflife') return (
        <svg viewBox="0 0 223 223" fill="none" xmlns="http://www.w3.org/2000/svg" {...svgProps}>
            <rect width="71" height="71" fill={theme.complement}/>
            <rect y="76" width="71" height="71" fill={theme.complement}/>
            <rect x="76" y="76" width="71" height="71" fill={theme.complement}/>
            <rect x="76" y="152" width="71" height="71" fill={theme.complement}/>
            <rect x="152" y="5" width="71" height="71" fill={theme.complement}/>
        </svg>
    )

    if (name.toLowerCase() === 'polymesh') return (
        <svg viewBox="0 0 274 291" fill="none" xmlns="http://www.w3.org/2000/svg" {...svgProps}>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M90.6605 0L1.45703 126.867L157.503 149.655L145.193 50.4874L90.6605 0Z" fill={theme.complement} fill-opacity="0.3"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M149 53.4893L161.199 151.755L273.713 168.952L149 53.4893Z" fill={theme.complement} fill-opacity="0.5"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M79.6459 289.792L0 131.489L155.829 154.245L79.6459 289.792Z" fill={theme.complement} fill-opacity="0.75"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M272.697 172.733L159.873 155.489L84 290.484L272.697 172.733Z" fill={theme.complement} fill-opacity="0.9"/>
        </svg>
    )

    if (name.toLowerCase() === 'pixelsnakes') return (
        <svg viewBox="0 0 116 196" fill="none" xmlns="http://www.w3.org/2000/svg" {...svgProps} width={svgProps.width * 0.7}>
            <rect y="81.1035" width="35.295" height="34.5441" rx="17.272" fill={theme.complement} fill-opacity="0.6"/>
            <rect x="39.8008" y="81.1035" width="36.046" height="34.5441" rx="17.272" fill={theme.complement} fill-opacity="0.5"/>
            <rect x="81.1035" y="120.153" width="34.5441" height="36.7969" rx="17.272" fill={theme.complement} fill-opacity="0.3"/>
            <rect y="39.8008" width="35.295" height="36.046" rx="17.6475" fill={theme.complement} fill-opacity="0.7"/>
            <rect x="81.1035" y="81.1035" width="34.5441" height="34.5441" rx="17.272" fill={theme.complement} fill-opacity="0.4"/>
            <rect x="40.5508" width="35.295" height="35.295" rx="17.6475" fill={theme.complement} fill-opacity="0.9"/>
            <rect x="81.1035" width="34.5441" height="35.295" rx="17.272" fill={theme.complement}/>
            <rect y="159.954" width="35.295" height="36.046" rx="17.6475" fill={theme.complement} fill-opacity="0.05"/>
            <rect x="39.8008" y="159.954" width="36.046" height="36.046" rx="18.023" fill={theme.complement} fill-opacity="0.1"/>
            <rect x="81.1035" y="159.954" width="34.5441" height="36.046" rx="17.272" fill={theme.complement} fill-opacity="0.2"/>
            <rect width="35.295" height="35.295" rx="17.6475" fill={theme.complement} fill-opacity="0.8"/>
        </svg>
    )

    if (name.toLowerCase() === 'lightning') return (
        <svg viewBox="0 0 136 283" fill="none" xmlns="http://www.w3.org/2000/svg" {...svgProps} width={svgProps.width * 0.6}>
            <path d="M0 127.245L40.2549 0H102.874L59.963 76.2426L136 53.6183L0 283L59.963 110.506L0 127.245Z" fill={theme.complement} />
        </svg>        
    )

   









    // wordlesolver
    // particlemesh
    // gameoflife
    // polymesh
    // pixelsnakes
    // lightning





    return <h4 style={{ color: 'red' }}>svg not found</h4>
}    