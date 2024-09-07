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

function renderCommandPopup(command: string) {
  const existingPopup = document.getElementById('command-popup')
  if (existingPopup) {
    existingPopup.remove()
  }

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
      text={'command'}
      onClose={() => {
        console.log(222)
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

renderCommandPopup('123')

export {}
