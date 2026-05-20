import { useEffect, useState } from 'react'

export function Clock() {
  const [time, setTime] = useState(() => fmt(new Date()))
  useEffect(() => {
    const id = setInterval(() => setTime(fmt(new Date())), 1000)
    return () => clearInterval(id)
  }, [])
  return <span className="mono tabular-nums">{time}</span>
}

function fmt(d: Date) {
  const hh = String(d.getHours()).padStart(2, '0')
  const mm = String(d.getMinutes()).padStart(2, '0')
  const ss = String(d.getSeconds()).padStart(2, '0')
  return `${hh}:${mm}:${ss}`
}
