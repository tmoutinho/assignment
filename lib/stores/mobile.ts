import { create } from 'zustand'

interface MobileStore {
  isMobile: boolean
  setIsMobile: (value: boolean) => void
}

export const useMobileStore = create<MobileStore>((set) => ({
  isMobile: false,
  setIsMobile: (value) => set({ isMobile: value }),
})) 