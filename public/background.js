console.log('background.js started')

function logAllCommands() {
  chrome.storage.local.get('prompts', result => {
    const commands = result.commands || []
    console.log('Saved prompts:', commands)
  })
}

logAllCommands()

function updateContextMenu() {
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
      id: 'parent',
      title: 'FastCom Commands',
      contexts: ['selection']
    })

    chrome.storage.local.get('commands', result => {
      const commands = result.commands || []

      commands.forEach(command => {
        chrome.contextMenus.create({
          id: `command-${command.id}`,
          parentId: 'parent',
          title: command.title,
          contexts: ['selection']
        })
      })
    })
  })
}

updateContextMenu()

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'local' && changes.commands) {
    updateContextMenu()
  }
})

chrome.contextMenus.onClicked.addListener(info => {
  if (info.menuItemId.startsWith('command-')) {
    const commandId = parseInt(info.menuItemId.replace('command-', ''), 10)

    chrome.storage.local.get('commands', result => {
      const command = result.commands.find(cmd => cmd.id === commandId)
      if (command) {
        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
          chrome.tabs.sendMessage(tabs[0].id, {
            action: 'showCommandPopup',
            command: command.instruction,
            x: info.pageX,
            y: info.pageY
          })
        })
      }
    })
  }
})
