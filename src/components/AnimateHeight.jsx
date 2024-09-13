import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function AnimateHeight({ open, children }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.5, type: 'spring' }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}