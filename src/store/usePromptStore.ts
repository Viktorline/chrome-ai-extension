import { create } from 'zustand'

type Prompt = {
  id: number
  title: string
  instruction: string
}

type PromptState = {
  prompts: Prompt[]
  loadPrompts: () => void
  addPrompt: (prompt: Prompt) => void
  updatePrompt: (id: number, updatedPrompt: Prompt) => void
  deletePrompt: (id: number) => void
}

export const usePromptStore = create<PromptState>(set => ({
  prompts: [],

  loadPrompts: () => {
    // const promptsFromStorage = JSON.parse(
    //   localStorage.getItem('prompts') || '[]'
    // )
    // set({ prompts: promptsFromStorage })

    chrome.storage.local.get('commands', result => {
      const commands = result.commands || []
      set({ prompts: commands })
      // alert('loaded from Chrome: ' + JSON.stringify(commands))
    })
  },

  addPrompt: (prompt: Prompt) => {
    set(state => {
      const updatedPrompts = [...state.prompts, prompt]

      // localStorage.setItem('prompts', JSON.stringify(updatedPrompts))

      chrome.storage.local.set({ commands: updatedPrompts }, () => {
        // alert('Command added to Chrome storage:' + prompt)
      })
      return { prompts: updatedPrompts }
    })
  },

  updatePrompt: (id: number, updatedPrompt: Prompt) => {
    set(state => {
      const updatedPrompts = state.prompts.map(prompt =>
        prompt.id === id ? updatedPrompt : prompt
      )

      // localStorage.setItem('prompts', JSON.stringify(updatedPrompts))

      chrome.storage.local.set({ commands: updatedPrompts }, () => {
        // alert('Command updated in Chrome storage:' + updatedPrompt)
      })
      return { prompts: updatedPrompts }
    })
  },

  deletePrompt: (id: number) => {
    set(state => {
      const updatedPrompts = state.prompts.filter(prompt => prompt.id !== id)

      // localStorage.setItem('prompts', JSON.stringify(updatedPrompts))

      chrome.storage.local.set({ commands: updatedPrompts }, () => {
        // alert('Command deleted from Chrome storage:' + id)
      })
      return { prompts: updatedPrompts }
    })
  }
}))
