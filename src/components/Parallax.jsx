import Tilt from 'react-parallax-tilt'

export default function Parallax(props) {
  const { shine, fs } = props

//   const shineProps = shine ? {
//     glareEnable: true,
//     glareMaxOpacity: .9,
//     glareColor: '#ffffff',
//     glarePosition: 'left',
//     glareBorderRadius: '999px',
//   } : {}

  return (
    <Tilt
      trackOnWindow={fs || false}
      className={props.className + ' ' + 'parallax-effect'}
      transitionSpeed={1000}
      tiltReverse={true}
      perspective={props.perspective || 500}
      style={{ ...props.style }}
    //   {...shineProps}
      {...props}
    >
      {props.children}
    </Tilt>
  )
}