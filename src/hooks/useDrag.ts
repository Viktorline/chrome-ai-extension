import { RefObject, useEffect, useState } from 'react'

export function useDrag(
  wrapperRef: RefObject<HTMLDivElement>,
  dragButtonRef: RefObject<HTMLButtonElement>
) {
  const [position, setPosition] = useState({ top: 0, left: 0 })
  let startX = 0
  let startY = 0
  let initialX = 0
  let initialY = 0

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
