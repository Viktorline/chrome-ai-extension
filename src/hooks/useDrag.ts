import { RefObject, useEffect, useState } from 'react'

export function useDrag(
  wrapperRef: RefObject<HTMLDivElement>,
  dragButtonRef: RefObject<HTMLButtonElement>,
  startTop: number,
  startLeft: number
) {
  const [position, setPosition] = useState({ top: startTop, left: startLeft })
  let startX = 0
  let startY = 0
  let initialX = startTop
  let initialY = startLeft

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (dragButtonRef.current && e.target === dragButtonRef.current) {
        startX = e.clientX
        startY = e.clientY

        if (wrapperRef.current) {
          initialX = wrapperRef.current.offsetLeft
          initialY = wrapperRef.current.offsetTop
        }

        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - startX
      const dy = e.clientY - startY
      setPosition({
        top: initialY + dy,
        left: initialX + dx
      })
    }

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    dragButtonRef.current?.addEventListener('mousedown', handleMouseDown)

    return () => {
      dragButtonRef.current?.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [dragButtonRef, wrapperRef])

  return position
}
