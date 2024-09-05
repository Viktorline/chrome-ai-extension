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
  container.style.position = 'absolute'
  container.style.left = `${mouseX}px`
  container.style.top = `${mouseY}px`
  document.body.appendChild(container)

  const root = createRoot(container)
  root.render(<Popup text={command} />)
}

chrome.runtime.onMessage.addListener(async request => {
  if (request.action === 'showCommandPopup') {
    const { command } = request
    renderCommandPopup(command)
  }
})

export {}
