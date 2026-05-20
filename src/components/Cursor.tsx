import { useEffect, useRef, useState } from 'react'

export function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(max-width: 768px)').matches) return

    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let rx = mx
    let ry = my
    let raf = 0

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
    }

    const tick = () => {
      rx += (mx - rx) * 0.22
      ry += (my - ry) * 0.22
      if (ringRef.current) {
        ringRef.current.style.left = `${rx}px`
        ringRef.current.style.top = `${ry}px`
      }
      raf = requestAnimationFrame(tick)
    }

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      setActive(!!t.closest('a, button, [data-cursor="hover"]'))
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={ringRef}
      className={`cursor-ring hidden md:block ${active ? 'is-active' : ''}`}
    />
  )
}
