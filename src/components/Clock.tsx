import { useEffect, useState } from 'react'

/* Khaleel's local time, not the visitor's — the label next to this reads
   "UTC+3", so reading the visitor's clock would have shown the wrong number
   to everyone outside Israel. */
const fmt = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Jerusalem',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
})

export function Clock() {
  const [time, setTime] = useState(() => fmt.format(new Date()))

  useEffect(() => {
    const id = setInterval(() => setTime(fmt.format(new Date())), 1000)
    return () => clearInterval(id)
  }, [])

  return <span className="mono tabular-nums">{time}</span>
}
