import { Popup } from './components/popup/Popup'
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

function renderCommandPopup(command: string) {
  const selection = window.getSelection()

  const existingPopup = document.getElementById('command-popup')
  if (existingPopup) {
    existingPopup.remove()
  }

  const { top, left } = getSelectionCoords()

  const container = document.createElement('div')
  container.id = 'command-popup'
  container.style.position = 'fixed'
  container.style.top = '0'
  container.style.left = '0'

  container.style.pointerEvents = 'pointer'
  container.style.zIndex = '2147483646'

  document.body.appendChild(container)

  const root = createRoot(container)

  root.render(
    <Popup
      text={`${selection} ${command}`}
      startTop={top}
      startLeft={left}
      // text={'command'}
      onClose={() => {
        root.unmount()
      }}
    />
  )
}

chrome.runtime.onMessage.addListener(async request => {
  if (request.action === 'showCommandPopup') {
    const { command } = request
    renderCommandPopup(command)
  }
})

// renderCommandPopup('123')

export {}
