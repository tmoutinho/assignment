import { create } from 'zustand'

interface ChatMessage {
  id: string
  content: string
  type: 'user' | 'assistant'
  status: 'loading' | 'streaming' | 'complete'
  timestamp: Date
}

interface ChatStore {
  messages: ChatMessage[]
  isLoading: boolean
  isStreaming: boolean
  currentQuery: string
  hasSearched: boolean
  setQuery: (query: string) => void
  startSearch: () => void
  startStreaming: (response: string) => void
  pauseStreaming: () => void
  completeStreaming: () => void
  reset: () => void
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  isLoading: false,
  isStreaming: false,
  currentQuery: '',
  hasSearched: false,

  setQuery: (query) => set({ currentQuery: query }),

  startSearch: () => set({
    isLoading: true,
    hasSearched: true,
    messages: []
  }),

  startStreaming: (response) => set({
    isLoading: false,
    isStreaming: true,
    messages: [{
      id: crypto.randomUUID(),
      content: response,
      type: 'assistant',
      status: 'streaming',
      timestamp: new Date()
    }]
  }),

  pauseStreaming: () => set({ isStreaming: false }),

  completeStreaming: () => set({ isStreaming: false }),

  reset: () => set({
    messages: [],
    isLoading: false,
    isStreaming: false,
    currentQuery: '',
    hasSearched: false
  })
})) 