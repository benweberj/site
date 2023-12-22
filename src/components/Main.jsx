import { motion } from 'framer-motion'

export default function Motion(props) {
    const { fromRight, fromLeft, fromTop, fromBottom } = props

    let initial =  { opacity: 0 }
    let animate =  { opacity: 1, transition: {  } }

    if (fromLeft) {
        initial = { transform: 'translateX(-100vw)' }
        animate = { transform: 'translateX(0px)', transition: { type: 'spring', duration: 0.75 } }
    }
    
    if (fromRight) {
        initial = { transform: 'translateX(100vw)' }
        animate = { transform: 'translateX(0px)', transition: { type: 'spring', duration: 0.75 } }
    }

    if (fromTop) {
        initial = { transform: 'translateY(-100vh)' }
        animate = { transform: 'translateY(0px)' }
    }

    if (fromBottom) {
        initial = { transform: 'translateY(100vw)' }
        animate = { transform: 'translateY(0px)', transition: { type: 'spring', duration: 0.75 } }
    }



    return (
        // <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <motion.main
            
            initial={initial}
            animate={animate}
            // exit={exit}
            
            {...props}
        >
            {props.children}
        </motion.main>
    )
}