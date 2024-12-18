import { create } from 'zustand'

interface ChatMessage {
  id: string
  content: string
  timestamp: Date
}

interface ChatStore {
  messages: ChatMessage[]
  status: 'idle' | 'loading' | 'streaming' | 'complete' | 'paused'
  currentQuery: string
  setQuery: (query: string) => void
  startSearch: () => void
  startStreaming: (response: string) => void
  pauseStreaming: () => void
  resumeStreaming: () => void
  completeStreaming: () => void
  reset: () => void
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  status: 'idle',
  currentQuery: '',

  setQuery: (query) => set({ currentQuery: query }),

  startSearch: () => set({
    status: 'loading',
    messages: []
  }),

  startStreaming: (response) => set({
    status: 'streaming',
    messages: [{
      id: crypto.randomUUID(),
      content: response,
      timestamp: new Date()
    }]
  }),

  pauseStreaming: () => set({ status: 'paused' }),

  resumeStreaming: () => set({ status: 'streaming' }),

  completeStreaming: () => set({ status: 'complete' }),

  reset: () => set({
    messages: [],
    status: 'idle',
    currentQuery: '',
  })
})) 