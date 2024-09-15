import { fetchFromOpenAI } from '../utils/aiApi'
import { create } from 'zustand'

type Prompt = {
  id: number
  title: string
  instruction: string
}

export type Message = {
  id: number
  question: string
  answer: string | null
  error: string | null
}

type PromptState = {
  prompts: Prompt[]
  messages: Message[]
  loading: boolean
  apiKey: string
  loadPrompts: () => void
  addPrompt: (prompt: Prompt) => void
  updatePrompt: (id: number, updatedPrompt: Prompt) => void
  deletePrompt: (id: number) => void
  getAnswer: (question: string) => void
  setApiKey: (key: string) => void
  removeApiKey: () => void
}

export const usePromptStore = create<PromptState>((set, get) => ({
  apiKey: '',
  prompts: [],
  messages: [],
  loading: false,

  setApiKey: (key: string) => {
    set({ apiKey: key })
    chrome.storage.local.set({ apiKey: key })
  },

  removeApiKey: () => {
    set({ apiKey: '' })
    chrome.storage.local.remove('apiKey')
  },

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
  },

  getAnswer: async (question: string) => {
    const messageId = Date.now()
    const { apiKey } = get()
    if (!apiKey) {
      set(state => ({
        messages: [
          ...state.messages,
          {
            id: messageId,
            question,
            answer: null,
            error: 'API-key is not found'
          }
        ]
      }))
      return
    }
    set({ loading: true })

    try {
      const result = await fetchFromOpenAI(question, apiKey)
      set(state => ({
        messages: [
          ...state.messages,
          { id: messageId, question, answer: result, error: null }
        ],
        loading: false
      }))
    } catch (error) {
      set(state => ({
        messages: [
          ...state.messages,
          { id: messageId, question, answer: null, error: 'Error' }
        ],
        loading: false
      }))
    }
  }
}))
