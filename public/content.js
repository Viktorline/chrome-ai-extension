console.log('content.js started')

chrome.runtime.onMessage.addListener(request => {
  if (request.action === 'showCommandPopup') {
    const { command, x, y } = request

    const oldPopup = document.getElementById('command-popup')
    if (oldPopup) {
      oldPopup.remove()
    }

    const popup = document.createElement('div')
    popup.id = 'command-popup'
    popup.style.position = 'absolute'
    popup.style.left = `${x}px`
    popup.style.top = `${y}px`
    popup.style.backgroundColor = '#333'
    popup.style.color = '#fff'
    popup.style.padding = '10px'
    popup.style.borderRadius = '5px'
    popup.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.5)'
    popup.style.zIndex = 10000
    popup.style.width = '200px'

    const commandText = document.createElement('div')
    commandText.innerText = command
    popup.appendChild(commandText)

    const closeButton = document.createElement('span')
    closeButton.innerText = 'Х'
    closeButton.style.position = 'absolute'
    closeButton.style.top = '5px'
    closeButton.style.right = '10px'
    closeButton.style.cursor = 'pointer'
    closeButton.style.color = '#fff'
    closeButton.style.fontSize = '16px'
    closeButton.style.fontWeight = 'bold'

    closeButton.addEventListener('click', () => {
      popup.remove()
    })

    popup.appendChild(closeButton)

    document.body.appendChild(popup)
  }
})
