import { create } from 'zustand'

interface StreamingState {
  displayedContent: string[]
  currentLineIndex: number
  currentCharIndex: number
  setDisplayedContent: (content: string[] | ((prev: string[]) => string[])) => void
  setCurrentLineIndex: (index: number) => void
  setCurrentCharIndex: (index: number) => void
}

export const useStreamingStore = create<StreamingState>((set) => ({
  displayedContent: [],
  currentLineIndex: 0,
  currentCharIndex: 0,
  setDisplayedContent: (content) =>
    set((state) => ({
      displayedContent: typeof content === 'function' ? content(state.displayedContent) : content
    })),
  setCurrentLineIndex: (index) => set({ currentLineIndex: index }),
  setCurrentCharIndex: (index) => set({ currentCharIndex: index }),
})) 