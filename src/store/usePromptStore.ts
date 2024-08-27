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
    const promptsFromStorage = JSON.parse(
      localStorage.getItem('prompts') || '[]'
    )
    set({ prompts: promptsFromStorage })
  },

  addPrompt: (prompt: Prompt) => {
    set(state => {
      const updatedPrompts = [...state.prompts, prompt]
      localStorage.setItem('prompts', JSON.stringify(updatedPrompts))
      return { prompts: updatedPrompts }
    })
  },

  updatePrompt: (id: number, updatedPrompt: Prompt) => {
    set(state => {
      const updatedPrompts = state.prompts.map(prompt =>
        prompt.id === id ? updatedPrompt : prompt
      )
      localStorage.setItem('prompts', JSON.stringify(updatedPrompts))
      return { prompts: updatedPrompts }
    })
  },

  deletePrompt: (id: number) => {
    set(state => {
      const updatedPrompts = state.prompts.filter(prompt => prompt.id !== id)
      localStorage.setItem('prompts', JSON.stringify(updatedPrompts))
      return { prompts: updatedPrompts }
    })
  }
}))
