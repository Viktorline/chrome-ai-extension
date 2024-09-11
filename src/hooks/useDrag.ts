import { RefObject, useEffect, useState } from 'react'

export function useDrag(
  wrapperRef: RefObject<HTMLDivElement>,
  dragButtonRef: RefObject<HTMLButtonElement>,
  startTop: number,
  startLeft: number,
  boundary: { width: number; height: number },
  popupSize: { width: number; height: number }
) {
  const [position, setPosition] = useState({ top: startTop, left: startLeft })
  let startX = 0
  let startY = 0
  let initialX = startLeft
  let initialY = startTop

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
      const newTop = initialY + dy
      const newLeft = initialX + dx

      setPosition({
        top: Math.max(0, Math.min(newTop, boundary.height - popupSize.height)),
        left: Math.max(0, Math.min(newLeft, boundary.width - popupSize.width))
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
  }, [dragButtonRef, wrapperRef, boundary, popupSize])

  return position
}
