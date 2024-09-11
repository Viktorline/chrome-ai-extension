import { Popup } from './components/popup/Popup'
import { POPUP_SIZE_HEIGHT, POPUP_SIZE_WIDTH } from './constants/numbers'
import React from 'react'
import { createRoot } from 'react-dom/client'

console.log('content.js started')

let mouseX = 0
let mouseY = 0

document.addEventListener('mousemove', event => {
  mouseX = event.pageX
  mouseY = event.pageY
})

function getSelectionCoords() {
  const selection = window.getSelection()

  if (selection?.rangeCount) {
    const range = selection.getRangeAt(0)
    const rect = range.getBoundingClientRect()

    return { top: rect.top - 100, left: rect.left + 100 }
  }
  return { top: mouseY, left: mouseX }
}

function clampPosition(top: number, left: number) {
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight

  const clampedTop = Math.max(
    0,
    Math.min(top, viewportHeight - POPUP_SIZE_HEIGHT)
  )
  const clampedLeft = Math.max(
    0,
    Math.min(left, viewportWidth - POPUP_SIZE_WIDTH)
  )

  return { top: clampedTop, left: clampedLeft }
}

function renderCommandPopup(command: string) {
  const selection = window.getSelection()

  const existingPopup = document.getElementById('command-popup')
  if (existingPopup) {
    existingPopup.remove()
  }

  const { top, left } = getSelectionCoords()
  const { top: clampedTop, left: clampedLeft } = clampPosition(top, left)

  const container = document.createElement('div')
  container.id = 'command-popup'
  container.style.position = 'fixed'
  container.style.top = '0'
  container.style.left = '0'

  container.style.pointerEvents = 'pointer'
  container.style.zIndex = '2147483646'

  document.body.appendChild(container)

  const root = createRoot(container)

  const boundary = {
    width: window.innerWidth,
    height: window.innerHeight
  }

  const popupSize = {
    width: POPUP_SIZE_WIDTH,
    height: POPUP_SIZE_HEIGHT
  }

  root.render(
    <Popup
      text={`${selection} ${command}`}
      startTop={clampedTop}
      startLeft={clampedLeft}
      boundary={boundary}
      popupSize={popupSize}
      onClose={() => {
        root.unmount()
      }}
    />
  )

  window.addEventListener('resize', () => {
    const newBoundary = {
      width: window.innerWidth,
      height: window.innerHeight
    }

    const newClampedTop = Math.max(
      0,
      Math.min(clampedTop, newBoundary.height - POPUP_SIZE_HEIGHT)
    )
    const newClampedLeft = Math.max(
      0,
      Math.min(clampedLeft, newBoundary.width - POPUP_SIZE_WIDTH)
    )

    root.render(
      <Popup
        text={`${selection} ${command}`}
        startTop={newClampedTop}
        startLeft={newClampedLeft}
        boundary={newBoundary}
        popupSize={{ width: POPUP_SIZE_WIDTH, height: POPUP_SIZE_HEIGHT }}
        onClose={() => {
          root.unmount()
        }}
      />
    )
  })
}

chrome.runtime.onMessage.addListener(async request => {
  if (request.action === 'showCommandPopup') {
    const { command } = request
    renderCommandPopup(command)
  }
})

// renderCommandPopup('123')

export {}
