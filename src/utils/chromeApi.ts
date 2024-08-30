// import { PromptOwn } from '../app/App'

// function saveCommandToChrome(command: PromptOwn) {
//   if (typeof chrome !== 'undefined' && chrome.runtime) {
//     const port = chrome.runtime.connect({ name: 'extension-connection' })
//     port.postMessage({ action: 'saveCommand', command })
//     port.onMessage.addListener(response => {
//       console.log(response)
//     })
//   } else {
//     console.error('Error')
//   }
// }

// export { saveCommandToChrome }
