;(() => {
  console.log('content.js started')

  async function renderCommandPopup(command: string, x: number, y: number) {
    const { Popup } = await import('./components/popup/Popup')
    const { createRoot } = await import('react-dom/client')

    const existingPopup = document.getElementById('command-popup')
    if (existingPopup) {
      existingPopup.remove()
    }

    const container = document.createElement('div')
    container.id = 'command-popup'
    container.style.position = 'absolute'
    container.style.left = `${x}px`
    container.style.top = `${y}px`
    document.body.appendChild(container)

    const root = createRoot(container)
    root.render(<Popup text={command} />)
  }

  chrome.runtime.onMessage.addListener(request => {
    if (request.action === 'showCommandPopup') {
      const { command } = request
      renderCommandPopup(command, 100, 100)
    }
  })
})()
