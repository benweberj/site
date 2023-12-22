import React, { useState, useEffect } from 'react'

export default function Clicker() {
  const [dot, setDot] = useState({ x: 0, y: 0 });

  function handleClick(e) { 
    setDot({ x: e.clientX, y: e.clientY });
  }

  useEffect(() => {
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])
  
  return (
    <div style={{ zIndex: 99 }}>
      <Dot x={dot.x} y={dot.y} />
    </div>
  );
}

function Dot({ x, y }) {
  const [fading, setFading] = useState(false);
  const [timer, setTimer] = useState(null)
  const w = 10;

  function dotChanged() {
    clearTimeout(timer);
    setFading(false)
    setTimer(setTimeout(() => {
        setFading(true)
    }, 3000))
  }

  useEffect(() => {
    dotChanged()
  }, []);

  useEffect(() => {
    dotChanged()
  }, [x, y])

  return (
    <div style={{ display: fading ? 'none' : 'block' }}>
      <div style={{ position: 'absolute', left: x - (w/2), top: y - (w/2), width: w, height: w, background: 'white', borderRadius: 99 }} />
      <p style={{ position: 'absolute', left: x-50, top: y-30 }}>{x}, {y}</p>
    </div>
  )
}